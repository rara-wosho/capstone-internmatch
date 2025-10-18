import ErrorUi from "@/components/ui/ErrorUi";
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
            `/student/assessment-test/${assessmentId}/results?message=already-completed`
        );
    }

    // Fetch assessment details
    const { data: assessment, error } = await supabase
        .from("assessment_test")
        .select("*")
        .eq("id", assessmentId)
        .single();

    if (error || !assessment) {
        return (
            <ErrorUi secondaryMessage="This assessment test is maybe deleted or doesn't exist." />
        );
    }

    return (
        <div>
            {assessment.assessment_title}
            {assessmentId}
        </div>
    );
}
