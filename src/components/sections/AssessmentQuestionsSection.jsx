"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import BorderBox from "../ui/BorderBox";
import { cn } from "@/lib/utils";
import SecondaryLabel from "../ui/SecondaryLabel";
import { Button } from "../ui/button";
import { CircleCheck, Loader, Menu } from "lucide-react";
import Wrapper from "../Wrapper";

export default function AssessmentQuestionsSection({
    assessmentQuestions,
    title,
    description,
}) {
    const [answers, setAnswers] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleSelectChoice = useCallback(
        (questionId, choiceId) => {
            setAnswers((prev) => {
                const existing = prev.find((a) => a.question_id === questionId);

                if (existing) {
                    return prev.map((a) =>
                        a.question_id === questionId
                            ? { ...a, selected_choice_id: choiceId }
                            : a
                    );
                } else {
                    return [
                        ...prev,
                        {
                            question_id: questionId,
                            selected_choice_id: choiceId,
                        },
                    ];
                }
            });
        },
        [] // no dependencies needed since setAnswers is stable
    );

    const handleSubmitAnswers = () => {
        startTransition(async () => {
            await new Promise((res) => setTimeout(res, 5000));
        });
    };

    // useEffect(() => {
    //     // When tab/window loses focus
    //     const handleBlur = () => {
    //         console.log("Lost focus (tab switch, minimize, or app switch)");
    //         handleSubmitAnswers();
    //     };

    //     // When tab is hidden (user switched tab)
    //     const handleVisibilityChange = () => {
    //         if (document.hidden) {
    //             console.log("Tab hidden");
    //             handleSubmitAnswers();
    //         }
    //     };

    //     // When user tries to close or reload
    //     const handleBeforeUnload = (e) => {
    //         handleSubmitAnswers();
    //         // Optional: show browser prompt (not recommended UX)
    //         e.preventDefault();
    //         e.returnValue = "";
    //     };

    //     // Attach listeners
    //     window.addEventListener("blur", handleBlur);
    //     document.addEventListener("visibilitychange", handleVisibilityChange);
    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     // Cleanup when component unmounts
    //     return () => {
    //         window.removeEventListener("blur", handleBlur);
    //         document.removeEventListener(
    //             "visibilitychange",
    //             handleVisibilityChange
    //         );
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);

    return (
        <>
            <div className="sticky py-4 flex items-center justify-between flex-wrap gap-y-3 w-full bg-background gap-x-2 top-0">
                <div>
                    <SecondaryLabel>{title}</SecondaryLabel>
                    <p className="text-sm text-muted-foreground hidden sm:inline-block">
                        {description}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size=""
                        disabled={isPending}
                        onClick={handleSubmitAnswers}
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <CircleCheck />
                        )}
                        Submit Answers
                    </Button>
                    <Button size="icon" variant="outline">
                        <Menu />
                    </Button>
                </div>
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
                                handleSelectChoice(question.id, choice.id)
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

            <div className="mt-4 flex items-center gap-2 justify-end">
                <Button variant="dangerOutline">Forfeit Test</Button>
                <Button disabled={isPending} onClick={handleSubmitAnswers}>
                    {isPending ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <CircleCheck />
                    )}
                    Submit Answers
                </Button>
            </div>
        </>
    );
}
