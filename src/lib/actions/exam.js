"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

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

// Update exam details
export async function updateExamDetails(formData) {
    const supabase = await createClient();

    const examId = formData.get("examId");
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const instruction = formData.get("instruction")?.trim();
    const duration = Number(formData.get("duration") || 0);
    const mode = formData.get("mode") || "classic";

    // Switch values come as "on" or null
    const is_published = formData.get("is_published") === "on";
    const shuffle_questions = formData.get("shuffle_questions") === "on";

    const updatedExam = {
        title,
        description,
        instruction,
        duration,
        mode,
        is_published,
        shuffle_questions,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from("exams")
        .update(updatedExam)
        .eq("id", examId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath(`/company/internship-exam/manage/${examId}`);
    return { success: true };
}

export async function deleteExam(examId) {
    const supabase = await createClient();

    const { error } = await supabase.from("exams").delete().eq("id", examId);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, error: null };
}

export async function getExamById(examId) {
    const supabase = await createClient();

    function shuffleArray(arr) {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    try {
        const { data, error } = await supabase
            .from("exams")
            .select(
                `
          id,
          is_published,
          shuffle_questions,
          title,
          duration,
          description,
          instruction,
          questions (
            id,
            question_text,
            question_choices (
              id,
              choice_text,
              is_correct
            )
          )
        `
            )
            .eq("id", examId)
            .single(); // we expect only one exam

        if (error) {
            return { data: null, error: error.message };
        }

        if (!data) {
            return { data: null, error: "Exam not found" };
        }

        if (!data.is_published) {
            return { data: null, error: "Examination not available." };
        }

        // Shuffle questions if needed
        let questions = data.questions ?? [];
        if (data.shuffle_questions && questions.length > 1) {
            questions = shuffleArray(questions);
        }

        return {
            data: {
                ...data,
                questions,
            },
            error: null,
        };
    } catch (err) {
        return { data: null, error: err.message ?? "Unexpected error" };
    }
}
