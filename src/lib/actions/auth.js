"use server";

import { createClient } from "../supabase/server";

export async function signIn(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.log(error.message);
        return { success: false };
    }

    return { success: true };
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        return { success: false };
    }
    return { success: true };
}
