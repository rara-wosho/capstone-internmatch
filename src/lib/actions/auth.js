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
        return { error: true, user: null };
    }

    return {
        error: false,
        user: {
            id: session?.user?.id,
            role: session?.user?.user_metadata?.role,
        },
    };
}
