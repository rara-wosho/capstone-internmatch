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

// update or edit assessment test details
export async function updateAssessmentTest(assessmentId, formData) {
    // validate inputs
    const assessment_title = formData.get("assessment_title") || "";
    const assessment_description = formData.get("assessment_description") || "";
    const assessment_difficulty = formData.get("assessment_difficulty") || "";

    if (!assessmentId || !assessment_difficulty || !assessment_title) {
        return { success: false, error: "Please fill in all required fields." };
    }

    const supabase = await createClient();

    const updateData = {
        assessment_title,
        assessment_description,
        assessment_difficulty,
    };

    const { error } = await supabase
        .from("assessment_test")
        .update(updateData)
        .eq("id", assessmentId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath(`/admin/assessment-test/${assessmentId}`);
    return { success: true, error: "" };
}

// delete assessment test
export async function deleteAssessmentTest(assessmentId) {
    if (!assessmentId) {
        return {
            success: false,
            error: "Unable to identify which assessment test to delete. Please select an assessment test before proceeding.",
        };
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("assessment_test")
        .delete()
        .eq("id", assessmentId);

    if (error) {
        return { success: false, error: error.message };
    }

    redirect("/admin/assessment-test");
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

// delete assessment test question
export async function deleteAssessmentQuestion(questionId) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("assessment_questions")
        .delete()
        .eq("id", questionId);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, error: "" };
}

// edit assessment question and choices
export async function updateAssessmentQuestion({ id, question_text, choices }) {
    const supabase = await createClient();

    // Update question text
    const { error: questionErr } = await supabase
        .from("assessment_questions")
        .update({ assessment_question_text: question_text })
        .eq("id", id);

    if (questionErr) {
        return { success: false, error: questionErr.message };
    }

    // Update each choice
    for (const choice of choices) {
        const { error: choiceErr } = await supabase
            .from("assessment_choices")
            .update({
                assessment_choice_text: choice.assessment_choice_text,
                is_correct: choice.is_correct,
            })
            .eq("id", choice.id);

        if (choiceErr) {
            return { success: false, error: choiceErr.message };
        }
    }

    return { success: true };
}
