"use server";

import { createClient } from "../supabase/server";
import { getCurrentUser } from "./auth";

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

export async function getNotificationsByUser(options = {}) {
    const { filter = "all" } = options;

    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { data: null, error: "Unauthorized user." };
    }

    const supabase = await createClient();

    // Base query
    let query = supabase
        .from("notifications")
        .select(
            "id, created_at, recipient_id, title, message, type, link_url, is_read"
        )
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false });

    // Apply filters based on parameter
    if (filter === "unread") {
        query = query.eq("is_read", false);
    }

    const { data: notifications, error } = await query;

    if (error) {
        return { data: null, error: error.message };
    }

    return { data: notifications, error: null };
}

// Server action for marking as read
export async function markNotificationAsRead(notificationId) {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { error: "Unauthorized user." };
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notificationId)
        .eq("recipient_id", user.id); // Security: ensure user owns the notification

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

// Server action for deleting notification
export async function deleteNotification(notificationId) {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return { error: "Unauthorized user." };
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId)
        .eq("recipient_id", user.id); // Security: ensure user owns the notification

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}
