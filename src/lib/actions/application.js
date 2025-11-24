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

// Student action to submit their applications
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

    // Validation
    if (!resume_link) {
        return { success: false, error: "Please provide resume link." };
    }

    // URL validation
    try {
        const url = new URL(resume_link);
        if (url.protocol !== "https:") {
            return { success: false, error: "Resume link must use HTTPS." };
        }
    } catch {
        return { success: false, error: "Invalid resume link format." };
    }

    if (!company_id) {
        return { success: false, error: "Company ID is required." };
    }

    if (!student_id) {
        return { success: false, error: "Student ID is required." };
    }

    try {
        // 1. Check for existing application (SINGLE QUERY - OPTIMIZED)
        const { data: existingApplication, error: checkError } = await supabase
            .from("applicants")
            .select("id, status")
            .eq("student_id", student_id)
            .eq("company_id", company_id)
            .maybeSingle(); // Use maybeSingle() instead of single() to avoid errors when no match

        if (checkError) {
            console.error("Error checking existing application:", checkError);
            return {
                success: false,
                error: "Failed to verify application status. Please try again.",
            };
        }

        if (existingApplication) {
            // Application already exists
            return {
                success: false,
                error: "You have already submitted an application to this company.",
                applicationId: existingApplication.id,
                existingStatus: existingApplication.status,
            };
        }

        // 2. Prepare data for insertion
        const formatData = {
            resume_link,
            portfolio_link: portfolio_link || null,
            introduction: introduction || null,
            company_id,
            student_id,
            status: status || "pending",
        };

        const notificationData = {
            link_url: "/company/applicants",
            recipient_id: company_id,
            type: "application",
            title: "New Internship Application",
            message: student_name
                ? `${student_name} has submitted a new application to your company. Review the details to proceed with the next steps.`
                : "A new application has been submitted to your company. Review the details to proceed with the next steps.",
        };

        // 3. Insert application and notification in parallel
        const [applicationResult, notificationResult] = await Promise.all([
            supabase
                .from("applicants")
                .insert(formatData)
                .select("id")
                .single(),
            supabase.from("notifications").insert(notificationData),
        ]);

        // Check for application error (critical)
        if (applicationResult.error) {
            console.error(
                "Application submission error:",
                applicationResult.error
            );

            // Handle duplicate key error (race condition edge case)
            if (applicationResult.error.code === "23505") {
                return {
                    success: false,
                    error: "You have already submitted an application to this company.",
                };
            }

            return {
                success: false,
                error: "Failed to submit application. Please try again.",
            };
        }

        const application = applicationResult.data;

        // Log notification error but don't fail operation
        if (notificationResult.error) {
            console.error(
                "Notification creation failed:",
                notificationResult.error
            );
        }

        // 4. Fire-and-forget email (don't await)
        if (companyEmail) {
            sendEmailAsync(companyEmail, student_name, application.id).catch(
                (error) => {
                    console.error("Email failed (non-blocking):", error);
                }
            );
        }

        // 5. Revalidate relevant paths
        revalidatePath("/company/applicants");
        revalidatePath(`/student/companies/${company_id}`);
        revalidatePath("/student/applications"); // Student's applications list

        return {
            success: true,
            applicationId: application.id,
            message: "Application submitted successfully!",
        };
    } catch (error) {
        console.error("Unexpected error during application submission:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
        };
    }
}

// Fire-and-forget email function
async function sendEmailAsync(companyEmail, student_name, applicationId) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
        from: "InternMatch <donotreply@auth.internmatch.online>",
        to: companyEmail,
        subject: "New Application Received",
        react: StudentApplicationSubmitted({
            student_name: student_name || "A student",
            application_id: applicationId,
        }),
    });
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

// // Approve the application of a student
// // For instructor action
// export async function approveStudentApplication({
//     applicationId,
//     companyName,
//     companyEmail,
//     studentName,
//     studentEmail,
// }) {
//     const supabase = await createClient();

//     const { error } = await supabase
//         .from("applicants")
//         .update({
//             approved_at: new Date().toISOString(),
//             approve_status: "approved",
//         })
//         .eq("id", applicationId);

//     if (error) {
//         return { success: false, error: error.message };
//     }

//     // After successful application approval
//     const resend = new Resend(process.env.RESEND_API_KEY);

//     if (companyName && studentEmail) {
//         // Send password-change notification
//         const { error: emailError } = await resend.emails.send({
//             from: "InternMatch <no-reply@auth.internmatch.online>",
//             to: studentEmail,
//             subject: `${companyName} | Application Approved`,
//             react: <ApplicationApproved companyName={companyName} />,
//         });

//         if (emailError) {
//             console.log(
//                 "Error sending email for password change: ",
//                 emailError.message
//             );
//         }
//     }

//     if (companyEmail) {
//         const { error: emailError } = await resend.emails.send({
//             from: "InternMatch <no-reply@auth.internmatch.online>",
//             to: companyEmail,
//             subject: "Application Approved",
//             react: <CompanyStudentApproved studentName={studentName} />,
//         });

//         if (emailError) {
//             console.log(
//                 "Error sending email for password change: ",
//                 emailError.message
//             );
//         }
//     }

//     revalidatePath("/instructor/accepted", "page");
//     return { success: true, error: "" };
// }

// Approve the application of a student
// For instructor action
export async function approveStudentApplication({
    applicationId,
    companyId,
    companyName,
    companyEmail,
    studentName,
    studentEmail,
}) {
    const supabase = await createClient();

    // Validation
    if (!applicationId) {
        return { success: false, error: "Application ID is required." };
    }

    if (!companyId) {
        return { success: false, error: "Company ID is required." };
    }

    try {
        const approvalTimestamp = new Date().toISOString();

        // Prepare notification data for company
        const notificationData = {
            recipient_id: companyId,
            type: "application_approved",
            title: "Application Approved by Instructor",
            message: studentName
                ? `${studentName}'s application has been approved by the OJT instructor. You can now proceed with onboarding.`
                : "A student application has been approved by the OJT instructor. You can now proceed with onboarding.",
            link_url: `/company/applicants/${applicationId}`,
        };

        // 1. Update application and create notification in parallel (fast DB operations)
        const [updateResult, notificationResult] = await Promise.all([
            supabase
                .from("applicants")
                .update({
                    approved_at: approvalTimestamp,
                    approve_status: "approved",
                })
                .eq("id", applicationId)
                .select("id")
                .single(),
            supabase
                .from("notifications")
                .insert(notificationData)
                .select("id")
                .single(),
        ]);

        // Check for update error (critical)
        if (updateResult.error) {
            console.error("Application approval error:", updateResult.error);
            return {
                success: false,
                error: "Failed to approve application. Please try again.",
            };
        }

        // Log notification error but don't fail operation
        if (notificationResult.error) {
            console.error(
                "Notification creation error:",
                notificationResult.error
            );
        }

        // 2. Send emails asynchronously (fire-and-forget, non-blocking)
        if (studentEmail || companyEmail) {
            sendApprovalEmails({
                studentEmail,
                companyEmail,
                companyName,
                studentName,
            }).catch((error) => {
                console.error("Email sending failed (non-blocking):", error);
            });
        }

        // 3. Revalidate relevant paths
        revalidatePath("/instructor/accepted");
        revalidatePath("/instructor/student-applications");
        revalidatePath("/company/applicants");
        revalidatePath(`/student/applications`);

        return {
            success: true,
            error: null,
            message: "Application approved successfully!",
        };
    } catch (error) {
        console.error("Unexpected error during application approval:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
        };
    }
}

// Fire-and-forget email function
async function sendApprovalEmails({
    studentEmail,
    companyEmail,
    companyName,
    studentName,
}) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send both emails in parallel
    const emailPromises = [];

    // Email to student
    if (studentEmail && companyName) {
        emailPromises.push(
            resend.emails
                .send({
                    from: "InternMatch <no-reply@auth.internmatch.online>",
                    to: studentEmail,
                    subject: `${companyName} | Application Approved`,
                    react: ApplicationApproved({ companyName }),
                })
                .catch((error) => {
                    console.error(
                        "Error sending approval email to student:",
                        error.message
                    );
                })
        );
    }

    // Email to company
    if (companyEmail && studentName) {
        emailPromises.push(
            resend.emails
                .send({
                    from: "InternMatch <no-reply@auth.internmatch.online>",
                    to: companyEmail,
                    subject: "Student Application Approved",
                    react: CompanyStudentApproved({ studentName }),
                })
                .catch((error) => {
                    console.error(
                        "Error sending approval email to company:",
                        error.message
                    );
                })
        );
    }

    // Wait for all emails to complete (but don't block the main operation)
    if (emailPromises.length > 0) {
        await Promise.allSettled(emailPromises);
    }
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
