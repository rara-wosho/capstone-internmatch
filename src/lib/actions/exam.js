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
        return { success: false };
    }

    redirect(`/company/manage-exam/${data?.id}`);
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
          company_id,
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

// save exam answers
// export async function saveExamAnswers(answersArray) {
//     const supabase = await createClient();

//     try {
//         // Validate input
//         if (
//             !answersArray ||
//             !Array.isArray(answersArray) ||
//             answersArray.length === 0
//         ) {
//             return { success: false, error: "No answers provided" };
//         }

//         // Extract common data from first answer
//         const firstAnswer = answersArray[0];
//         const { student_id, exam_id } = firstAnswer;

//         if (!student_id || !exam_id) {
//             return { success: false, error: "Missing student_id or exam_id" };
//         }

//         // Step 1: Create attempt record
//         const { data: attempt, error: attemptError } = await supabase
//             .from("attempts")
//             .insert({
//                 student_id: student_id,
//                 exam_id: exam_id,
//                 started_at: new Date().toISOString(),
//                 completed_at: new Date().toISOString(),
//                 status: "completed",
//             })
//             .select()
//             .single();

//         if (attemptError) {
//             console.error("Error creating attempt:", attemptError);
//             return { success: false, error: "Failed to create attempt record" };
//         }

//         // Step 2: Fetch original questions and choices data for snapshotting
//         const questionIds = [
//             ...new Set(answersArray.map((answer) => answer.question_id)),
//         ];

//         const { data: originalQuestions, error: questionsError } =
//             await supabase
//                 .from("questions")
//                 .select(
//                     `
//                 id,
//                 question_text,
//                 question_choices (
//                     id,
//                     choice_text,
//                     is_correct
//                 )
//             `
//                 )
//                 .in("id", questionIds);

//         if (questionsError) {
//             console.error("Error fetching questions:", questionsError);
//             return { success: false, error: "Failed to fetch question data" };
//         }

//         // Step 3: Create attempt_questions records (snapshot original questions)
//         const attemptQuestionsData = originalQuestions.map(
//             (question, index) => ({
//                 attempt_id: attempt.id,
//                 original_question_id: question.id,
//                 question_content: question.question_text,
//                 order_index: index, // You might want to randomize this based on your frontend order
//             })
//         );

//         const { data: attemptQuestions, error: attemptQuestionsError } =
//             await supabase
//                 .from("attempt_questions")
//                 .insert(attemptQuestionsData)
//                 .select();

//         if (attemptQuestionsError) {
//             console.error(
//                 "Error creating attempt_questions:",
//                 attemptQuestionsError
//             );
//             return {
//                 success: false,
//                 error: "Failed to save question snapshots",
//             };
//         }

//         // Step 4: Create attempt_choices records (snapshot all choices + mark selected ones)
//         const attemptChoicesData = [];

//         for (const attemptQuestion of attemptQuestions) {
//             const originalQuestion = originalQuestions.find(
//                 (q) => q.id === attemptQuestion.original_question_id
//             );
//             const studentAnswer = answersArray.find(
//                 (a) => a.question_id === attemptQuestion.original_question_id
//             );

//             // Create records for all choices of this question
//             originalQuestion.question_choices.forEach((choice, choiceIndex) => {
//                 attemptChoicesData.push({
//                     attempt_question_id: attemptQuestion.id,
//                     original_choice_id: choice.id,
//                     choice_content: choice.choice_text,
//                     is_correct: choice.is_correct,
//                     is_selected: studentAnswer
//                         ? studentAnswer.choice_id === choice.id
//                         : false,
//                     choice_order: choiceIndex,
//                 });
//             });
//         }

//         const { error: attemptChoicesError } = await supabase
//             .from("attempt_choices")
//             .insert(attemptChoicesData);

//         if (attemptChoicesError) {
//             console.error(
//                 "Error creating attempt_choices:",
//                 attemptChoicesError
//             );
//             return { success: false, error: "Failed to save choice snapshots" };
//         }

//         // Step 5: Calculate and update score
//         const correctAnswers = answersArray.filter(
//             (answer) => answer.answer_is_correct
//         ).length;
//         const totalQuestions = answersArray.length;
//         const score = Math.round((correctAnswers / totalQuestions) * 100);

//         const { error: scoreUpdateError } = await supabase
//             .from("attempts")
//             .update({
//                 score: score,
//                 correct_answers: correctAnswers,
//                 total_questions: totalQuestions,
//             })
//             .eq("id", attempt.id);

//         if (scoreUpdateError) {
//             console.error("Error updating score:", scoreUpdateError);
//             // Don't return error here as the main data is already saved
//         }

//         return {
//             success: true,
//             error: null,
//             data: {
//                 attempt_id: attempt.id,
//                 score: score,
//                 correct_answers: correctAnswers,
//                 total_questions: totalQuestions,
//             },
//         };
//     } catch (error) {
//         console.error("Unexpected error in saveExamAnswers:", error);
//         return { success: false, error: "An unexpected error occurred" };
//     }
// }

export async function saveExamsAnswer(
    student_id,
    company_id,
    exam_id,
    started_at,
    exam_title,
    answersArray
) {
    const supabase = await createClient();

    // Validate input
    if (
        !answersArray ||
        !Array.isArray(answersArray) ||
        answersArray.length === 0
    ) {
        return { success: false, error: "No answers provided" };
    }

    if (!student_id || !exam_id) {
        return { success: false, error: "Missing student_id or exam_id" };
    }

    const correctAnswers = answersArray.filter(
        (answer) => answer.answer_is_correct
    );

    // insert to exam attempts
    const { data: attemptData, error: attemptErr } = await supabase
        .from("exam_attempt")
        .insert({
            student_id,
            company_id,
            exam_id,
            exam_title,
            score: correctAnswers.length,
            started_at: started_at ?? new Date().toISOString(),
        })
        .select("id")
        .single();

    if (attemptErr) {
        return { success: false, error: "Failed to submit the exam." };
    }

    // Prepare answers
    const rows = answersArray.map((a) => ({
        attempt_id: attemptData.id,
        original_question_id: a.question_id,
        original_question_text: a.question_text,
        selected_choice_id: a.choice_id,
        selected_choice_text: a.choice_text,
        is_answer_correct: a.answer_is_correct,
    }));

    // insert the array
    const { error: attemptQuestionErr } = await supabase
        .from("attempt_questions")
        .insert(rows);

    // if error, delete the exam attempt
    if (attemptQuestionErr) {
        await supabase.from("exam_attempt").delete().eq("id", attemptData.id);
        return { success: false, error: "Failed to submit the exam." };
    }

    return {
        success: true,
        // data: { answersArray, student_id, exam_id, started_at },
        error: null,
    };
}
