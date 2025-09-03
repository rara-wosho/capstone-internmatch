"use server";

import { supabaseAdmin } from "../supabase/admin";
import { createClient } from "../supabase/server";

export async function createStudentAccount(formData, groupId) {
    const supabase = await createClient();

    // 1. create user in authentication
    const { data, error } = await supabase.auth.signUp({
        email: formData?.email,
        password: formData?.password,
        options: {
            data: {
                firstname: formData?.firstName,
                lastname: formData?.lastName,
                role: "student",
            },
        },
    });

    if (error) {
        return { success: false, error: error.message };
    }

    // 2. insert student data in student table
    const { error: insertError } = await supabase.from("students").insert([
        {
            id: data.user.id,
            email: formData?.email,
            firstname: formData?.firstName,
            lastname: formData?.lastName,
            group_id: groupId,
            role: "student",
        },
    ]);

    if (insertError) {
        // rollback: delete auth user to keep things consistent
        await supabaseAdmin.auth.admin.deleteUser(data.user.id);
        return { success: false, error: insertError.message };
    }

    return { success: true };
}
