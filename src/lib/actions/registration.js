"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { supabaseAdmin } from "../supabase/admin";

// accept registration then create instructor account
export async function acceptRegistration(registrant) {
    // Validate required fields
    if (!registrant?.id) {
        return { success: false, error: "Invalid registrant data" };
    }

    // get and sanitize  registrant data
    const firstname = registrant.firstname || "";
    const lastname = registrant.lastname || "";
    const email = registrant.email || "";
    const school = registrant.school || "";
    const barangay = registrant.barangay || "";
    const city = registrant.city || "";
    const province = registrant.province || "";

    const password = `${lastname}-@internmatch25`;
    const role = "instructor";

    // 1. Create user in authentication
    const { data: authData, error: authErr } =
        await supabaseAdmin.auth.admin.createUser({
            email,
            email_confirm: true,
            password,
            user_metadata: { firstname, lastname, role },
        });

    if (authErr || !authData?.user) {
        console.error("Auth create error:", authErr?.message);
        return { success: false, error: authErr.message };
    }

    const userId = authData.user.id;

    //   2. insert into instructor table
    const { error: tableError } = await supabaseAdmin
        .from("ojt_instructors")
        .insert({
            id: userId,
            firstname,
            lastname,
            email,
            role,
            school,
            barangay,
            city,
            province,
        });

    if (tableError) {
        console.error("Error adding instructor to table: ", tableError);
        // rollback: delete auth user to keep things consistent
        await supabaseAdmin.auth.admin.deleteUser(userId);
        return { success: false, error: tableError.message };
    }

    // if inserted in table,
    // update status in registration to 'accepted'
    const { error: registrationErr } = await supabaseAdmin
        .from("registrations")
        .update({ status: "accepted" })
        .eq("id", registrant?.id);

    if (registrationErr) {
        // rollback: delete auth user and table user
        console.error("Error updating registration status: ", registrationErr);
        await supabaseAdmin.from("ojt_instructors").delete().eq("id", userId);
        await supabaseAdmin.auth.admin.deleteUser(userId);
        return { success: false, error: registrationErr.message };
    }

    revalidatePath("/admin/registrations");
    return { success: true, error: "" };
}

// reject registration, change status
export async function rejectRegistration(registrationId) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("registrations")
        .update({ status: "rejected", email: `xxxxx-${new Date().getTime()}` })
        .eq("id", registrationId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/registrations");
    return { success: true, error: "" };
}
