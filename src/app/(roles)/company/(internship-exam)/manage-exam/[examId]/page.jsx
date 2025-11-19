import AddQuestionAbout from "@/components/exam/AddQuestionAbout";
import AddQuestionCard from "@/components/exam/AddQuestionCard";
import BackButton from "@/components/ui/BackButton";
import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import {
    ChartBar,
    ChevronLeft,
    Edit,
    NotebookPen,
    UserCheck,
} from "lucide-react";

import AddQuestionModal from "@/components/exam/AddQuestionModal";
import ErrorUi from "@/components/ui/ErrorUi";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import AboutExamModal from "@/components/exam/AboutExamModal";
import { createClient } from "@/lib/supabase/server";
import QuestionReportsModal from "@/components/exam/QuestionReportsModal";
import Link from "next/link";

export default async function Page({ params }) {
    const { examId } = await params;

    const supabase = await createClient();

    const { data: examData, error } = await supabase
        .from("exams")
        .select(
            `
            *, 
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
        .eq("is_deleted", false)
        .eq("questions.is_deleted", false)
        .order("created_at", { referencedTable: "questions", ascending: true })
        .maybeSingle();

    if (error) {
        return (
            <ErrorUi
                message="Something went wrong while fetching exam details."
                secondaryMessage="Please check your internet connection and try again."
            />
        );
    }

    if (!examData) {
        notFound();
    }

    const exam = examData;
    const questions = examData.questions || [];

    return (
        <div>
            {/* header */}
            <div className="bg-background flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 flex-wrap md:flex-nowrap gap-x-10 gap-y-4 mt-2 md:mt-0">
                <BackButton className="hover:text-primary-text rounded-sm pe-2 transition-colors">
                    <SecondaryLabel className="gap-2 text-left">
                        <ChevronLeft />
                        <span>{exam.title}</span>
                    </SecondaryLabel>
                </BackButton>

                <div className="ms-auto grow md:grow-0 flex justify-end">
                    <AddQuestionModal examId={exam.id} />
                </div>
            </div>

            <div className="flex items-center flex-wrap mb-5 gap-2">
                <AboutExamModal exam={exam} />
                <Button
                    asChild
                    variant="primaryOutline"
                    size="sm"
                    disabled={!questions.length}
                >
                    <Link
                        href={`/company/examinees/${exam?.id}`}
                        className="flex items-center"
                    >
                        <UserCheck /> Examinees
                    </Link>
                </Button>
                <QuestionReportsModal examId={exam?.id}>
                    <Button variant="primaryOutline" size="sm">
                        <ChartBar /> Report
                    </Button>
                </QuestionReportsModal>
            </div>

            {/* content */}
            <div className="grid grid-cols-1 lg:grid-cols-[2.3fr_1fr] gap-x-8 gap-y-10">
                {/* list of questions */}
                <div className="flex flex-col gap-1 order-2 lg:order-1">
                    {questions.length === 0 ? (
                        <BorderBox className="border rounded-t-xl bg-card flex justify-center items-center h-full">
                            <p className="text-center max-w-sm py-14">
                                No questions yet. Add your first question now by
                                clicking 'Add question' button.
                            </p>
                        </BorderBox>
                    ) : (
                        <>
                            <BorderBox className="border rounded-t-xl bg-card shadow-xs">
                                <TertiaryLabel>
                                    <NotebookPen
                                        size={18}
                                        className="text-amber-600"
                                    />
                                    <p>Manage Questions</p>
                                    <div className="ms-auto">
                                        <p className="text-sm px-3 py-1 border border-accent-foreground rounded-full bg-accent text-accent-foreground font-light tracking-wider">
                                            {questions?.length} question
                                            {questions?.length > 1 && "s"}
                                        </p>
                                    </div>
                                </TertiaryLabel>
                            </BorderBox>
                            {questions.map((q, index) => (
                                <AddQuestionCard
                                    index={index}
                                    key={q.id}
                                    questionId={q.id}
                                    initialQuestion={q.question_text}
                                    question_choices={q.question_choices}
                                />
                            ))}
                        </>
                    )}

                    <BorderBox className="bg-card border rounded-b-xl">
                        <AddQuestionModal examId={exam?.id} />
                    </BorderBox>
                </div>

                {/* right section */}
                {/* about and settings section */}
                <div className="order-1 lg:order-2 relative">
                    <div className="sticky top-20">
                        <AddQuestionAbout exam={exam} />
                    </div>
                </div>
            </div>
        </div>
    );
}
