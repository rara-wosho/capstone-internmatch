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

export async function getStudentProfileData(studentId) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("students")
        .select(
            `id, firstname, lastname, middlename, gender, age, avatar_url, barangay, city, province, course, email, school, interests(interest), groups(group_name, group_description, ojt_instructors(firstname, lastname))`
        )
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
export async function upsertStudentInterests(
    studentId,
    interests,
    isOnBoarding
) {
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

    if (isOnBoarding) {
        redirect(`/student/account/edit?onboarding=yes`);
    } else {
        redirect(`/student/profile/${studentId}`);
    }
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
                    id,
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

        return {
            success: true,
            data: {
                created_at: data.created_at,
                firstname: data.firstname,
                lastname: data.lastname,
                applications: data.applicants,
                exam_attempts: data.exam_attempt,
            },
            error: null,
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            error: err.message || "Unexpected error",
        };
    }
}

// get student details for profile  editing
// and percentage of empty fields.
export async function getStudentEditData() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return {
            success: false,
            error: "Unable to verify user. Please refresh the page and try again.",
            data: null,
        };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("students")
        .select(
            "id, firstname, lastname, middlename, gender, age, barangay, city, province, school, course, avatar_url"
        )
        .eq("id", user.id)
        .single();

    if (error) {
        return { success: false, error: error.message, data: null };
    }

    // list of fields to check for missing values.
    const fieldsToCheck = [
        "firstname",
        "lastname",
        "gender",
        "age",
        "barangay",
        "city",
        "province",
        "course",
        "school",
        "avatar_url",
    ];

    const filledCount = fieldsToCheck.filter((field) => !!data[field]).length;
    const percentage = Math.round((filledCount / fieldsToCheck.length) * 100);

    return { success: true, error: null, data, percentage };
}

// Update student details
export async function updateStudentDetails(formData) {
    try {
        // Extract data from formData
        const studentId = formData.get("studentId");
        const firstname = formData.get("firstname");
        const middlename = formData.get("middlename");
        const lastname = formData.get("lastname");
        const age = formData.get("age");
        const gender = formData.get("gender");
        const barangay = formData.get("barangay");
        const city = formData.get("city");
        const province = formData.get("province");
        const school = formData.get("school");
        const course = formData.get("course");

        // Validate student id
        if (!studentId) {
            return {
                success: false,
                error: "Student ID is missing. Please try again.",
            };
        }

        // Validate required fields
        if (
            !firstname ||
            !lastname ||
            !age ||
            !gender ||
            !barangay ||
            !city ||
            !province ||
            !school ||
            !course
        ) {
            return {
                success: false,
                error: "Please fill in required fields.",
            };
        }

        // Initialize Supabase client
        const supabase = await createClient();

        // Update student in database
        const { data, error } = await supabase
            .from("students") // Replace with your actual table name
            .update({
                firstname,
                middlename: middlename || null,
                lastname,
                age: age ? parseInt(age) : null,
                gender: gender || null,
                barangay: barangay || null,
                city: city || null,
                province: province || null,
                school: school || null,
                course: course || null,
            })
            .eq("id", studentId)
            .select()
            .single();

        if (error) {
            console.error("Error updating student:", error);
            return {
                success: false,
                error: "Failed to update student details",
            };
        }

        revalidatePath(`/student/account/edit`);
        revalidatePath(`/student/profile/${studentId}`);

        return {
            success: true,
            // data
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            success: false,
            error: "An unexpected error occurred",
        };
    }
}

// Get student activity logs
// export async function getStudentActivityLogs(limit) {
//     try {
//         const { user } = await getCurrentUser();

//         if (!user || !user.id) {
//             return { success: false, data: null, error: "Unauthorized access" };
//         }

//         const supabase = await createClient();

//         let query = supabase
//             .from("students")
//             .select(
//                 `
//                 created_at,
//                 firstname,
//                 lastname,
//                 applicants (
//                     id,
//                     applied_at,
//                     company_id,
//                     status
//                 ),
//                 exam_attempt (
//                     completed_at,
//                     exam_id,
//                     exam_title
//                 )
//             `
//             )
//             .eq("id", user.id)
//             .order("applied_at", {
//                 referencedTable: "applicants",
//                 ascending: false,
//             })
//             .order("completed_at", {
//                 referencedTable: "exam_attempt",
//                 ascending: false,
//             });

//         if (limit) {
//             query = query
//                 .limit(limit, { referencedTable: "applicants" })
//                 .limit(limit, { referencedTable: "exam_attempt" });
//         }

//         const { data, error } = await query.maybeSingle();

//         if (error) {
//             console.error(error.message);
//             return { success: false, data: null, error: error.message };
//         }

//         // 🧠 Extract all activity dates
//         const applicantDates = data?.applicants?.map((a) => a.applied_at) || [];
//         const examDates = data?.exam_attempt?.map((e) => e.completed_at) || [];

//         // Combine and remove nulls
//         const allDates = [...applicantDates, ...examDates].filter(Boolean);

//         // Optionally convert to JS Date objects (if your calendar needs Date type)
//         const parsedDates = allDates.map((date) => new Date(date));

//         return {
//             success: true,
//             data,
//             activityDates: parsedDates, // ✅ Calendar-friendly
//             error: null,
//         };
//     } catch (err) {
//         return {
//             success: false,
//             data: null,
//             error: err.message || "Unexpected error",
//         };
//     }
// }
