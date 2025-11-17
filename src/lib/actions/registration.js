"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { supabaseAdmin } from "../supabase/admin";
import { Resend } from "resend";
import InstructorApprovalMail from "@/components/email/InstructorApprovalMail";

// accept registration then create instructor account
// export async function acceptRegistration(registrant) {
//     // Validate required fields
//     if (!registrant?.id) {
//         return { success: false, error: "Invalid registrant data" };
//     }

//     // get and sanitize  registrant data
//     const firstname = registrant.firstname || "";
//     const lastname = registrant.lastname || "";
//     const email = registrant.email || "";
//     const school = registrant.school || "";
//     const barangay = registrant.barangay || "";
//     const city = registrant.city || "";
//     const province = registrant.province || "";

//     const password = `${lastname}-@internmatch25`;
//     const role = "instructor";

//     // 1. Create user in authentication
//     const { data: authData, error: authErr } =
//         await supabaseAdmin.auth.admin.createUser({
//             email,
//             email_confirm: true,
//             password,
//             user_metadata: { firstname, lastname, role },
//         });

//     if (authErr || !authData?.user) {
//         console.error("Auth create error:", authErr?.message);
//         return { success: false, error: authErr.message };
//     }

//     const userId = authData.user.id;

//     //   2. insert into instructor table
//     const { error: tableError } = await supabaseAdmin
//         .from("ojt_instructors")
//         .insert({
//             id: userId,
//             firstname,
//             lastname,
//             email,
//             role,
//             school,
//             barangay,
//             city,
//             province,
//         });

//     if (tableError) {
//         console.error("Error adding instructor to table: ", tableError);
//         // rollback: delete auth user to keep things consistent
//         await supabaseAdmin.auth.admin.deleteUser(userId);
//         return { success: false, error: tableError.message };
//     }

//     // if inserted in table,
//     // update status in registration to 'accepted'
//     const { error: registrationErr } = await supabaseAdmin
//         .from("registrations")
//         .update({ status: "accepted" })
//         .eq("id", registrant?.id);

//     if (registrationErr) {
//         // rollback: delete auth user and table user
//         console.error("Error updating registration status: ", registrationErr);
//         await supabaseAdmin.from("ojt_instructors").delete().eq("id", userId);
//         await supabaseAdmin.auth.admin.deleteUser(userId);
//         return { success: false, error: registrationErr.message };
//     }

//     revalidatePath("/admin/registrations", "page");
//     return { success: true, error: "" };
// }

// SECOND VERSION WITH EMAIL
// accept registration then create instructor account
export async function acceptRegistration(registrant) {
    if (!registrant?.id) {
        return { success: false, error: "Invalid registrant data" };
    }

    const {
        id: registrantId,
        firstname = "",
        lastname = "",
        email = "",
        school = "",
        barangay = "",
        city = "",
        province = "",
    } = registrant;

    const password = `${lastname}-@internmatch25`;
    const role = "instructor";

    try {
        // 1. Create user in Supabase Auth
        const { data: authData, error: authErr } =
            await supabaseAdmin.auth.admin.createUser({
                email,
                email_confirm: true,
                password,
                user_metadata: { firstname, lastname, role },
            });

        if (authErr || !authData?.user) {
            throw new Error(authErr?.message || "Failed to create user.");
        }

        const userId = authData.user.id;

        // 2. Insert into instructors table
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
            await supabaseAdmin.auth.admin.deleteUser(userId);
            throw new Error(tableError.message);
        }

        // 3. Update registration status
        const { error: registrationErr } = await supabaseAdmin
            .from("registrations")
            .update({ status: "accepted" })
            .eq("id", registrantId);

        if (registrationErr) {
            // rollback everything
            await supabaseAdmin
                .from("ojt_instructors")
                .delete()
                .eq("id", userId);
            await supabaseAdmin.auth.admin.deleteUser(userId);
            throw new Error(registrationErr.message);
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // 4. Send email notification using Resend
        const { data, error } = await resend.emails.send({
            from: "InternMatch <no-reply@auth.internmatch.online>",
            to: email,
            subject: "Your Instructor Registration Has Been Approved",
            react: InstructorApprovalMail({ firstname, password }),
        });

        if (error) {
            console.error("Error sending email to instructor: ", error.message);
        }

        revalidatePath("/admin/registrations", "page");
        return { success: true };
    } catch (err) {
        console.error("Accept registration error:", err.message);
        return { success: false, error: err.message };
    }
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

    revalidatePath("/admin/registrations", "page");
    return { success: true, error: "" };
}
