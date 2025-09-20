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

// delete an avatar
export async function deleteAvatar(bucketName, filePath, userId) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { error: storageErr } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

    if (error) {
        return { success: false, error: storageErr?.message };
    }

    const { error: tableErr } = await supabase
        .from("students")
        .update({ avatar_url: null })
        .eq("id", userId);

    if (tableErr) {
        return { success: false, error: tableErr.message };
    }

    return { success: true, error: null };
}
