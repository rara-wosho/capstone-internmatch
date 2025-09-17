import ExamQuestionForm from "@/components/forms/ExamQuestionForm";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getExamById } from "@/lib/actions/exam";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { examId } = await params;

    if (!examId) {
        notFound();
    }

    const { data: exam, error } = await getExamById(examId);

    if (error) {
        return <ErrorUi message={error} />;
    }

    if (!exam || exam.length === 0) {
        notFound();
    }

    return (
        <div>
            <SidebarTrigger />
            <SecondaryLabel className="mb-2 mt-3 md:mt-4">
                {exam.title}
            </SecondaryLabel>
            <p className="text-muted-foreground">
                {exam?.description
                    ? exam?.description
                    : "No description provided."}
            </p>
            {exam?.instruction && (
                <p className="text-sm text-muted-foreground mt-3">
                    <span className="text-primary-text">Instruction</span> :{" "}
                    {exam.instruction}
                </p>
            )}

            {/* Examination question Form  */}
            <ExamQuestionForm examinationData={exam || []} />
        </div>
    );
}
