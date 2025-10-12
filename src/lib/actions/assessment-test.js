"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function createAssessmentTest(formData) {
    const assessment_title = formData.get("assessment-title") || "";
    const assessment_description = formData.get("assessment-description") || "";
    const assessment_difficulty = formData.get("assessment-difficulty") || "";

    if (!assessment_title || !assessment_difficulty) {
        return { success: false, error: "Please fill in all required fields." };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("assessment_test")
        .insert({
            assessment_title,
            assessment_description,
            assessment_difficulty,
        })
        .select("id")
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/assessment-test", "page");
    redirect(`/admin/assessment-test/${data.id}`);
}

// add assessment question together with its  choices
export async function addAssessmentQuestion(assessmentId, question, choices) {
    // Validation
    const hasEmptyChoice = choices.some((choice) => !choice.choiceText.trim());
    const hasCorrectAnswer = choices.some((choice) => choice.isCorrect);

    if (hasEmptyChoice || !question.trim()) {
        return { success: false, error: "All fields are required." };
    }

    if (!hasCorrectAnswer) {
        return {
            success: false,
            error: "At least one choice must be correct.",
        };
    }

    const supabase = await createClient();

    // Use transaction-like approach with RLS or proper error handling
    // Insert questions
    const { data: questionData, error: questionErr } = await supabase
        .from("assessment_questions")
        .insert({
            assessment_id: assessmentId,
            assessment_question_text: question,
        })
        .select("id")
        .single();

    if (questionErr) {
        console.error("Question insert error:", questionErr);
        return { success: false, error: "Failed to add question." };
    }

    //Prepare the choicesArray for bulk insert
    const choicesArray = choices.map((choice) => ({
        assessment_question_id: questionData.id,
        assessment_choice_text: choice.choiceText.trim(),
        is_correct: choice.isCorrect,
    }));

    const { error: choicesError } = await supabase
        .from("assessment_choices")
        .insert(choicesArray);

    if (choicesError) {
        console.error("Choices insert error:", choicesError);

        // Rollback
        await supabase
            .from("assessment_questions")
            .delete()
            .eq("id", questionData.id);

        return {
            success: false,
            error: "Failed to add answer choices.",
        };
    }

    revalidatePath(`/admin/assessment-test/${assessmentId}`);
    return { success: true };
}
