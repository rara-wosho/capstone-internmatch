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

    const { data, error } = await supabase
        .from("companies")
        .select()
        .order("created_at", { ascending: true });

    if (error) {
        return {
            data: null,
            error: error.message || "Unable to load companies.",
        };
    }

    return { data, error: null };
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
            `*, exams(id, created_at, title, description, instruction, duration, updated_at, questions(id))`
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

// update application status and terms
export async function updateApplicationSettings(
    companyId,
    acceptApplicants,
    acceptTerm
) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("companies")
        .update({
            accept_applicants: acceptApplicants,
            accept_applicants_term: acceptTerm,
        })
        .eq("id", companyId);

    if (error) {
        return { success: false, error: "Unable to save changes." };
    }

    return { success: true, error: null };
}

// check if student is eligible to apply to a company
export async function checkStudentEligibility(companyId, studentId) {
    const supabase = await createClient();

    // Fetch company info
    const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .select("accept_applicants, accept_applicants_term, exams(id)")
        .eq("id", companyId)
        .single();

    if (companyError) {
        return { eligible: false, error: companyError.message };
    }

    // get exams length, if no exams, set to empty array
    const exams = companyData?.exams ?? [];

    // Company not accepting applicants
    if (!companyData?.accept_applicants) {
        return {
            eligible: false,
            message: "Company is not accepting applicants at the moment.",
        };
    }

    // Accept anytime
    if (companyData.accept_applicants_term === "anytime") {
        return { eligible: true };
    }

    // Fetch student exam attempts
    const { data: studentAttempts, error: attemptsError } = await supabase
        .from("exam_attempt")
        .select("exam_id") // use exam_id to deduplicate later
        .eq("student_id", studentId)
        .eq("company_id", companyId);

    if (attemptsError) {
        return { eligible: false, error: attemptsError.message };
    }

    // Deduplicate by exam_id in case of multiple attempts
    const attemptedExamIds = new Set(studentAttempts?.map((a) => a.exam_id));

    // Check conditions
    if (
        companyData.accept_applicants_term === "all" &&
        exams.length > 0 &&
        attemptedExamIds.size === exams.length
    ) {
        return { eligible: true };
    }

    if (
        companyData.accept_applicants_term === "some" &&
        attemptedExamIds.size > 0
    ) {
        return { eligible: true };
    }

    return {
        eligible: false,
        message: "Student has not met the company’s application requirements.",
    };
}
