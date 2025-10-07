"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function updateRegistrationStatus(newStatus, registrationId) {
    const supabase = await createClient();

    const newData =
        newStatus === "rejected"
            ? {
                  email: `xxxxx-${new Date().getTime()}`,
                  status: newStatus,
              }
            : { status: newStatus };

    const { error } = await supabase
        .from("registrations")
        .update(newData)
        .eq("id", registrationId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/registrations");
    return { success: true, error: "" };
}
