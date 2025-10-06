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
export async function submitRegistration(formData) {
    const supabase = await createClient();

    console.log(formData);
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
        status: "pending", // Default status
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
        return { success: false, error: "All fields are required." };
    }

    // validate link
    if (!registrationData.documents_link.startsWith("https")) {
        return {
            success: false,
            error: "Documents link is not a valid link.    ",
        };
    }

    // Insert into Supabase
    const { data, error } = await supabase
        .from("registrations")
        .insert([registrationData])
        .select()
        .single();

    if (error) {
        console.error("Error submitting registration:", error);
        return {
            success: false,
            error: "Failed to submit registration. Please try again.",
        };
    }

    console.log(data);

    // Revalidate and redirect on success
    revalidatePath("/create-account/instructor");
    return { success: true, error: null };
}
