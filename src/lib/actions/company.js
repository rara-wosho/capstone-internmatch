"use server";

import { supabaseAdmin } from "../supabase/admin";
import { createClient } from "../supabase/server";

export async function createCompanyAccount(form) {
    // get  formdata
    const name = form.companyName;
    const details = form.description;
    const phone = form.phone;
    const website = form?.website || "";
    const email = form?.email;
    const password = form?.password;
    const role = "company";

    // 1. Create user company in authentication
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        password,
        user_metadata: { name, role },
    });

    if (error || !data?.user) {
        console.error("Auth create error:", error?.message);
        return { success: false, data: null };
    }

    const userId = data.user.id;

    //   2. insert into company table
    const { error: tableError } = await supabaseAdmin.from("companies").insert({
        id: userId,
        name,
        details,
        email,
        phone,
        website,
        role,
    });

    if (tableError) {
        console.log(tableError);
        // rollback: delete auth user to keep things consistent
        await supabaseAdmin.auth.admin.deleteUser(userId);
        return { success: false, data: null };
    }

    return { success: true, data: data.user };
}
