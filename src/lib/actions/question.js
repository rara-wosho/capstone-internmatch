"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function addQuestionAndChoices(questionData, exam_id) {
    const supabase = await createClient();

    const { question, choices } = questionData;

    // Validate input
    if (!question?.trim()) {
        return { success: false, error: "Question is required" };
    }

    if (!choices || choices.length < 2) {
        return { success: false, error: "At least 2 choices are required" };
    }

    const hasCorrectAnswer = choices.some((choice) => choice.isCorrect);
    if (!hasCorrectAnswer) {
        return {
            success: false,
            error: "At least one correct answer is required",
        };
    }

    // Insert question into database, questions table
    const { data: questionResult, error: questionError } = await supabase
        .from("questions")
        .insert({
            question_text: question.trim(),
            exam_id,
        })
        .select("id")
        .single();

    if (questionError) {
        console.error("Error inserting question:", questionError);
        return { success: false, error: "Failed to create question" };
    }

    // Insert choices
    const choicesData = choices.map((choice) => ({
        question_id: questionResult.id,
        choice_text: choice.text.trim(),
        is_correct: choice.isCorrect,
    }));

    const { error: choicesError } = await supabase
        .from("question_choices")
        .insert(choicesData);

    if (choicesError) {
        console.error("Error inserting choices:", choicesError);
        // Cleanup: delete the question if choices failed
        await supabase.from("questions").delete().eq("id", questionResult.id);
        return { success: false, error: "Failed to create question choices" };
    }

    revalidatePath(`/company/internship-exam/manage/${exam_id}`, "page");
    return { success: true, error: null };
}
