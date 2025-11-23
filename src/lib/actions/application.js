"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { Resend } from "resend";
import { getCurrentUser } from "./auth";
import { ApplicationSuccess } from "@/components/email/ApplicationSuccess";
import { ApplicationRejected } from "@/components/email/ApplicationRejected";
import { ApplicationApproved } from "@/components/email/ApplicationApproved";
import { ApplicationCannotProceed } from "@/components/email/ApplicationCannotProceed";
import { CompanyStudentApproved } from "@/components/email/CompanyStudentApproved";
import { StudentApplicationSubmitted } from "@/components/email/StudentApplicationSubmitted";

export async function submitApplication(formData) {
    const supabase = await createClient();

    // Extract data from formData
    const {
        student_name,
        companyEmail,
        resume_link,
        portfolio_link,
        introduction,
        company_id,
        student_id,
        status,
    } = formData;

    if (!formData.resume_link) {
        return { Success: false, error: "Please provide resume link." };
    }

    const formatData = {
        resume_link,
        portfolio_link,
        introduction,
        company_id,
        student_id,
        status,
    };

    const { error } = await supabase.from("applicants").insert(formatData);

    if (error) {
        return { success: false, error: error.message };
    }

    if (companyEmail) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: "InternMatch <donotreply@auth.internmatch.online>",
            to: companyEmail,
            subject: "New Application",
            react: StudentApplicationSubmitted({ student_name }),
            reply_to: companyEmail,
        });

        if (error) {
            console.error(
                "Error sending new application email to company. ",
                error?.message
            );
        }
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

    if (newStatus === "accepted" && receiver) {
        const { data, error } = await resend.emails.send({
            from: "InternMatch <no-reply@auth.internmatch.online>",
            to: receiver,
            subject: `${companyName} | 🎉 Application Accepted!`,
            react: ApplicationSuccess({ companyName }),
            reply_to: companyEmail,
        });

        if (error) {
            console.error(
                'Error sending "Accepted" application status. ',
                error?.message
            );
        }
    }

    if (newStatus === "rejected" && receiver) {
        const { data, error } = await resend.emails.send({
            from: "InternMatch <no-reply@auth.internmatch.online>",
            to: receiver,
            subject: `${companyName} | Application Rejected`,
            react: ApplicationRejected({ companyName }),
            reply_to: companyEmail,
        });

        if (error) {
            console.error(
                'Error sending "Rejected" application status. ',
                error?.message
            );
        }
    }

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

// Get approved and accepted applications by company (with optional search)
// This  is for the company
export async function getApprovedApplicantsByCompany(companyId, search) {
    if (!companyId) {
        return {
            success: false,
            error: "Not a valid user. Please provide user id.",
        };
    }

    const supabase = await createClient();

    // Base query
    let query = supabase
        .from("applicants")
        .select(
            `
            id,
            approved_at,
            applied_at,
            approve_status,
            status,
            students!inner(
            id,
                firstname,
                middlename,
                lastname,
                school,
                course,
                avatar_url,
                barangay,
                city,
                province,
                email
            )
            `
        )
        .eq("company_id", companyId)
        .eq("status", "accepted")
        .eq("approve_status", "approved");

    //  Optional search - filter on the students table with OR logic
    // Search query on a referenced table
    if (search?.trim()) {
        const searchTerm = `%${search.trim()}%`;

        // Use the correct syntax for filtering on joined tables
        query = query.or(
            `firstname.ilike.${searchTerm},middlename.ilike.${searchTerm},lastname.ilike.${searchTerm},school.ilike.${searchTerm},course.ilike.${searchTerm}`,
            { foreignTable: "students" }
        );
    }

    query = query.order("approved_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
        return { success: false, error: error.message, data: null };
    }

    return { success: true, error: "", data };
}

// Approve the application of a student
// For instructor action
export async function approveStudentApplication({
    applicationId,
    companyName,
    companyEmail,
    studentName,
    studentEmail,
}) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("applicants")
        .update({
            approved_at: new Date().toISOString(),
            approve_status: "approved",
        })
        .eq("id", applicationId);

    if (error) {
        return { success: false, error: error.message };
    }

    // After successful application approval
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (companyName && studentEmail) {
        // Send password-change notification
        const { error: emailError } = await resend.emails.send({
            from: "InternMatch <no-reply@auth.internmatch.online>",
            to: studentEmail,
            subject: `${companyName} | Application Approved`,
            react: <ApplicationApproved companyName={companyName} />,
        });

        if (emailError) {
            console.log(
                "Error sending email for password change: ",
                emailError.message
            );
        }
    }
    if (companyEmail) {
        // Send password-change notification
        const { error: emailError } = await resend.emails.send({
            from: "InternMatch <no-reply@auth.internmatch.online>",
            to: companyEmail,
            subject: "Application Approved",
            react: <CompanyStudentApproved studentName={studentName} />,
        });

        if (emailError) {
            console.log(
                "Error sending email for password change: ",
                emailError.message
            );
        }
    }

    revalidatePath("/instructor/accepted", "page");
    return { success: true, error: "" };
}

//Reject the accepted application with note
export async function submitCannotProceedStatus(
    applicationId,
    message = "",
    companyName,
    studentEmail
) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("applicants")
        .update({ approve_status: "rejected", cannot_proceed_message: message })
        .eq("id", applicationId);

    if (error) {
        console.log(error);
        return { success: false, error: error.message };
    }

    if (companyName && studentEmail) {
        // After successful application approval
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send password-change notification
        const { error: emailError } = await resend.emails.send({
            from: "InternMatch <no-reply@auth.internmatch.online>",
            to: studentEmail,
            subject: `Application Update`,
            react: (
                <ApplicationCannotProceed
                    message={message}
                    companyName={companyName}
                />
            ),
        });

        if (emailError) {
            console.log(
                "Error sending email for password change: ",
                emailError.message
            );
        }
    }

    revalidatePath("instructor/accepted");
    return { success: true, error: "" };
}
