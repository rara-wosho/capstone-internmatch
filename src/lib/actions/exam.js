"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function createExam(formData) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("exams")
        .insert(formData)
        .select("id")
        .single();

    if (error) {
        console.log("create exam error: ", error.message);
        return { success: false };
    }

    redirect(`/company/internship-exam/manage/${data?.id}`);
}

export async function deleteExam(examId) {
    const supabase = await createClient();

    const { error } = await supabase.from("exams").delete().eq("id", examId);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, error: null };
}
