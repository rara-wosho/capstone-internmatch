"use server";

import { supabaseAdmin } from "../supabase/admin";
import { createClient } from "../supabase/server";

// create a company account using anon auth
export async function createCompanyAccount(form) {
    const supabase = await createClient();

    const name = form.companyName;
    const details = form.description;
    const phone = form.phone;
    const website = form?.website || "";
    const email = form?.email;
    const password = form?.password;
    const role = "company";

    // 🔒 Server-side validation
    if (!email || !password || !name || !details) {
        return {
            success: false,
            message: "All required fields must be filled.",
        };
    }

    if (password.length < 6) {
        return {
            success: false,
            message: "Password must be at least 6 characters long.",
        };
    }

    // 1. Create user in authentication
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name, role },
        },
    });

    if (error || !data?.user) {
        console.error("Auth create error:", error?.message);
        return {
            success: false,
            message: error?.message || "Failed to create user",
        };
    }

    const userId = data.user.id;

    // 2. Insert into companies table
    const { error: tableError } = await supabaseAdmin.from("companies").insert({
        id: userId,
        name,
        details,
        email,
        phone,
        website,
        role,
    });

    if (tableError) {
        console.error("DB insert error:", tableError.message);
        // rollback
        await supabaseAdmin.auth.admin.deleteUser(userId);
        return { success: false, message: tableError.message };
    }

    return { success: true, message: "Company account created successfully" };
}

// fetch all list of companies
export async function getCompanies() {
    const supabase = await createClient();

    const { data, count, error } = await supabase
        .from("companies")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: true });

    if (error) {
        return {
            data: null,
            count: 0,
            error: error.message || "Unable to load companies.",
        };
    }

    return { data, count, error: null };
}

// fetch company data for company profile
export async function getCompanyById(id) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("companies")
        .select()
        .eq("id", id)
        .single();

    if (error) {
        return {
            data: null,
            error: error.message || "Unable to load company data.",
        };
    }

    return { data, error: null };
}

// fetch company data and exams
export async function getCompanyDataAndExams(companyId) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("companies")
        .select(
            `*, exams(id, created_at, title, description, instruction, duration, mode, updated_at, questions(id))`
        )
        .eq("id", companyId)
        .eq("exams.is_published", true)
        .order("created_at", { referencedTable: "exams", ascending: true })
        .maybeSingle();

    if (error) {
        return {
            data: null,
            error: error.message || "Unable to load company data.",
        };
    }

    // Add question_count to each exam
    const examsWithCount =
        data?.exams?.map((exam) => ({
            ...exam,
            question_count: exam.questions?.length ?? 0,
        })) ?? [];

    return {
        data: {
            ...data,
            exams: examsWithCount,
        },
        error: null,
    };
}
