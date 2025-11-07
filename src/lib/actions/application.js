"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { Resend } from "resend";
import { getCurrentUser } from "./auth";

export async function submitApplication(formData) {
    const supabase = await createClient();

    if (!formData.resume_link) {
        return { Success: false, error: "Please provide resume link." };
    }

    const { error } = await supabase.from("applicants").insert(formData);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, error: null };
}

// update application status
export async function updateApplicationStatus({
    newStatus,
    applicationId,
    receiver,
    companyName,
    companyEmail,
}) {
    const supabase = await createClient();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const allowedStatuses = ["pending", "accepted", "rejected", "reviewed"];

    if (!allowedStatuses.includes(newStatus)) {
        return { success: false, error: "Invalid Status" };
    }

    const { error } = await supabase
        .from("applicants")
        .update({ status: newStatus, reviewed_at: new Date().toISOString() })
        .eq("id", applicationId);

    if (error) {
        return { success: false, error: "Unable to update status" };
    }

    // if (newStatus === "accepted" && receiver) {
    //     const { data, error } = await resend.emails.send({
    //         from: "InternMatch@resend.dev",
    //         to: receiver,
    //         subject: "🎉 Congratulations!",
    //         react: ApplicationSuccess({ companyName }),
    //         reply_to: companyEmail,
    //     });

    //     console.log("error: ", error);
    //     console.log("new status: ", newStatus);
    //     console.log("receiver : ", receiver);
    //     console.log("email response: ", data);
    //     console.log("company email: ", companyEmail);
    // }

    revalidatePath(`/company/applicants/${applicationId}`);
    revalidatePath("/company/applicants");
    return { success: true };
}

// cancel application
export async function cancelApplication(applicationId) {
    try {
        const { user, error: userError } = await getCurrentUser();
        if (userError || !user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const supabase = await createClient();

        // cancel status if student is the owner
        const { error } = await supabase
            .from("applicants")
            .update({ status: "cancelled" })
            .eq("id", applicationId)
            .eq("student_id", user.id); // ✅ Removed optional chaining

        if (error) {
            console.error("Cancel error:", error);
            return { success: false, error: "Failed to cancel application" };
        }

        revalidatePath("/student/applications");
        return { success: true };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}

// resubmit application
export async function resubmitApplication(applicationId) {
    try {
        const { user, error: userError } = await getCurrentUser();
        if (userError || !user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from("applicants")
            .update({
                status: "pending",
                applied_at: new Date().toISOString(),
                reviewed_at: null,
            })
            .eq("id", applicationId)
            .eq("student_id", user.id); // ✅ Removed optional chaining

        if (error) {
            console.error("Resubmit error:", error);
            return { success: false, error: "Failed to resubmit application" };
        }

        revalidatePath("/student/applications");
        return { success: true };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}

// update application details
export async function updateApplication(applicationId, data) {
    try {
        const { user, error: userError } = await getCurrentUser();
        if (userError || !user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Validate data
        if (!data.resume_link || !data.resume_link.startsWith("http")) {
            return { success: false, error: "Valid resume link is required" };
        }

        if (data.portfolio_link && !data.portfolio_link.startsWith("http")) {
            return {
                success: false,
                error: "Portfolio link must be a valid URL",
            };
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from("applicants")
            .update({
                resume_link: data.resume_link,
                portfolio_link: data.portfolio_link || null,
                introduction: data.introduction || null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", applicationId)
            .eq("student_id", user.id);

        if (error) {
            console.error("Update error:", error);
            return { success: false, error: "Failed to update application" };
        }

        revalidatePath("/student/applications");
        return { success: true };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}

// Get approved and accepted applications by company
export async function getApprovedApplicantsByCompany(companyId) {
    if (!companyId) {
        return {
            success: false,
            error: "Not a valid user. Please provide user id.",
        };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("applicants")
        .select(
            `
            id,
            approved_at,
            applied_at,
            students!inner(
                firstname,
                middlename,
                lastname,
                school
            )
            `
        )
        .eq("company_id", companyId)
        .eq("status", "accepted")
        .not("approved_at", "is", null)
        .order("approved_at", { ascending: false });

    if (error) {
        return { success: false, error: error.message, data: null };
    }

    // ✅ Format returned data cleanly
    const formattedData = data.map((d) => ({
        id: d.id,
        approved_at: d.approved_at,
        applied_at: d.applied_at,
        firstname: d.students.firstname,
        middlename: d.students.middlename,
        lastname: d.students.lastname,
        school: d.students.school,
    }));

    return { success: true, error: "", data: formattedData };
}
