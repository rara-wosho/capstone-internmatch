"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../supabase/admin";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";

// Function for creating student account in authentication and table

export async function createStudentAccount(formData, groupId) {
    const supabase = await createClient();

    // Validation checks
    if (
        !formData?.firstName ||
        !formData?.lastName ||
        !formData?.school ||
        !formData?.course ||
        !formData?.email ||
        !formData?.password
    ) {
        return { success: false, error: "Missing required fields." };
    }

    // Simple email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        return { success: false, error: "Invalid email format." };
    }

    // Password length validation
    if (formData.password.length < 6) {
        return {
            success: false,
            error: "Password must be at least 6 characters long.",
        };
    }

    // Create auth user
    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                firstname: formData.firstName,
                lastname: formData.lastName,
                role: "student",
            },
        },
    });

    if (error) {
        return { success: false, error: error.message };
    }

    const userId = data.user?.id;

    // insert into `students` table
    const { error: insertError } = await supabase.from("students").insert([
        {
            id: userId,
            email: formData.email,
            firstname: formData.firstName,
            lastname: formData.lastName,
            middlename: formData.middlename || null,
            school: formData.school,
            course: formData.course,
            group_id: groupId,
            role: "student",
        },
    ]);

    // Rollback if insert fails
    if (insertError) {
        await supabaseAdmin.auth.admin.deleteUser(userId);
        return { success: false, error: insertError.message };
    }

    return { success: true };
}

// ✅ Allow exam access for multiple students
export async function allowExamAccess(studentIds = []) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("students")
        .update({ exam_access: true })
        .in("id", studentIds);

    if (error) {
        console.error("Error allowing exam access:", error);
        return { success: false };
    }

    return { success: true };
}

// ✅ Revoke exam access for multiple students
export async function revokeExamAccess(studentIds = []) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("students")
        .update({ exam_access: false })
        .in("id", studentIds);

    if (error) {
        console.error("Error revoking exam access:", error);
        return { success: false };
    }

    return { success: true };
}

// update or insert students' interests
export async function updateStudentInterests(interestId, newArray) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("interests")
        .upsert({ id: interestId, interest: newArray }) //intentionally leave interestId to undefined to perform insert, otherwise update
        .select();

    if (error) {
        return { success: false, data: null };
    }
    return { success: true, data };
}

export async function getStudentProfileData(studentId) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("students")
        .select()
        .eq("id", studentId)
        .single();

    if (error) {
        return {
            success: false,
            error: "Unable to fetch student profile data.",
        };
    }

    return { success: true, data };
}

// delete avatar in table only
export async function deleteAvatar(table, userId, pathToRevalidate) {
    const supabase = await createClient();

    const { error } = await supabase
        .from(table)
        .update({ avatar_url: null })
        .eq("id", userId);

    if (error) {
        console.error(error.message);
        return { success: false };
    }

    revalidatePath(pathToRevalidate, "page");
    return { success: true };
}

// upsert student interests
export async function upsertStudentInterests(studentId, interests) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("interests")
        .upsert(
            { student_id: studentId, interest: interests },
            { onConflict: "student_id" }
        );

    if (error) {
        return { success: false, error: error.message };
    }

    redirect(`/student/profile/${studentId}`);
}

// Get student activity logs
export async function getStudentActivityLogs(limit) {
    try {
        const { user } = await getCurrentUser();

        if (!user || !user.id) {
            return { success: false, data: null, error: "Unauthorized access" };
        }

        const supabase = await createClient();

        let query = supabase
            .from("students")
            .select(
                `
                created_at,
                firstname,
                lastname,
                applicants (
                    id,
                    applied_at,
                    company_id,
                    status
                ),
                exam_attempt (
                    completed_at,
                    exam_id,
                    exam_title
                )
            `
            )
            .eq("id", user.id)
            .order("applied_at", {
                referencedTable: "applicants",
                ascending: false,
            });

        // Only apply limit if provided
        if (limit) {
            query = query.limit(limit, { referencedTable: "applicants" });
        }

        query = query.order("completed_at", {
            referencedTable: "exam_attempt",
            ascending: false,
        });

        // Only apply limit if provided
        if (limit) {
            query = query.limit(limit, { referencedTable: "exam_attempt" });
        }

        const { data, error } = await query.maybeSingle();

        if (error) {
            console.error(error.message);
            return { success: false, data: null, error: error.message };
        }

        return { success: true, data, error: null };
    } catch (err) {
        return {
            success: false,
            data: null,
            error: err.message || "Unexpected error",
        };
    }
}
