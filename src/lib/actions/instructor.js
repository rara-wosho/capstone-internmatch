"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../supabase/admin";
import { createClient } from "../supabase/server";

export async function createInstructor(formData) {
    // get and sanitize formdata
    const firstname = formData.get("firstname")?.toString().trim() || "";
    const lastname = formData.get("lastname")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";
    const role = "instructor";

    // 1. Create user in authentication
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        password,
        user_metadata: { firstname, lastname, role },
    });

    if (error || !data?.user) {
        console.error("Auth create error:", error?.message);
        return { success: false, data: null };
    }

    const userId = data.user.id;

    //   2. insert into instructor table
    const { error: tableError } = await supabaseAdmin
        .from("ojt_instructors")
        .insert({ id: userId, firstname, lastname, email, role });

    if (tableError) {
        // rollback: delete auth user to keep things consistent
        await supabaseAdmin.auth.admin.deleteUser(userId);
        return { success: false, data: null };
    }

    return { success: true, data: data.user };
}

// submit registration details
export async function submitRegistration(prevState, formData) {
    const supabase = await createClient();

    // Extract form data
    const registrationData = {
        firstname: formData.get("firstName"),
        lastname: formData.get("lastName"),
        email: formData.get("email"),
        school: formData.get("school"),
        barangay: formData.get("barangay"),
        city: formData.get("city"),
        province: formData.get("province"),
        documents_link: formData.get("documentsLink"),
    };

    // Validate required fields
    if (
        !registrationData.firstname ||
        !registrationData.lastname ||
        !registrationData.email ||
        !registrationData.school ||
        !registrationData.barangay ||
        !registrationData.city ||
        !registrationData.province ||
        !registrationData.documents_link
    ) {
        return {
            success: false,
            error: "All fields are required.",
            formData: registrationData, // Return the extracted data object
        };
    }

    // Validate link
    if (!registrationData.documents_link.startsWith("https")) {
        return {
            success: false,
            error: "Document link is invalid.",
            formData: registrationData,
        };
    }

    // Insert into Supabase
    const { error } = await supabase
        .from("registrations")
        .insert([registrationData]);

    if (error) {
        console.error("Error submitting registration:", error);
        return {
            success: false,
            error:
                error.code === "23505"
                    ? "This email you provided is already associated with a pending registration."
                    : "Something went wrong while submitting the form.",
            formData: registrationData,
        };
    }

    // Revalidate and redirect on success
    revalidatePath("/create-account/instructor");
    return {
        success: true,
        error: "",
        formData: null, // Clear form data on success
    };
}

// Get accepted applications for an instructor
export async function getAcceptedApplicationsByInstructor(
    instructorId,
    search
) {
    if (!instructorId) {
        return {
            success: false,
            error: "Not a valid instructor. Please provide instructor id.",
        };
    }

    const supabase = await createClient();

    let query = supabase
        .from("applicants")
        .select(
            `
            id,
            approved_at,
            approve_status,
            applied_at,
            status,
            students!inner(
                id,
                firstname,
                middlename,
                lastname,
                group_id,
                groups!inner(
                    id,
                    group_name,
                    ojt_instructor_id
                )
            ),
            companies!inner(
                id,
                name
            )
            `
        )
        .eq("status", "accepted")
        .eq("students.groups.ojt_instructor_id", instructorId)
        .order("approved_at", { ascending: false });

    if (search?.trim()) {
        const searchTerm = `%${search.trim()}%`;
        query = query.or(
            `firstname.ilike.${searchTerm},middlename.ilike.${searchTerm},lastname.ilike.${searchTerm}`,
            { foreignTable: "students" }
        );
    }

    const { data, error } = await query;

    if (error) {
        return { success: false, error: error.message, data: null };
    }

    // ✅ Get all approved students across all companies
    const { data: approvedStudents, error: approvedError } = await supabase
        .from("applicants")
        .select("student_id, approve_status")
        .eq("approve_status", "approved");

    if (approvedError) {
        return { success: false, error: approvedError.message, data: null };
    }

    // Create a lookup of approved student IDs
    const approvedStudentIds = new Set(
        approvedStudents.map((s) => s.student_id)
    );

    // Format and group by company
    const formattedData = (data ?? []).map((d) => ({
        id: d.id,
        approved_at: d.approved_at,
        approve_status: d.approve_status,
        applied_at: d.applied_at,
        student_id: d.students.id,
        firstname: d.students.firstname,
        middlename: d.students.middlename,
        lastname: d.students.lastname,
        group_id: d.students.group_id,
        group_name: d.students.groups.group_name,
        company_id: d.companies.id,
        company_name: d.companies.name,
        // ✅ Add this flag to check if this student is already approved elsewhere
        isAlreadyApproved:
            d.approve_status !== "approved" &&
            approvedStudentIds.has(d.students.id),
    }));

    // Group by company
    const groupedByCompany = formattedData.reduce((acc, item) => {
        const companyId = item.company_id;

        if (!acc[companyId]) {
            acc[companyId] = {
                company_id: companyId,
                company_name: item.company_name,
                students: [],
            };
        }

        acc[companyId].students.push({
            id: item.id,
            approved_at: item.approved_at,
            approve_status: item.approve_status,
            applied_at: item.applied_at,
            student_id: item.student_id,
            firstname: item.firstname,
            middlename: item.middlename,
            lastname: item.lastname,
            group_id: item.group_id,
            group_name: item.group_name,
            isAlreadyApproved: item.isAlreadyApproved,
        });

        return acc;
    }, {});

    const result = Object.values(groupedByCompany).sort((a, b) =>
        a.company_name.localeCompare(b.company_name)
    );

    return { success: true, error: "", data: result };
}

// Get the result of assessment tests for the instructor
export async function getInstructorAssessmentResults(instructorId, search) {
    if (!instructorId) {
        return {
            success: false,
            error: "Invalid instructor ID.",
            data: [],
        };
    }

    const supabase = await createClient();

    let query = supabase
        .from("assessment_attempt")
        .select(
            `
            id,
            submitted_at,
            assessment_score,
            assessment_total_item,
            violation,
            students!inner (
                id,
                firstname,
                lastname,
                group_id,
                groups!inner (
                    id,
                    group_name,
                    ojt_instructor_id
                )
            ),
            assessment_test!inner (
                id,
                assessment_title
            )
            `
        )
        .eq("students.groups.ojt_instructor_id", instructorId)
        .order("submitted_at", { ascending: false });

    if (search?.trim()) {
        const searchTerm = `%${search.trim()}%`;

        query = query.or(
            `firstname.ilike.${searchTerm},lastname.ilike.${searchTerm}`,
            { foreignTable: "students" }
        );
    }

    const { data, error } = await query;

    if (error) {
        return { success: false, error: error.message, data: [] };
    }

    // ✅ Format neatly
    const formatted = data.map((d) => ({
        id: d.id,
        submitted_at: d.submitted_at,
        violation: d.violation,
        score: d.assessment_score,
        total: d.assessment_total_item,
        student_id: d.students.id,
        firstname: d.students.firstname,
        lastname: d.students.lastname,
        group_id: d.students.groups.id,
        group_name: d.students.groups.group_name,
        test_id: d.assessment_test.id,
        test_title: d.assessment_test.assessment_title,
    }));

    return { success: true, error: "", data: formatted };
}

//  Fetch all students' exam results under the instructor's supervision.
//  Optionally filter by a search query (name).
export async function getStudentExamResults(instructorId, search) {
    if (!instructorId) {
        return {
            success: false,
            error: "Missing instructor ID.",
            data: null,
        };
    }

    const supabase = await createClient();

    // --- Build the base query ---
    let query = supabase
        .from("students")
        .select(
            `
            id,
            firstname,
            middlename,
            lastname,
            groups!inner(
                id,
                group_name,
                ojt_instructor_id
            ),
            exam_attempt(
                id,
                exam_id,
                exam_title,
                completed_at,
                score,
                total_questions,
                companies(name, id)
            )
        `
        )
        .eq("groups.ojt_instructor_id", instructorId);

    // --- Apply search filter if provided ---
    if (search.trim() !== "") {
        query = query.or(
            `firstname.ilike.%${search}%,lastname.ilike.%${search}%,middlename.ilike.%${search}%`
        );
    }

    const { data, error } = await query;

    if (error) {
        return { success: false, error: error.message, data: null };
    }

    if (!data || data.length === 0) {
        return {
            success: true,
            data: [],
            error: "",
        };
    }

    // --- Group students by group name ---
    const groupedData = data.reduce((acc, student) => {
        const groupName = student.groups?.group_name || "Ungrouped";
        if (!acc[groupName]) {
            acc[groupName] = [];
        }

        acc[groupName].push({
            id: student.id,
            name: `${student.firstname} ${student.middlename || ""} ${student.lastname}`.trim(),
            exams: (student.exam_attempt || []).map((exam) => ({
                id: exam.id,
                title: exam.exam_title,
                company: exam.companies?.name || "N/A",
                company_id: exam.companies?.id,
                score: exam.score,
                total_questions: exam.total_questions,
                completed_at: exam.completed_at,
            })),
        });

        return acc;
    }, {});

    // --- Format grouped data into array for easy frontend rendering ---
    const formattedData = Object.entries(groupedData).map(
        ([groupName, students]) => ({
            group_name: groupName,
            students,
        })
    );

    return { success: true, data: formattedData, error: "" };
}

// Update instructor profile
export async function updateInstructorProfile(prevState, formData) {
    const supabase = await createClient();

    // Extract form data
    const firstname = formData.get("firstname")?.trim();
    const lastname = formData.get("lastname")?.trim();
    const middlename = formData.get("middlename")?.trim() || null;
    const age = formData.get("age")?.trim();
    const gender = formData.get("gender");
    const school = formData.get("school")?.trim();
    const barangay = formData.get("barangay")?.trim();
    const city = formData.get("city")?.trim();
    const province = formData.get("province")?.trim();
    const instructorId = formData.get("instructorId");

    // Validation
    const errors = {};

    if (!firstname || firstname.length < 2) {
        errors.firstname = "First name must be at least 2 characters";
    }

    if (!lastname || lastname.length < 2) {
        errors.lastname = "Last name must be at least 2 characters";
    }

    if (!age || age < 12 || age > 100) {
        errors.age = "Age must be between 12 and 100";
    }

    if (!gender || !["male", "female"].includes(gender)) {
        errors.gender = "Please select a valid gender";
    }

    if (!school || school.length < 3) {
        errors.school = "School name must be at least 3 characters";
    }

    if (!barangay || barangay.length < 2) {
        errors.barangay = "Barangay must be at least 2 characters";
    }

    if (!city || city.length < 2) {
        errors.city = "City/Municipality must be at least 2 characters";
    }

    if (!province || province.length < 2) {
        errors.province = "Province must be at least 2 characters";
    }

    if (!instructorId) {
        errors.general = "Invalid instructor ID";
    }

    // Return validation errors
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        };
    }

    // Update instructor profile
    const { error } = await supabase
        .from("ojt_instructors")
        .update({
            firstname,
            lastname,
            middlename,
            age,
            gender,
            school,
            barangay,
            city,
            province,
            updated_at: new Date().toISOString(),
        })
        .eq("id", instructorId);

    if (error) {
        return {
            success: false,
            errors: {
                general: "Failed to update profile. Please try again.",
            },
        };
    }

    // Revalidate the page to show updated data
    revalidatePath("/instructor/profile");

    return {
        success: true,
        message: "Profile updated successfully!",
    };
}
