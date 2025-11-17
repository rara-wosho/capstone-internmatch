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
        console.error(error);
        return { error: true, user: null };
    }

    return {
        error: false,
        session,
        user: {
            email: session?.user?.email,
            id: session?.user?.id,
            role: session?.user?.user_metadata?.role,
        },
    };
}

// UPDATE USER PASSWORD
export async function updatePassword(formData) {
    const email = formData.get("email");
    const currentPassword = formData.get("current-password");
    const newPassword = formData.get("new-password");
    const confirmPassword = formData.get("confirm-password");

    // ✅ Validate input
    if (!email || !currentPassword || !newPassword || !confirmPassword) {
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

    const supabase = await createClient();

    // ✅ Step 1: Reauthenticate the user to confirm current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
    });

    if (signInError) {
        return {
            success: false,
            error: "Current password is incorrect.",
        };
    }

    // ✅ Step 2: Update the user's password
    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (updateError) {
        return {
            success: false,
            error:
                updateError.message ||
                "Something went wrong while updating your password.",
        };
    }

    return {
        success: true,
        message: "Password updated successfully.",
    };
}

// Send an email link to the user's email to reset password
export async function sendResetPasswordEmail(prev, formData) {
    const email = formData.get("email") || "";
    const redirectLink = formData.get("redirect-to") || "";

    if (!redirectLink) {
        return {
            success: false,
            error: "No redirection link.",
            message: "Please make sure that you have a valid redirection link.",
        };
    }
    if (!email) {
        return {
            success: false,
            error: "No email provided.",
            message:
                "Please make sure that you provided a valid email address.",
        };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${redirectLink}/reset-password`,
    });

    if (error) {
        console.log("error sending email: ", error);
        return {
            success: false,
            error: error?.message,
            message: `Something went wrong while sending password reset email. ${error?.message}`,
        };
    }

    return {
        success: true,
        error: "",
        message: "Please check your email for a password reset link.",
    };
}
