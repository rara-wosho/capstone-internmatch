"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { Resend } from "resend";
import { ApplicationSuccess } from "@/components/email/ApplicationSuccess";

export async function submitApplication(formData) {
    const supabase = await createClient();

    if (!formData.resume_link) {
        return { Success: false, error: "Please provide resume link." };
    }

    const { error } = await supabase.from("applicants").insert(formData);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, error: null };
}

// update application status
export async function updateApplicationStatus({
    newStatus,
    applicationId,
    receiver,
    companyName,
    companyEmail,
}) {
    const supabase = await createClient();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const allowedStatuses = ["pending", "accepted", "rejected", "reviewed"];

    if (!allowedStatuses.includes(newStatus)) {
        return { success: false, error: "Invalid Status" };
    }

    const { error } = await supabase
        .from("applicants")
        .update({ status: newStatus, reviewed_at: new Date().toISOString() })
        .eq("id", applicationId);

    if (error) {
        return { success: false, error: "Unable to update status" };
    }

    // if (newStatus === "accepted" && receiver) {
    //     const { data, error } = await resend.emails.send({
    //         from: "InternMatch@resend.dev",
    //         to: receiver,
    //         subject: "🎉 Congratulations!",
    //         react: ApplicationSuccess({ companyName }),
    //         reply_to: companyEmail,
    //     });

    //     console.log("error: ", error);
    //     console.log("new status: ", newStatus);
    //     console.log("receiver : ", receiver);
    //     console.log("email response: ", data);
    //     console.log("company email: ", companyEmail);
    // }

    revalidatePath(`/company/applicants/${applicationId}`);
    revalidatePath("/company/applicants");
    return { success: true };
}
