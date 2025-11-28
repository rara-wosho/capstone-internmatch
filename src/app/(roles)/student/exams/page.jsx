import ExamCard from "@/components/exam/ExamCard";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { NotepadText, CheckCircle, Clock } from "lucide-react";

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
            "id, company_id, updated_at, title, description, duration, questions(id), companies(name), exam_attempt(exam_id, student_id, completed_at, started_at)"
        )
        .eq("is_published", true)
        .eq("is_deleted", false);

    if (error) {
        console.log(error);
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

    // Separate exams into available and answered
    const availableExams = formattedExams.filter((exam) => !exam.isAnswered);
    const answeredExams = formattedExams.filter((exam) => exam.isAnswered);

    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <NotepadText size={17} />
                </IconWrapper>
                Available Exams
            </SecondaryLabel>

            {/* Available Exams Section */}
            {availableExams.length > 0 && (
                <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {availableExams.map((exam) => (
                            <ExamCard key={exam.id} exam={exam} />
                        ))}
                    </div>
                </div>
            )}

            {/* Answered Exams Section */}
            {answeredExams.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">
                            Completed Exams ({answeredExams.length})
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {answeredExams.map((exam) => (
                            <ExamCard key={exam.id} exam={exam} />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {formattedExams.length === 0 && (
                <div className="text-center py-8">
                    <NotepadText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                        No exams available at the moment.
                    </p>
                </div>
            )}
        </div>
    );
}
