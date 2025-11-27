"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "../supabase/admin";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth";

// create a company account using anon auth
export async function createCompanyAccount(form) {
    const supabase = await createClient();

    const name = form.companyName;
    const details = form.description;
    const barangay = form.barangay;
    const city = form.city;
    const province = form.province;
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
        barangay,
        city,
        province,
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

    redirect("/company/offers?from=signup");
}

// Update company details
export async function updateCompanyDetails(formData) {
    // Get the company's id
    const companyId = formData.get("company-id") || "";

    if (!companyId) {
        return { success: false, error: "Unauthorized action." };
    }

    // Get and sanitize inputs
    const name = (formData.get("name") || "").trim();
    const details = (formData.get("details") || "").trim();
    const phone = (formData.get("phone") || "").trim();
    const website = (formData.get("website") || "").trim();
    const barangay = (formData.get("barangay") || "").trim();
    const city = (formData.get("city") || "").trim();
    const province = (formData.get("province") || "").trim();

    // Validate websit link
    if (!website.startsWith("http") && website) {
        return { success: false, error: "Invalid website link" };
    }

    // ✅ Basic validation
    if (!name || !details || !barangay || !city || !province) {
        return {
            success: false,
            error: "Please fill out all required fields before saving.",
        };
    }

    const supabase = await createClient();

    // Prepare data
    const rowData = {
        name,
        details,
        phone,
        website,
        barangay,
        city,
        province,
    };

    const { error } = await supabase
        .from("companies")
        .update(rowData)
        .eq("id", companyId);

    if (error) {
        return { success: false, error: error.message || "Update failed." };
    }

    revalidatePath("/company/profile");
    revalidatePath("/company/profile/edit");
    return { success: true, error: "" };
}

// fetch all list of companies
// with optional search
export async function getCompanies(search) {
    const supabase = await createClient();

    // Start with base query
    let query = supabase
        .from("companies")
        .select(
            "id, name, avatar_url, details, barangay, province, city, company_offers(offers)"
        );

    // Add search filter if provided
    if (search && search.trim() !== "") {
        const searchTerm = `%${search.trim()}%`;
        query = query.or(
            `name.ilike.${searchTerm},details.ilike.${searchTerm},barangay.ilike.${searchTerm},province.ilike.${searchTerm},city.ilike.${searchTerm}`
        );
    }

    // Add ordering
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

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
        .select(
            "avatar_url, barangay, city, province, details, email, links, name, phone, website, accept_applicants, accept_applicants_term, company_offers(offers)"
        )
        .eq("id", id)
        .maybeSingle();

    if (error) {
        return {
            data: null,
            error: error.message || "Unable to load company data.",
        };
    }

    if (!data) {
        return {
            data: null,
            error: "Company not found.",
        };
    }

    // ✅ Format data for consistent frontend use
    const formattedData = {
        name: data.name || "Unknown Company",
        avatar_url: data.avatar_url || "",
        email: data.email || "No email provided",
        accept_applicants: data.accept_applicants,
        accept_applicants_term: data.accept_applicants_term,
        phone: data.phone || "No phone number provided",
        website: data.website || "",
        barangay: data.barangay || "",
        city: data.city || "",
        province: data.province || "",
        details: data.details || "",
        links: Array.isArray(data.links) ? data.links : [],
        offers: data.company_offers?.offers.map((o) => o).filter(Boolean) || [],
    };

    return { data: formattedData, error: null };
}

// fetch company data and exams
export async function getCompanyDataAndExams(companyId) {
    // Get student id/current user id
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { data: null, error: "Unauthorized." };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("companies")
        .select(
            `id, created_at, name, details, barangay, province, city, phone, email, links, website, avatar_url, accept_applicants, accept_applicants_term, 
            company_offers(offers), 
            exams(id, created_at, title, description, instruction, duration, updated_at, questions(id), exam_attempt(completed_at))`
        )
        .eq("id", companyId)
        .eq("exams.is_published", true)
        .eq("exams.is_deleted", false)
        .eq("exams.exam_attempt.student_id", user.id)
        .order("created_at", { referencedTable: "exams", ascending: true })
        .maybeSingle();

    if (error) {
        return {
            data: null,
            error: error.message || "Unable to load company data.",
        };
    }

    // Early return if there is no company data
    if (!data) {
        return {
            data: null,
            error: "",
        };
    }

    // Add question_count to each exam
    const examsWithCount =
        data?.exams?.map((exam) => {
            const attempts = exam.exam_attempt || [];
            const hasAttempted = attempts.length > 0;

            return {
                ...exam,
                hasAttempted,
                question_count: exam.questions?.length ?? 0,
                // Remove unnecessary data
                questions: undefined,
                exam_attempt: undefined,
            };
        }) ?? [];

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

export async function upsertCompanyOffers(offers, companyId) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("company_offers")
        .upsert(
            { company_id: companyId, offers: offers },
            { onConflict: "company_id" }
        );

    if (error) {
        console.error(error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/company/offers", "page");
    return { success: true, error: "" };
}

// Get company's trash items
export async function getCompanyTrashItems() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return {
            success: false,
            error: "You are not authorized to perform this action.",
        };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("companies")
        .select(
            `
            id,
            exams (
                id,
                title,
                is_deleted,
                questions (
                    id,
                    question_text,
                    is_deleted
                )
            )
        `
        )
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        return { success: false, error: error.message };
    }

    if (!data) {
        return { success: true, data: { exams: [] }, error: null };
    }

    // ✅ Filter results manually (simpler and more flexible)
    const deletedExams = data.exams?.filter((exam) => exam.is_deleted) || [];
    const deletedQuestions =
        data.exams?.flatMap(
            (exam) =>
                exam.questions?.filter(
                    (q) => q.is_deleted && !exam.is_deleted
                ) || []
        ) || [];

    return {
        success: true,
        data: { deletedExams, deletedQuestions },
        error: null,
    };
}

// Get companies dashboard overview data
export async function getCompanyDashboardOverview(companyId) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("companies")
        .select(
            "accept_applicants, exams(title, is_published), exam_attempt(id), applicants(id, status)"
        )
        .eq("id", companyId)
        .eq("exams.is_deleted", false)
        .eq("exam_attempt.company_id", companyId)
        .neq("applicants.status", "cancelled")
        .order("created_at", { referencedTable: "exams", ascending: false })
        .maybeSingle();

    if (error) {
        return { success: false, error: error.message, data: [] };
    }

    return { success: true, error: "", data };
}

// Get company's activities
export async function getCompanyActivities() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { success: false, error: "Authorization failed." };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("companies")
        .select(
            `
            created_at,
            exams(created_at, title)
        `
        )
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        return { success: false, error: error.message, data: null };
    }

    const formattedData = {
        created_at: data?.created_at ?? null,
        exams: data?.exams ?? [],
    };

    return { success: true, error: "", data: formattedData };
}
