"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

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
export async function updateApplicationStatus(newStatus, applicationId) {
    const supabase = await createClient();

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

    revalidatePath(`/company/applicants/${applicationId}`);
    revalidatePath("/company/applicants");
    return { success: true };
}
