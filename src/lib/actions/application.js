"use server";

import { createClient } from "../supabase/server";

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
