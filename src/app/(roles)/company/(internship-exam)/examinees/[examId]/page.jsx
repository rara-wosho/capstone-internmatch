import ExamineesTable from "@/components/tables/ExamineesTable";
import BackButton from "@/components/ui/BackButton";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { examId } = await params;

    if (!examId) {
        notFound();
    }

    const supabase = await createClient();

    const { data: examinees, error } = await supabase
        .from("exam_attempt")
        .select(
            "id, completed_at, exam_id, exam_title, score, started_at, status, student_id, students(firstname, lastname)"
        )
        .eq("exam_id", examId)
        .order("score", { ascending: false });

    if (error) {
        return (
            <ErrorUi
                secondaryMessage={error.message}
                message="Something went wrong while trying to fetch examination records."
            />
        );
    }

    return (
        <div>
            {/* header */}
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 flex-wrap md:flex-nowrap gap-x-10 gap-y-4 mt-2 md:mt-1.5">
                <BackButton className="hover:text-primary-text rounded-sm pe-2 transition-colors">
                    <SecondaryLabel className="gap-2 text-left">
                        <ChevronLeft />
                        <span>{examinees[0].exam_title}</span>
                    </SecondaryLabel>
                </BackButton>
            </div>

            {examinees.length === 0 ? (
                <div>
                    <p>No attempts made.</p>
                </div>
            ) : (
                <ExamineesTable examinees={examinees} />
            )}
        </div>
    );
}
