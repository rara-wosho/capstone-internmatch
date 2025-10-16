import AssessmentQuestionCard from "@/components/features/admin/AssessmentQuestionCard";
import AddAssessmentQuestionModal from "@/components/modals/AddAssessmentQuestionModal";
import EditAssessmentModal from "@/components/modals/EditAssessmentModal";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import { Calendar, ChevronLeft, Gauge, Pen, Trash } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const assessmentId = (await params)?.id || "";

    if (!assessmentId) {
        notFound();
    }

    const db = await createClient();

    const { data, error } = await db
        .from("assessment_test")
        .select(
            "id, created_at, assessment_title, assessment_description, assessment_difficulty, assessment_questions(id, assessment_question_text, assessment_choices(id, is_correct, assessment_choice_text))"
        )
        .eq("id", assessmentId)
        .order("created_at", {
            referencedTable: "assessment_questions",
            ascending: true,
        })
        .maybeSingle();

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    console.log(data);

    if (!data) {
        notFound();
    }

    const questions = data?.assessment_questions || [];

    return (
        <div className="pb-5 md:pb-7">
            {/* header  */}
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center flex-wrap gap-x-6 gap-y-3 justify-between px-3">
                    <div className="flex items-center gap-1 mb-1">
                        <BackButton className="hover:text-accent-foreground">
                            <ChevronLeft className="size-5 md:size-6" />
                        </BackButton>
                        <p>{data.assessment_title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <EditAssessmentModal assessment={data} />
                        <AddAssessmentQuestionModal
                            assessmentId={assessmentId}
                        />
                    </div>
                </Wrapper>
            </SecondaryLabel>

            {/* body  */}
            <Wrapper className="px-3" size="sm">
                <p className="text-sm text-muted-foreground mb-2 whitespace-pre-wrap">
                    {data?.assessment_description
                        ? data?.assessment_description
                        : "No description or instruction provided"}
                </p>
                <div
                    className={cn(
                        "capitalize text-sm my-1 flex items-center gap-2",
                        data.assessment_difficulty
                    )}
                >
                    <Gauge size={14} /> {data.assessment_difficulty}
                </div>
                <p className="text-sm text-muted-foreground font-normal flex items-center gap-2 mb-4 md:mb-5">
                    <Calendar size={13} />
                    Created at: {dateFormatter(data.created_at)}
                </p>
                {questions.length === 0 ? (
                    <div className="text-muted-foreground">
                        No questions yet. Click 'Add Question' button to add
                        question.
                    </div>
                ) : (
                    <>
                        {questions?.map((q) => (
                            <AssessmentQuestionCard key={q.id} question={q} />
                        ))}

                        <div className="flex items-center justify-center mt-2">
                            <AddAssessmentQuestionModal
                                assessmentId={assessmentId}
                            />
                        </div>
                    </>
                )}
            </Wrapper>
        </div>
    );
}
