"use server";

import { createClient } from "@supabase/supabase-js";

// AVATARS
export async function uploadAvatar(avatar, userId) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const filePath = `avatars/${userId}/avatar.png`;

    // Upload a profile image
    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatar, {
            upsert: true,
        });

    if (error) {
        console.error(error.message);
        return { success: false, error: "Unable to upload avatar." };
    }

    return { success: true, error: null };
}
