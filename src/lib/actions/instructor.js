"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../supabase/admin";
import { createClient } from "../supabase/server";

export async function createInstructor(formData) {
    // get and sanitize formdata
    const firstname = formData.get("firstname")?.toString().trim() || "";
    const lastname = formData.get("lastname")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";
    const role = "instructor";

    // 1. Create user in authentication
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        password,
        user_metadata: { firstname, lastname, role },
    });

    if (error || !data?.user) {
        console.error("Auth create error:", error?.message);
        return { success: false, data: null };
    }

    const userId = data.user.id;

    //   2. insert into instructor table
    const { error: tableError } = await supabaseAdmin
        .from("ojt_instructors")
        .insert({ id: userId, firstname, lastname, email, role });

    if (tableError) {
        // rollback: delete auth user to keep things consistent
        await supabaseAdmin.auth.admin.deleteUser(userId);
        return { success: false, data: null };
    }

    return { success: true, data: data.user };
}

// submit registration details
export async function submitRegistration(prevState, formData) {
    const supabase = await createClient();

    // Extract form data
    const registrationData = {
        firstname: formData.get("firstName"),
        lastname: formData.get("lastName"),
        email: formData.get("email"),
        school: formData.get("school"),
        barangay: formData.get("barangay"),
        city: formData.get("city"),
        province: formData.get("province"),
        documents_link: formData.get("documentsLink"),
    };

    // Validate required fields
    if (
        !registrationData.firstname ||
        !registrationData.lastname ||
        !registrationData.email ||
        !registrationData.school ||
        !registrationData.barangay ||
        !registrationData.city ||
        !registrationData.province ||
        !registrationData.documents_link
    ) {
        return {
            success: false,
            error: "All fields are required.",
            formData: registrationData, // Return the extracted data object
        };
    }

    // Validate link
    if (!registrationData.documents_link.startsWith("https")) {
        return {
            success: false,
            error: "Document link is invalid.",
            formData: registrationData,
        };
    }

    // Insert into Supabase
    const { error } = await supabase
        .from("registrations")
        .insert([registrationData]);

    if (error) {
        console.error("Error submitting registration:", error);
        return {
            success: false,
            error:
                error.code === "23505"
                    ? "This email you provided is already associated with a pending registration."
                    : "Something went wrong while submitting the form.",
            formData: registrationData,
        };
    }

    // Revalidate and redirect on success
    revalidatePath("/create-account/instructor");
    return {
        success: true,
        error: "",
        formData: null, // Clear form data on success
    };
}
