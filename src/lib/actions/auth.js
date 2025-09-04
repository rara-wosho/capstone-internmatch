"use server";

import { createClient } from "../supabase/server";

export async function signIn(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const supabase = await createClient();

    const {
        error,
        data: { user },
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.log(error.message);
        return { success: false, error: error.message };
    }

    return { success: true, role: user?.user_metadata.role };
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) {
        return { success: false };
    }
    return { success: true };
}
