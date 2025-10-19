import AssessmentQuestionsSection from "@/components/sections/AssessmentQuestionsSection";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function StartAssessmentPage({ params }) {
    const assessmentId = (await params)?.assessmentId || "";

    // check if  there is an assessmentId
    if (!assessmentId) {
        redirect("/student/assessment-test");
    }

    const supabase = await createClient();

    // Get authenticated user
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        redirect("/sign-in");
    }

    // Check if student already took this test
    const { data: existingAttempt } = await supabase
        .from("assessment_attempt")
        .select("id, submitted_at, assessment_score")
        .eq("student_id", user.id)
        .eq("assessment_test_id", assessmentId)
        .maybeSingle();

    // If already took it, redirect away
    if (existingAttempt) {
        redirect(
            `/student/assessment-result/${assessmentId}?message=already-completed`
        );
    }

    // Fetch assessment details
    const { data: assessment, error } = await supabase
        .from("assessment_test")
        .select(
            "id, assessment_title, assessment_description, assessment_questions(id, assessment_question_text, assessment_choices(id,assessment_choice_text, is_correct))"
        )
        .eq("id", assessmentId)
        .eq("is_deleted", false)
        .eq("assessment_questions.is_deleted", false)
        .order("created_at", {
            referencedTable: "assessment_questions",
            ascending: true,
        })
        .single();

    if (error || !assessment) {
        console.error(error.message);
        return (
            <ErrorUi secondaryMessage="This assessment test is maybe deleted or doesn't exist." />
        );
    }

    return (
        <Wrapper size="sm">
            <AssessmentQuestionsSection
                title={assessment?.assessment_title || ""}
                description={
                    assessment?.assessment_description ||
                    "No description or instruction provided"
                }
                assessmentQuestions={assessment?.assessment_questions || []}
            />
        </Wrapper>
    );
}
