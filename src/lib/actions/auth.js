"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function signIn(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const rememberMe = formData.get("rememberMe") === "on";

    // Basic validation
    if (!email || !password) {
        return {
            error: "Email and password are required",
            email: email || "",
        };
    }

    const supabase = await createClient();

    const {
        error,
        data: { user },
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return {
            error: error.message,
            email: email || "",
        };
    }

    // Optional: Handle "remember me" functionality
    if (rememberMe) {
        // You can set cookies or handle session persistence here
        // This depends on your Supabase configuration
    }

    // Success! Redirect immediately based on role
    const role = user?.user_metadata.role || "student";

    const roleRoutes = {
        instructor: "/instructor",
        admin: "/admin",
        student: "/student",
        company: "/company",
    };

    redirect(roleRoutes[role]);
}

export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
        return { success: false, message: "Failed to sign out" };
    }

    redirect("/sign-in");
}

export async function getCurrentUser() {
    const supabase = await createClient();

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (!session || error) {
        console.error(error.message);
        return { error: true, user: null };
    }

    return {
        error: false,
        session,
        user: {
            id: session?.user?.id,
            role: session?.user?.user_metadata?.role,
        },
    };
}

// UPDATE USER PASSWORD
export async function updatePassword(formData) {
    const newPassword = formData.get("new-password");
    const confirmPassword = formData.get("confirm-password");

    if (!newPassword || !confirmPassword) {
        return { success: false, error: "All fields are required." };
    }

    if (newPassword.length < 6) {
        return {
            success: false,
            error: "Password must be at least 6 characters long.",
        };
    }

    if (newPassword !== confirmPassword) {
        return { success: false, error: "Passwords do not match." };
    }

    // Verify if the current user has a valid session
    const { user, error: userError } = await getCurrentUser();

    if (userError || !user) {
        return { success: false, error: "Unauthorized or session expired." };
    }

    const supabase = await createClient();

    // ✅ Update password
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, message: "Password updated successfully." };
}
