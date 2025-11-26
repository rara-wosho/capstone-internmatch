"use server";

import { createClient } from "../supabase/server";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { ScheduleNotificationEmail } from "@/components/email/ScheduleNotificationEmail";

// Get company schedules
export async function getCompanySchedules() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { error: "Unauthorized user", data: null };
    }

    const supabase = await createClient();

    // Query 1: Fetch all company schedules
    const { data: schedules, error } = await supabase
        .from("schedules")
        .select(
            "id, title, details, updated_at, time, date, additional_notes, location, type, schedule_student_ids(id, students(id, firstname, lastname, email, school))"
        )
        .eq("company_id", user.id)
        .order("date", { ascending: false })
        .order("time", { ascending: false });

    if (error) {
        console.error("Error fetching schedules:", error);
        return { error: error.message, data: null };
    }

    // Format data to flatten the structure and extract students
    const formattedData = schedules.map((schedule) => {
        // Extract students from the junction table relationship
        const students =
            schedule.schedule_student_ids?.map((junction) => ({
                id: junction.students?.id,
                firstname: junction.students?.firstname,
                lastname: junction.students?.lastname,
                email: junction.students?.email,
                school: junction.students?.school,
                fullname:
                    `${junction.students?.firstname || ""} ${junction.students?.lastname || ""}`.trim(),
            })) || [];

        return {
            schedule_id: schedule.id,
            title: schedule.title,
            details: schedule.details,
            time: schedule.time,
            updated_at: schedule?.updated_at,
            date: schedule.date,
            additional_notes: schedule.additional_notes,
            location: schedule.location,
            type: schedule.type,
            students: students,
            student_count: students.length,
            // Additional formatted fields for easier display
            date: schedule.date,
            time: schedule.time,
        };
    });

    return { data: formattedData, error: "" };
}

const VALID_SCHEDULE_TYPES = [
    "orientation",
    "meeting",
    "training",
    "evaluation",
    "interview",
];

// Create schedule for company
// export async function createSchedule(prev, formData) {
//     const { user } = await getCurrentUser();

//     if (!user || !user?.id) {
//         return {
//             success: false,
//             error: "Expired session token.",
//             time: Date.now(),
//         };
//     }

//     const supabase = await createClient();

//     // Extract and trim data
//     const type = formData.get("type")?.trim();
//     const title = formData.get("title")?.trim();
//     const details = formData.get("details")?.trim();
//     const notes = formData.get("notes")?.trim();
//     const date = formData.get("date")?.trim();
//     const time = formData.get("time")?.trim();
//     const location = formData.get("location")?.trim();
//     const student_ids = formData.get("student_ids");
//     const student_emails = formData.get("student_emails");

//     console.log("studentids", student_ids.)

//     // Store form data for repopulation on error
//     // const formData_obj = {
//     //     type,
//     //     title,
//     //     details,
//     //     notes,
//     //     date,
//     //     time,
//     //     location,
//     // };

//     // // Validation errors
//     // const errors = {};

//     // // Validate type
//     // if (!type) {
//     //     errors.type = "Schedule type is required";
//     // } else if (!VALID_SCHEDULE_TYPES.includes(type)) {
//     //     errors.type = "Invalid schedule type";
//     // }

//     // // Validate title
//     // if (!title || title.length < 3) {
//     //     errors.title = "Title must be at least 3 characters";
//     // }

//     // // Validate details
//     // if (!details || details.length < 10) {
//     //     errors.details = "Details must be at least 10 characters";
//     // }

//     // // Validate date and time
//     // if (!date) {
//     //     errors.date = "Date is required";
//     // } else {
//     //     const selectedDate = new Date(date);
//     //     const today = new Date();
//     //     today.setHours(0, 0, 0, 0);

//     //     if (selectedDate < today) {
//     //         errors.date = "Date cannot be in the past";
//     //     }

//     //     // Validate time if provided
//     //     if (time) {
//     //         const selectedDateTime = new Date(`${date}T${time}`);
//     //         const now = new Date();

//     //         if (selectedDateTime < now) {
//     //             errors.time = "Schedule time cannot be in the past";
//     //         }
//     //     }
//     // }

//     // // Validate location
//     // if (!location || location.length < 3) {
//     //     errors.location = "Location must be at least 3 characters";
//     // }

//     // // Validate student_id and verify permission
//     // if (!student_id) {
//     //     errors.general = "Student ID is missing";
//     // }

//     // // Return validation errors
//     // if (Object.keys(errors).length > 0) {
//     //     return {
//     //         success: false,
//     //         errors,
//     //         formData: formData_obj,
//     //         time: Date.now(),
//     //     };
//     // }

//     // // Format data for Supabase
//     // const scheduleData = {
//     //     type,
//     //     title,
//     //     details,
//     //     additional_notes: notes || null,
//     //     date,
//     //     time: time || null,
//     //     location,
//     //     student_id,
//     //     company_id: user.id,
//     //     created_at: new Date().toISOString(),
//     // };

//     // // Insert into DB
//     // const { error } = await supabase.from("schedules").insert(scheduleData);

//     // if (error) {
//     //     console.error("Error creating schedule:", error);
//     //     return {
//     //         success: false,
//     //         error: "Failed to create schedule. Please try again.",
//     //         formData: formData_obj,
//     //         time: Date.now(),
//     //     };
//     // }

//     // if (student_email) {
//     //     // After successful application approval
//     //     const resend = new Resend(process.env.RESEND_API_KEY);

//     //     // Send password-change notification
//     //     const { error: emailError } = await resend.emails.send({
//     //         from: "InternMatch <no-reply@auth.internmatch.online>",
//     //         to: student_email,
//     //         subject: `Requesting for additional documents`,
//     //         react: (
//     //             <ApplicationCannotProceed
//     //                 message={message}
//     //                 companyName={companyName}
//     //             />
//     //         ),
//     //     });

//     //     if (emailError) {
//     //         console.log(
//     //             "Error sending email for password change: ",
//     //             emailError.message
//     //         );
//     //     }
//     // }

//     // Revalidate relevant paths
//     // revalidatePath("/company/schedules");

//     // redirect("/company/schedules");

//     // return {
//     //     success: true,
//     //     error: null,
//     //     formData: null,
//     //     time: Date.now(),
//     // };
// }

export async function createSchedule(prevState, formData) {
    const supabase = await createClient();
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { error: "Unauthorized user" };
    }

    // Get form data
    const rawData = Object.fromEntries(formData);
    const {
        title,
        details,
        date,
        time,
        location,
        type,
        notes,
        student_ids, // This is now a comma-separated string of student IDs
        student_emails, // This is now a comma-separated string of student emails
        company_name,
    } = rawData;

    // Validation
    const errors = {};
    if (!title?.trim()) errors.title = "Schedule name is required";
    if (!details?.trim()) errors.details = "Details are required";
    if (!date) errors.date = "Date is required";
    if (!time) errors.time = "Time is required";
    if (!location?.trim()) errors.location = "Location is required";
    if (!type) errors.type = "Schedule type is required";

    // Validate student IDs
    const studentIds = student_ids?.split(",").filter((id) => id.trim()) || [];
    const studentEmails =
        student_emails?.split(",").filter((email) => email.trim()) || [];

    if (studentIds.length === 0) {
        errors.student_ids = "At least one student must be selected";
    }

    if (Object.keys(errors).length > 0) {
        return { errors, formData: rawData };
    }

    try {
        // Start a transaction for bulk insertion
        const scheduleData = {
            title: title.trim(),
            details: details.trim(),
            date,
            time,
            location: location.trim(),
            type,
            additional_notes: notes?.trim() || null,
            company_id: user.id,
        };

        // 1. Insert the main schedule
        const { data: schedule, error: scheduleError } = await supabase
            .from("schedules")
            .insert(scheduleData)
            .select("id")
            .single();

        if (scheduleError) {
            console.error("Schedule creation error:", scheduleError);
            return {
                error: "Failed to create schedule: " + scheduleError.message,
            };
        }

        // 2. Insert multiple records into schedule_students junction table
        const scheduleStudentsData = studentIds.map((studentId) => ({
            schedule_id: schedule.id,
            student_id: studentId,
        }));

        const { error: junctionError } = await supabase
            .from("schedule_student_ids")
            .insert(scheduleStudentsData);

        if (junctionError) {
            console.error("Schedule students insertion error:", junctionError);

            // Rollback: delete the schedule if student insertion fails
            await supabase.from("schedules").delete().eq("id", schedule.id);

            return {
                error:
                    "Failed to assign students to schedule: " +
                    junctionError.message,
            };
        }

        if (studentEmails.length > 0 && company_name) {
            const resend = new Resend(process.env.RESEND_API_KEY);

            const formatResendData = studentEmails?.map((email) => ({
                from: "InternMatch <donotreply@auth.internmatch.online>",
                to: [email],
                subject: `${company_name} set a schedule`,
                react: ScheduleNotificationEmail({
                    scheduleData,
                    companyName: company_name,
                }),
            }));

            const { error } = await resend.batch.send(formatResendData);

            if (error) {
                console.error(
                    "Error sending email to schedule participants: ",
                    error.message
                );
            }
        }

        return {
            success: true,
            message: "Schedule created successfully.",
            time: Date.now(),
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { error: "An unexpected error occurred: " + error.message };
    }
}

// Update the schedule details

export async function updateSchedule(prevState, formData) {
    const supabase = await createClient();
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { error: "Unauthorized user" };
    }

    const rawData = Object.fromEntries(formData);
    const {
        schedule_id,
        title,
        details,
        date,
        time,
        location,
        type,
        additional_notes,
    } = rawData;

    // Validation
    const errors = {};
    if (!title?.trim()) errors.title = "Schedule name is required";
    if (!details?.trim()) errors.details = "Details are required";
    if (!date) errors.date = "Date is required";
    if (!time) errors.time = "Time is required";
    if (!location?.trim()) errors.location = "Location is required";
    if (!type) errors.type = "Schedule type is required";
    if (!schedule_id) errors.schedule_id = "Schedule ID is required";

    if (Object.keys(errors).length > 0) {
        return { errors, formData: rawData };
    }

    try {
        const updateData = {
            title: title.trim(),
            details: details.trim(),
            date,
            time,
            location: location.trim(),
            type,
            additional_notes: additional_notes?.trim() || null,
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from("schedules")
            .update(updateData)
            .eq("id", schedule_id)
            .eq("company_id", user.id) // Security: ensure user owns this schedule
            .select()
            .single();

        if (error) {
            console.error("Schedule update error:", error);
            return { error: "Failed to update schedule: " + error.message };
        }

        revalidatePath("/company/schedules");

        return {
            success: true,
            message: "Schedule updated successfully",
            time: Date.now(),
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { error: "An unexpected error occurred: " + error.message };
    }
}
