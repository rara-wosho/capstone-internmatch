"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import BorderBox from "../ui/BorderBox";
import { cn } from "@/lib/utils";
import SecondaryLabel from "../ui/SecondaryLabel";
import { Button } from "../ui/button";
import { CircleCheck, Ellipsis, Loader } from "lucide-react";
import { submitAssessmentAnswers } from "@/lib/actions/assessment-test";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AssessmentQuestionsSection({
    assessmentQuestions,
    title,
    description,
    assessmentId,
    studentId,
}) {
    const [answers, setAnswers] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [violation, setViolation] = useState("");
    const [openModal, setOpenModal] = useState(false);

    // select choices then store to answers variable
    const handleSelectChoice = useCallback(
        (questionId, choiceId, isAnswerCorrect) => {
            setAnswers((prev) => {
                const existing = prev.find((a) => a.question_id === questionId);

                if (existing) {
                    return prev.map((a) =>
                        a.question_id === questionId
                            ? {
                                  ...a,
                                  selected_choice_id: choiceId,
                                  is_answer_correct: isAnswerCorrect,
                              }
                            : a
                    );
                } else {
                    return [
                        ...prev,
                        {
                            question_id: questionId,
                            selected_choice_id: choiceId,
                            is_answer_correct: isAnswerCorrect,
                        },
                    ];
                }
            });
        },
        []
    );

    const handleSubmitAnswers = () => {
        if (isPending) return;
        if (assessmentQuestions.length === 0) return;

        const totalItem = assessmentQuestions.length || 0;

        startTransition(async () => {
            const result = await submitAssessmentAnswers(
                studentId,
                assessmentId,
                answers,
                totalItem,
                violation
            );

            if (!result.success) {
                toast.error("Failed to submit assessment answers.", {
                    description: result.error,
                });
            }
        });
    };

    useEffect(() => {
        // When tab/window loses focus
        const handleBlur = () => {
            if (assessmentQuestions.length === 0) return;
            setViolation("Lost tab focus.");
        };

        // When user tries to close or reload
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        // Attach listeners
        window.addEventListener("blur", handleBlur);
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup when component unmounts
        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <div className="sticky py-4 flex items-center justify-between flex-wrap gap-y-3 w-full bg-background gap-x-2 top-0">
                <div>
                    <SecondaryLabel>{title}</SecondaryLabel>
                    <p className="text-sm text-muted-foreground hidden sm:inline-block">
                        {description}
                    </p>
                </div>
                {assessmentQuestions.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Button
                            size=""
                            disabled={isPending}
                            onClick={() => setOpenModal(true)}
                        >
                            {isPending ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <CircleCheck />
                            )}
                            Submit Answers
                        </Button>
                        <Button size="icon" variant="outline">
                            <Ellipsis />
                        </Button>
                    </div>
                )}
            </div>

            {/* quetions list  */}
            {assessmentQuestions.map((question, index) => (
                <BorderBox
                    key={question?.id}
                    className="border rounded-xl bg-card shadow-xs mb-3"
                >
                    <p className="mb-6">
                        {index + 1}. {question.assessment_question_text}
                    </p>

                    {question?.assessment_choices?.map((choice) => (
                        <div
                            key={choice.id}
                            onClick={() =>
                                handleSelectChoice(
                                    question.id,
                                    choice.id,
                                    choice.is_correct
                                )
                            }
                            className={cn(
                                "p-3 border mb-2 rounded-md cursor-pointer transition-colors",
                                answers.find(
                                    (a) => a.question_id === question.id
                                )?.selected_choice_id === choice.id
                                    ? "text-accent-foreground bg-accent border-blue-400/50"
                                    : "hover:border-blue-400/50 hover:text-accent-foreground"
                            )}
                        >
                            {choice.assessment_choice_text}
                        </div>
                    ))}
                </BorderBox>
            ))}

            {/* lower submit button  */}
            {assessmentQuestions.length > 0 && (
                <div className="mt-4 flex items-center gap-2 justify-end">
                    <Button variant="dangerOutline">Forfeit Test</Button>
                    <Button
                        disabled={isPending}
                        onClick={() => setOpenModal(true)}
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <CircleCheck />
                        )}
                        Submit Answers
                    </Button>
                </div>
            )}

            {/* Alert Dialog if violation is commited or to confirm submission  */}
            <AlertDialog
                open={openModal || violation !== ""}
                onOpenChange={setOpenModal}
            >
                <AlertDialogTrigger className="sr-only">
                    Open
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {violation
                                ? "Assessment Test Forfeited"
                                : "Submit Answers?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="sr-only">
                            Description
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="text-sm text-muted-foreground">
                        {violation && (
                            <p className="text-destructive">
                                You lost focus or switch tab which immediately
                                forfeits your assessment test.
                            </p>
                        )}

                        <p className="mt-2">{`You answered ${answers.length} out of ${assessmentQuestions.length} questions.`}</p>
                    </div>
                    <AlertDialogFooter>
                        {violation === "" && (
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        )}
                        <AlertDialogAction
                            disabled={isPending}
                            onClick={handleSubmitAnswers}
                        >
                            {isPending ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <CircleCheck />
                            )}
                            Submit Answers
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
