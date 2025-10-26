"use server";

import { createClient } from "../supabase/server";

export async function submitFeedback(feedbackForm) {
    const supabase = await createClient();

    // validate data
    if (!feedbackForm.feedback.trim()) {
        return { success: false, error: "Feedback message is empty." };
    }
    const { error } = await supabase.from("feedbacks").insert(feedbackForm);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, error: "" };
}
