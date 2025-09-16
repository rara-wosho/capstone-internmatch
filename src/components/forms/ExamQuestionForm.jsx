"use client";
import {
    ArrowLeft,
    ArrowRight,
    Clock,
    Maximize,
    Minimize,
    Target,
    TriangleAlert,
} from "lucide-react";
import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import { useState } from "react";
import TimeRemaining from "../exam/TimeRemaining";

export default function ExamQuestionForm({ examinationData }) {
    const [focus, setFocus] = useState(false);

    const [questions, setQuestions] = useState(
        examinationData?.questions || []
    );
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState([]);

    const handleSelectChoice = (id, choice_text) => {};

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

    const progressWidth = ((activeQuestionIndex + 1) / questions.length) * 100;

    console.log("selected", selectedChoices);
    return (
        <div>
            {!focus && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-7">
                    <section className="flex items-start p-3 sm:p-4 rounded-xl border bg-card gap-2">
                        <Target className="mt-1" size={20} />
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
                        <TriangleAlert className="mt-1" size={20} />
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
                        <Clock className="mt-1" size={20} />
                        <div>
                            <p className="mb-1 text-sm font-medium">
                                Time Limit
                            </p>
                            <p className="text-xs text-muted-foreground">
                                45 minutes to complete all questions. Auto
                                submit when time expires.
                            </p>
                        </div>
                    </section>
                    <section className="flex items-start p-3 sm:p-4 bg-card rounded-xl border gap-2">
                        <TriangleAlert className="mt-1" size={20} />
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
                        <div className="p-3 bg-card shadow-xs rounded-xl border flex items-center justify-center flex-col">
                            {/* <p className="text-sm mb-2 py-4">Time Remaining</p>  */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                {questions.map((_, index) => (
                                    <button
                                        onClick={() =>
                                            setActiveQuestionIndex(index)
                                        }
                                        className={`w-9 rounded-lg aspect-square bg-muted flex items-center justify-center cursor-pointer ${
                                            activeQuestionIndex === index &&
                                            "border border-primary"
                                        }`}
                                        key={index}
                                    >
                                        <p className="text-sm">{index + 1}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className="rounded-xl border bg-card shadow-xs grow">
                    <BorderBox className="">
                        <div className="flex items-center justify-between mb-3">
                            <h1>
                                Question {activeQuestionIndex + 1} of{" "}
                                {questions?.length}
                            </h1>
                            <button
                                onClick={() => setFocus(!focus)}
                                className="cursor-pointer"
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
                                className="bg-primary duration-300 h-1"
                            ></div>
                        </div>
                    </BorderBox>
                    <BorderBox className="right-section">
                        <p className="md:text-lg mb-5 py-2 font-medium text-secondary-foreground">
                            {questions[activeQuestionIndex]?.question_text}
                        </p>

                        <div className="flex flex-col gap-3 sm:gap-4 mb-8">
                            {questions[
                                activeQuestionIndex
                            ].question_choices.map((choice) => (
                                <div
                                    onClick={() =>
                                        handleSelectChoice(
                                            choice.id,
                                            choice.choice_text
                                        )
                                    }
                                    key={choice.id}
                                    className="rounded-lg p-3.5 text-muted-foreground transition-all ring-1 ring-neutral-300 hover:ring-primary dark:hover:ring-primary dark:ring-neutral-800"
                                >
                                    {choice?.choice_text}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 justify-between">
                            <Button
                                onClick={handlePrev}
                                variant="secondary"
                                disabled={activeQuestionIndex === 0}
                            >
                                <ArrowLeft /> Prev
                            </Button>
                            <Button onClick={handleNext}>
                                Next
                                <ArrowRight />
                            </Button>
                        </div>
                    </BorderBox>
                </div>
            </div>
        </div>
    );
}
