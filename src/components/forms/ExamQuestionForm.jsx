"use client";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Loader,
} from "lucide-react";
import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import TimeRemaining from "../exam/TimeRemaining";
import { useSession } from "@/context/SessionContext";
import { saveExamsAnswer } from "@/lib/actions/exam";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ExamQuestionForm({ examinationData }) {
    const [isExpired, setIsExpired] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // get the id of the current user
    const { user } = useSession();

    const companyId = examinationData.company_id;

    // array of questions in the exam
    const questions = examinationData?.questions || [];

    // controls what question is currently in preview
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    // store all answers as object with question_id as key
    const [selectedChoices, setSelectedChoices] = useState({});

    // get current question
    const currentQuestion = questions[activeQuestionIndex];

    // check if current question has been answered
    const isCurrentQuestionAnswered =
        selectedChoices[currentQuestion?.id] !== undefined;

    // count total answered questions
    const totalAnsweredQuestions = Object.keys(selectedChoices).length;

    const handleSelectChoice = (
        questionId,
        choiceId,
        choiceText,
        isCorrect
    ) => {
        setSelectedChoices((prev) => ({
            ...prev,
            [questionId]: {
                question_id: questionId,
                choice_id: choiceId,
                choice_text: choiceText,
                question_text: currentQuestion.question_text,
                answer_is_correct: isCorrect,
            },
        }));
    };

    const handleNext = () => {
        if (activeQuestionIndex < questions.length - 1) {
            setActiveQuestionIndex(activeQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeQuestionIndex !== 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    };

    const handleQuestionNavigation = (index) => {
        setActiveQuestionIndex(index);
    };

    const handleSubmitExam = async () => {
        // Convert selectedChoices object to array for submission
        const answersArray = Object.values(selectedChoices);

        if (answersArray.length < questions.length && !isExpired) {
            const unansweredCount = questions.length - answersArray.length;
            const confirmSubmit = window.confirm(
                `You have ${unansweredCount} unanswered question${
                    unansweredCount > 1 ? "s" : ""
                }. Are you sure you want to submit?`
            );
            if (!confirmSubmit) return;
        }

        setIsSubmitting(true);

        const key = `exam_${examinationData.id}_${user.id}_start`;
        const rawStart = localStorage.getItem(key);

        const started_at = rawStart
            ? new Date(rawStart).toISOString()
            : new Date().toISOString();

        try {
            const { success, error } = await saveExamsAnswer(
                user?.id,
                companyId,
                examinationData?.id,
                started_at,
                examinationData.title,
                answersArray
            );

            if (!success) {
                toast.error("Something went wrong while submitting the exam.", {
                    description: error,
                });
                return;
            }

            router.replace(
                "/student/e/ae7244c3-5904-4bbb-a87e-798724039866/result"
            );
        } catch (err) {
            alert("Something went wrong submitting the exam.");
        } finally {
            localStorage.removeItem(key);
            setIsSubmitting(false);
        }
    };

    const progressWidth = ((activeQuestionIndex + 1) / questions.length) * 100;

    // handle time limit expire
    useEffect(() => {
        if (isExpired) {
            setIsSubmitting(true);
            handleSubmitExam();
        }
    }, [isExpired]);

    // Handle browser refresh warning
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (Object.keys(selectedChoices).length > 0) {
                e.preventDefault();
                e.returnValue = "";
                return "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    const isLastQuestion = activeQuestionIndex === questions.length - 1;

    if (!currentQuestion) {
        return <div>Loading questions...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-3 md:gap-4 mt-7 lg:grid-cols-[1fr_2.7fr]">
                <div className="left-section flex flex-col gap-3 md:gap-4">
                    <TimeRemaining
                        examId={examinationData.id}
                        userId={user.id}
                        durationMinutes={examinationData.duration}
                        onExpire={() => setIsExpired(true)}
                    />

                    <div className="p-3 bg-card shadow-xs rounded-xl border grow">
                        <p className="text-sm font-medium text-center mb-5">
                            Progress: {totalAnsweredQuestions}/
                            {questions.length}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {questions.map((question, index) => {
                                const isAnswered =
                                    selectedChoices[question.id] !== undefined;
                                const isActive = activeQuestionIndex === index;

                                return (
                                    <button
                                        disabled={isExpired || isSubmitting}
                                        onClick={() =>
                                            handleQuestionNavigation(index)
                                        }
                                        className={`${
                                            isExpired || isSubmitting
                                                ? "opacity-40"
                                                : "cursor-pointer"
                                        } w-9 rounded-lg aspect-square flex items-center justify-center relative transition-all
                                                ${
                                                    isActive
                                                        ? "border-2 border-primary bg-violet-500/10"
                                                        : isAnswered
                                                        ? "bg-emerald-100 border border-emerald-400 dark:bg-green-900/30 dark:border-green-700"
                                                        : "bg-muted hover:bg-muted/80"
                                                }
                                            `}
                                        key={index}
                                    >
                                        {isAnswered && (
                                            <div className="absolute -top-1 -right-1 text-green-600 bg-card rounded-full p-[2px]">
                                                <Check size={12} />
                                            </div>
                                        )}
                                        <p
                                            className={`text-sm ${
                                                isActive ? "font-semibold" : ""
                                            }`}
                                        >
                                            {index + 1}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card shadow-xs grow">
                    <BorderBox>
                        <div className="flex items-end gap-2 mb-2">
                            <h1 className="text-muted-foreground text-sm">
                                Question {activeQuestionIndex + 1} of{" "}
                                {questions?.length}
                            </h1>
                            {isCurrentQuestionAnswered && (
                                <p className="text-sm text-green-600 flex items-center gap-1">
                                    Answered
                                    <Check size={12} />
                                </p>
                            )}
                            <p className="ms-auto text-xs text-primary-text">
                                {Math.trunc(progressWidth)}% Completed
                            </p>
                        </div>
                        <div className="h-[6px] rounded-full overflow-hidden w-full bg-muted">
                            <div
                                style={{ width: `${progressWidth}%` }}
                                className="bg-primary/60 duration-300 rounded-full h-[6px]"
                            ></div>
                        </div>
                    </BorderBox>
                    <BorderBox className="right-section">
                        <p className="md:text-lg mb-6 text-secondary-foreground leading-relaxed font-medium">
                            {currentQuestion.question_text}
                        </p>

                        <div className="flex flex-col gap-3 sm:gap-4 mb-8">
                            {currentQuestion.question_choices.map((choice) => {
                                const isSelected =
                                    selectedChoices[currentQuestion.id]
                                        ?.choice_id === choice.id;

                                return (
                                    <div
                                        onClick={() =>
                                            handleSelectChoice(
                                                currentQuestion.id,
                                                choice.id,
                                                choice.choice_text,
                                                choice.is_correct
                                            )
                                        }
                                        key={choice.id}
                                        className={`rounded-lg p-3.5 text-muted-foreground transition-all cursor-pointer
                                            ${
                                                isSelected
                                                    ? "ring-2 ring-primary bg-violet-500/5 text-primary-text"
                                                    : "ring-1 ring-neutral-300 hover:ring-primary dark:hover:ring-primary dark:ring-neutral-800 hover:bg-muted/50"
                                            }
                                        `}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-4 h-4 rounded-full relative border-2 mt-0.5 flex-shrink-0
                                                ${
                                                    isSelected
                                                        ? "border-primary bg-primary"
                                                        : "border-muted-foreground"
                                                }
                                            `}
                                            >
                                                {isSelected && (
                                                    <div className="inset-[3px] absolute z-10 rounded-full bg-card"></div>
                                                )}
                                            </div>
                                            <span className="flex-1">
                                                {choice?.choice_text}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-3 justify-between">
                            <Button
                                onClick={handlePrev}
                                variant="secondary"
                                disabled={
                                    activeQuestionIndex === 0 ||
                                    isExpired ||
                                    isSubmitting
                                }
                            >
                                <ChevronLeft size={16} />
                                Prev
                            </Button>

                            <div className="text-sm text-muted-foreground">
                                {isCurrentQuestionAnswered
                                    ? "Answer selected"
                                    : "Select an answer"}
                            </div>

                            {isLastQuestion ? (
                                <Button
                                    disabled={isExpired || isSubmitting}
                                    onClick={handleSubmitExam}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {isSubmitting && (
                                        <Loader className="animate-spin" />
                                    )}
                                    {isSubmitting
                                        ? "Submitting Exam..."
                                        : "Submit Exam"}
                                </Button>
                            ) : (
                                <Button
                                    disabled={
                                        isExpired ||
                                        isSubmitting ||
                                        selectedChoices[currentQuestion.id] ===
                                            undefined
                                    }
                                    onClick={handleNext}
                                >
                                    {isSubmitting ? "Submitting..." : "Next"}
                                    <ChevronRight size={16} />
                                </Button>
                            )}
                        </div>
                    </BorderBox>
                </div>
            </div>
        </div>
    );
}
