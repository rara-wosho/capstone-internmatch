"use server";

import { supabaseAdmin } from "../supabase/admin";

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
        .insert({ id: userId, firstname, lastname, email });

    if (tableError) {
        console.error("Table insert error:", tableError?.message);
        // rollback: delete auth user to keep things consistent
        await supabaseAdmin.auth.admin.deleteUser(userId);
        return { success: false, data: null };
    }

    return { success: true, data: data.user };
}
