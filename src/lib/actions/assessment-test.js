"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function createAssessmentTest(formData) {
    const assessment_title = formData.get("assessment-title") || "";
    const assessment_description = formData.get("assessment-description") || "";
    const assessment_difficulty = formData.get("assessment-difficulty") || "";

    if (!assessment_title || !assessment_difficulty) {
        return { success: false, error: "Please fill in all required fields." };
    }

    const supabase = await createClient();

    const { error } = await supabase.from("assessment_test").insert({
        assessment_title,
        assessment_description,
        assessment_difficulty,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/assessment-test", "page");
    return { success: true, error: "" };
}
