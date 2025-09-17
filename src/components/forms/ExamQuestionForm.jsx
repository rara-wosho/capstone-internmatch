"use client";
import {
    ArrowLeft,
    ArrowRight,
    Clock,
    Maximize,
    Minimize,
    Target,
    TriangleAlert,
    Check,
} from "lucide-react";
import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import TimeRemaining from "../exam/TimeRemaining";
import { formatDuration } from "@/utils/format-duration";

export default function ExamQuestionForm({ examinationData }) {
    const [focus, setFocus] = useState(false);

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

    const handleSelectChoice = (questionId, choiceId, choiceText) => {
        setSelectedChoices((prev) => ({
            ...prev,
            [questionId]: {
                question_id: questionId,
                choice_id: choiceId,
                choice_text: choiceText,
                question_text: currentQuestion.question_text,
                timestamp: new Date().toISOString(),
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

        if (answersArray.length < questions.length) {
            const unansweredCount = questions.length - answersArray.length;
            const confirmSubmit = window.confirm(
                `You have ${unansweredCount} unanswered question${
                    unansweredCount > 1 ? "s" : ""
                }. Are you sure you want to submit?`
            );
            if (!confirmSubmit) return;
        }

        try {
            // Here you would make your API call to submit the exam
            // Example API call structure:
            /*
            const response = await fetch('/api/exam/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exam_id: examinationData.id,
                    student_id: examinationData.student_id, // You'll need to pass this
                    attempt_id: examinationData.attempt_id, // If you create attempts
                    answers: answersArray,
                    completed_at: new Date().toISOString()
                }),
            });

            if (!response.ok) throw new Error('Failed to submit exam');
            
            const result = await response.json();
            */

            console.log("Submitting exam with answers:", answersArray);

            // Handle successful submission - redirect or show results
            alert("Exam submitted successfully!");
            // window.location.href = '/exam-results'; // or use router.push()
        } catch (error) {
            console.error("Error submitting exam:", error);
            alert("Failed to submit exam. Please try again.");
        }
    };

    const progressWidth = ((activeQuestionIndex + 1) / questions.length) * 100;

    // Auto-save answers periodically (optional)
    useEffect(() => {
        const autoSave = setInterval(() => {
            if (Object.keys(selectedChoices).length > 0) {
                // Auto-save logic here if needed
                console.log(
                    "Auto-saving answers...",
                    Object.values(selectedChoices)
                );

                // Example auto-save API call:
                /*
                fetch('/api/exam/auto-save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        attempt_id: examinationData.attempt_id,
                        answers: Object.values(selectedChoices)
                    })
                }).catch(err => console.error('Auto-save failed:', err));
                */
            }
        }, 30000); // Auto-save every 30 seconds

        return () => clearInterval(autoSave);
    }, [selectedChoices]);

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
    }, [selectedChoices]);

    const isLastQuestion = activeQuestionIndex === questions.length - 1;

    if (!currentQuestion) {
        return <div>Loading questions...</div>;
    }

    return (
        <div>
            {!focus && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-7">
                    <section className="flex items-start p-3 sm:p-4 rounded-xl border bg-card gap-2">
                        <Target
                            className="mt-1 text-accent-foreground"
                            size={20}
                        />
                        <div>
                            <p className="mb-1 text-sm font-medium">
                                Passing Score
                            </p>
                            <p className="text-xs text-muted-foreground">
                                A minimum score of 80% is required.
                            </p>
                        </div>
                    </section>
                    <section className="flex items-start p-3 sm:p-4 bg-card rounded-xl border gap-2">
                        <TriangleAlert
                            className="mt-1 text-accent-foreground"
                            size={20}
                        />
                        <div>
                            <p className="mb-1 text-sm font-medium">
                                Browser Focus
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Switching tabs or leaving the window will result
                                in immediate forfeit.
                            </p>
                        </div>
                    </section>
                    <section className="flex items-start p-3 sm:p-4 bg-card rounded-xl border gap-2">
                        <Clock
                            className="mt-1 text-accent-foreground"
                            size={20}
                        />
                        <div>
                            <p className="mb-1 text-sm font-medium">
                                Time Limit
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {formatDuration(examinationData.duration)} to
                                complete all questions. Auto submit when time
                                expires.
                            </p>
                        </div>
                    </section>
                    <section className="flex items-start p-3 sm:p-4 bg-card rounded-xl border gap-2">
                        <TriangleAlert
                            className="mt-1 text-accent-foreground"
                            size={20}
                        />
                        <div>
                            <p className="mb-1 text-sm font-medium">Note</p>
                            <p className="text-xs text-muted-foreground">
                                Avoid refreshing the page or you will lose your
                                progress.
                            </p>
                        </div>
                    </section>
                </div>
            )}

            <div
                className={`grid grid-cols-1 gap-3 md:gap-4 mt-7 ${
                    focus ? "lg:grid-cols-1" : "lg:grid-cols-[1fr_2.7fr]"
                }`}
            >
                {!focus && (
                    <div className="left-section flex flex-col gap-3 md:gap-4">
                        <TimeRemaining timeLimit={examinationData.duration} />
                        <div className="p-3 bg-card shadow-xs rounded-xl border">
                            <p className="text-sm font-medium text-center mb-5">
                                Progress: {totalAnsweredQuestions}/
                                {questions.length}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {questions.map((question, index) => {
                                    const isAnswered =
                                        selectedChoices[question.id] !==
                                        undefined;
                                    const isActive =
                                        activeQuestionIndex === index;

                                    return (
                                        <button
                                            onClick={() =>
                                                handleQuestionNavigation(index)
                                            }
                                            className={`w-9 rounded-lg aspect-square flex items-center justify-center cursor-pointer relative transition-all
                                                ${
                                                    isActive
                                                        ? "border-2 border-primary bg-violet-500/10"
                                                        : isAnswered
                                                        ? "bg-green-100 border border-green-300 dark:bg-green-900/30 dark:border-green-700"
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
                                                    isActive
                                                        ? "font-semibold"
                                                        : ""
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
                )}
                <div className="rounded-xl border bg-card shadow-xs grow">
                    <BorderBox>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <h1 className="text-secondary-foreground/90 text-sm">
                                    Question {activeQuestionIndex + 1} of{" "}
                                    {questions?.length}
                                </h1>
                                {isCurrentQuestionAnswered && (
                                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                        Answered
                                        <Check size={12} />
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => setFocus(!focus)}
                                className="cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
                            >
                                {focus ? (
                                    <Minimize size={20} />
                                ) : (
                                    <Maximize size={20} />
                                )}
                            </button>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden w-full bg-muted">
                            <div
                                style={{ width: `${progressWidth}%` }}
                                className="bg-primary/60 duration-300 h-1"
                            ></div>
                        </div>
                    </BorderBox>
                    <BorderBox className="right-section">
                        <p className="md:text-lg mb-6 text-secondary-foreground leading-relaxed">
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
                                                choice.choice_text
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
                                disabled={activeQuestionIndex === 0}
                            >
                                <ArrowLeft size={16} />
                                Prev
                            </Button>

                            <div className="text-sm text-muted-foreground">
                                {isCurrentQuestionAnswered
                                    ? "Answer selected"
                                    : "Select an answer"}
                            </div>

                            {isLastQuestion ? (
                                <Button
                                    onClick={handleSubmitExam}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Submit Exam
                                </Button>
                            ) : (
                                <Button onClick={handleNext}>
                                    Next
                                    <ArrowRight size={16} />
                                </Button>
                            )}
                        </div>
                    </BorderBox>
                </div>
            </div>
        </div>
    );
}
