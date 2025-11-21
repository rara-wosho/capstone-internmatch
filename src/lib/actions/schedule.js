"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

export async function getCompanySchedules() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { error: "Unauthorized user", data: null };
    }
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("schedules")
        .select(
            "id, title, details, date, time, additional_notes,location, type, students!inner(firstname,lastname,school,avatar_url), companies(name)"
        )
        .eq("company_id", user.id);

    if (error) {
        console.error(error);
        return { error: error.message, data: null };
    }

    return { data, error: "" };
}

const VALID_SCHEDULE_TYPES = [
    "orientation",
    "meeting",
    "training",
    "evaluation",
    "interview",
];

// Create schedule for company
export async function createSchedule(prev, formData) {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return {
            success: false,
            error: "Expired session token.",
            time: Date.now(),
        };
    }

    const supabase = await createClient();

    // Extract and trim data
    const type = formData.get("type")?.trim();
    const title = formData.get("title")?.trim();
    const details = formData.get("details")?.trim();
    const notes = formData.get("notes")?.trim();
    const date = formData.get("date")?.trim();
    const time = formData.get("time")?.trim();
    const location = formData.get("location")?.trim();
    const student_id = formData.get("student_id");
    const student_email = formData.get("student_email");

    // Store form data for repopulation on error
    const formData_obj = {
        type,
        title,
        details,
        notes,
        date,
        time,
        location,
    };

    // Validation errors
    const errors = {};

    // Validate type
    if (!type) {
        errors.type = "Schedule type is required";
    } else if (!VALID_SCHEDULE_TYPES.includes(type)) {
        errors.type = "Invalid schedule type";
    }

    // Validate title
    if (!title || title.length < 3) {
        errors.title = "Title must be at least 3 characters";
    }

    // Validate details
    if (!details || details.length < 10) {
        errors.details = "Details must be at least 10 characters";
    }

    // Validate date and time
    if (!date) {
        errors.date = "Date is required";
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.date = "Date cannot be in the past";
        }

        // Validate time if provided
        if (time) {
            const selectedDateTime = new Date(`${date}T${time}`);
            const now = new Date();

            if (selectedDateTime < now) {
                errors.time = "Schedule time cannot be in the past";
            }
        }
    }

    // Validate location
    if (!location || location.length < 3) {
        errors.location = "Location must be at least 3 characters";
    }

    // Validate student_id and verify permission
    if (!student_id) {
        errors.general = "Student ID is missing";
    }

    // Return validation errors
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
            formData: formData_obj,
            time: Date.now(),
        };
    }

    // Format data for Supabase
    const scheduleData = {
        type,
        title,
        details,
        additional_notes: notes || null,
        date,
        time: time || null,
        location,
        student_id,
        company_id: user.id,
        created_at: new Date().toISOString(),
    };

    // Insert into DB
    const { error } = await supabase.from("schedules").insert(scheduleData);

    if (error) {
        console.error("Error creating schedule:", error);
        return {
            success: false,
            error: "Failed to create schedule. Please try again.",
            formData: formData_obj,
            time: Date.now(),
        };
    }

    // if (student_email) {
    //     // After successful application approval
    //     const resend = new Resend(process.env.RESEND_API_KEY);

    //     // Send password-change notification
    //     const { error: emailError } = await resend.emails.send({
    //         from: "InternMatch <no-reply@auth.internmatch.online>",
    //         to: student_email,
    //         subject: `Requesting for additional documents`,
    //         react: (
    //             <ApplicationCannotProceed
    //                 message={message}
    //                 companyName={companyName}
    //             />
    //         ),
    //     });

    //     if (emailError) {
    //         console.log(
    //             "Error sending email for password change: ",
    //             emailError.message
    //         );
    //     }
    // }

    // Revalidate relevant paths
    // revalidatePath("/company/schedules");
    redirect("/company/schedules");

    // return {
    //     success: true,
    //     error: null,
    //     formData: null,
    //     time: Date.now(),
    // };
}
