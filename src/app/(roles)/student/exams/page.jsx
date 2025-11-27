import ExamCard from "@/components/exam/ExamCard";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { NotepadText } from "lucide-react";

export default async function ExamsPage() {
    const supabase = await createClient();

    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return (
            <ErrorUi secondaryMessage="Session expired. Please try refreshing the page." />
        );
    }

    const { data: exams, error } = await supabase
        .from("exams")
        .select(
            "company_id, updated_at, title, description, duration, questions(id), companies(name), exam_attempt(exam_id, student_id)"
        )
        .eq("is_published", true)
        .eq("is_deleted", false);

    if (error) {
        return (
            <ErrorUi secondaryMessage="We're not able to fetch exams. Please check your internet connection and try again." />
        );
    }

    // Format exams with isAnswered key
    const formattedExams =
        exams?.map((exam) => ({
            ...exam,
            isAnswered:
                exam.exam_attempt?.some(
                    (attempt) => attempt.student_id === user.id
                ) || false,
        })) || [];

    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <NotepadText size={17} />
                </IconWrapper>
                Available Exams
            </SecondaryLabel>

            {/* Exams Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {formattedExams.map((exam) => (
                    <ExamCard key={exam.title} exam={exam} />
                ))}
            </div>
        </div>
    );
}
