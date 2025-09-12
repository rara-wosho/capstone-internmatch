import AddQuestionAbout from "@/components/exam/AddQuestionAbout";
import AddQuestionCard from "@/components/exam/AddQuestionCard";
import BackButton from "@/components/ui/BackButton";
import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { ChevronLeft, NotebookPen, Trash } from "lucide-react";

import AddQuestionModal from "@/components/exam/AddQuestionModal";
import { createClient } from "@/lib/supabase/server";
import ErrorUi from "@/components/ui/ErrorUi";
import { notFound } from "next/navigation";
import DeleteExamModal from "@/components/exam/DeleteExamModal";
import { Button } from "@/components/ui/button";

export default async function Page({ params }) {
    const { examId } = await params;
    const supabase = await createClient();

    const { data: exam, error } = await supabase
        .from("exams")
        .select()
        .eq("id", examId)
        .maybeSingle();

    if (error) {
        return (
            <ErrorUi
                message="Something went wrong while fetching exam details."
                secondaryMessage="Please check your internet connection and try again."
            />
        );
    }

    if (!exam) {
        notFound();
    }

    const { data: questions, error: questionError } = await supabase
        .from("questions")
        .select("id, question_text, shuffle_choices")
        .eq("exam_id", examId);

    return (
        <div>
            {/* header  */}
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 flex-wrap md:flex-nowrap gap-x-10 gap-y-4">
                <BackButton className="hover:text-primary-text rounded-sm pe-2 transition-colors">
                    <SecondaryLabel className="gap-2 text-left">
                        <ChevronLeft />
                        <span>{exam?.title}</span>
                    </SecondaryLabel>
                </BackButton>

                <div className="ms-auto grow md:grow-0 flex justify-end">
                    <AddQuestionModal examId={exam?.id} />
                </div>
            </div>
            {/* content  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* list of questions  */}

                <div className="lg:col-span-2 flex flex-col gap-1 order-2 lg:order-1">
                    {questions.length === 0 && (
                        <BorderBox className="border rounded-xl bg-card flex justify-center items-center h-full">
                            <p className="text-center max-w-sm">
                                No questions yet. Add your first question now by
                                clicking 'Add question' button.
                            </p>
                        </BorderBox>
                    )}

                    {questions.length > 0 && (
                        <>
                            <BorderBox className="border rounded-t-xl bg-card shadow-xs">
                                <TertiaryLabel>
                                    <NotebookPen
                                        size={18}
                                        className="text-amber-600"
                                    />{" "}
                                    <p>Manage Questions</p>
                                    <div className="ms-auto">
                                        <p className="text-sm px-2 border rounded-sm">
                                            50
                                        </p>
                                    </div>
                                </TertiaryLabel>
                            </BorderBox>
                            {questions.map((q) => (
                                <AddQuestionCard
                                    key={q.id}
                                    id={q.id}
                                    initialQuestion={q.question}
                                />
                            ))}
                        </>
                    )}
                </div>

                {/* right section  */}
                {/* about and settings section  */}
                <div className="flex flex-col gap-3 order-1 lg:order-2">
                    <AddQuestionAbout />

                    <BorderBox className="border rounded-xl bg-card">
                        <TertiaryLabel className="mb-1.5">
                            Delete exam
                        </TertiaryLabel>

                        <p className="mb-4 text-sm text-muted-foreground">
                            Deleting this exam will also delete all its
                            questions
                        </p>

                        <DeleteExamModal>
                            <Button variant="destructive">
                                <Trash /> Delete exam
                            </Button>
                        </DeleteExamModal>
                    </BorderBox>
                </div>
            </div>
        </div>
    );
}
