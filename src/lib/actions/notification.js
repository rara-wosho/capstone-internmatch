"use server";

import { createClient } from "../supabase/server";

export async function addGlobalNotification(formData) {
    const supabase = await createClient();

    // Expected formdata values
    // {title, message, link_url}

    const { error } = await supabase
        .from("global_notifications")
        .insert(formData);

    if (error) {
        console.error(error.message);
        return { success: false };
    }
    return { success: true };
}
