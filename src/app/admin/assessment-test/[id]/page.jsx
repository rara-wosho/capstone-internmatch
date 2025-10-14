import AddAssessmentQuestionModal from "@/components/modals/AddAssessmentQuestionModal";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import { Calendar, ChevronLeft, Gauge } from "lucide-react";
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
            "*, assessment_questions(id, assessment_question_text, assessment_choices(id, assessment_choice_text))"
        )
        .eq("id", assessmentId)
        .single();

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }
    console.log(data);

    const questions = data?.assessment_questions;

    return (
        <div>
            {/* header  */}
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center flex-wrap gap-x-6 gap-y-3 justify-between px-3">
                    <div className="flex items-center gap-1 mb-1">
                        <BackButton className="hover:text-accent-foreground">
                            <ChevronLeft className="size-5 md:size-6" />
                        </BackButton>
                        <p>{data.assessment_title}</p>
                    </div>

                    <AddAssessmentQuestionModal assessmentId={assessmentId} />
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
                            <div
                                key={q.id}
                                className="border p-3 rounded-xl bg-card mb-3"
                            >
                                {q.assessment_question_text}
                                {q.assessment_choices.map((c) => (
                                    <div key={c.id}>
                                        {c.assessment_choice_text}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </>
                )}
            </Wrapper>
        </div>
    );
}
