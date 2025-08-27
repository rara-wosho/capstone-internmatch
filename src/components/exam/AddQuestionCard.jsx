"use client";

import { PenLine, X, Plus, Check } from "lucide-react";
import BorderBox from "../ui/BorderBox";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

export default function AddQuestionCard({ id, initialQuestion }) {
    const [isEditing, setIsEditing] = useState(false);
    const [question, setQuestion] = useState(initialQuestion);
    const [choices, setChoices] = useState([
        { text: "Choice A", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ]);

    function handleAddChoice() {
        setChoices([...choices, { text: "", isCorrect: false }]);
    }

    function handleChoiceChange(index, field, value) {
        setChoices((prev) =>
            prev.map((choice, i) =>
                i === index ? { ...choice, [field]: value } : choice
            )
        );
    }

    function handleMarkCorrect(index) {
        setChoices((prev) =>
            prev.map((choice, i) => ({
                ...choice,
                isCorrect: i === index ? true : false,
            }))
        );
    }

    function handleDeleteChoice(index, isCorrect) {
        if (isCorrect) {
            toast.warning("You cannot delete a correct answer");
            return;
        }
        if (choices.length > 2) {
            setChoices((prev) => prev.filter((_, i) => i !== index));
        } else {
            toast.warning("Questions should have at least 2 choices.");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Check for empty fields
        const hasEmptyField = choices.some((c) => c.text.trim() === "");
        if (hasEmptyField) {
            toast.error("You have a choice with no value.");
            return;
        }

        // Check if at least one correct answer is chosen
        const hasCorrectAnswer = choices.some((c) => c.isCorrect === true);
        if (!hasCorrectAnswer) {
            toast.error("Please select a correct answer.");
            return;
        }

        // ✅ Passed validation
        setIsEditing(false);
    }

    function handleCancel() {
        setIsEditing(false);
    }

    return (
        <BorderBox className="border last:rounded-b-xl bg-card shadow-xs">
            <p className="text-sm text-muted-foreground mb-2">Question {id}</p>

            {/* Display Mode */}
            {!isEditing && (
                <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                        <h1 className="w-full">{question}</h1>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 hover:text-accent-foreground cursor-pointer"
                            aria-label="Edit question"
                        >
                            <PenLine size={16} />
                        </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Answer: Platypus
                    </p>
                </div>
            )}

            {/* Edit Mode */}
            {isEditing && (
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <Textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter your question"
                        className="min-h-10"
                    />

                    <div className="space-y-3">
                        {choices.map((choice, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <Input
                                    type="text"
                                    value={choice.text}
                                    onChange={(e) =>
                                        handleChoiceChange(
                                            index,
                                            "text",
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Choice ${index + 1}`}
                                />

                                <Button
                                    variant="secondary"
                                    type="button"
                                    size="icon"
                                    className={
                                        choice.isCorrect &&
                                        "bg-green-500/10 text-green-900 dark:text-green-300 dark:bg-green-700/10 border border-green-700"
                                    }
                                    asChild
                                >
                                    <label
                                        htmlFor={`is-correct-${id}-${index}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`is-correct-${id}`}
                                            id={`is-correct-${id}-${index}`}
                                            checked={choice.isCorrect}
                                            onChange={() =>
                                                handleMarkCorrect(index)
                                            }
                                            className="sr-only"
                                        />
                                        <Check size={16} />
                                    </label>
                                </Button>

                                <Button
                                    size="icon"
                                    type="button"
                                    onClick={() =>
                                        handleDeleteChoice(
                                            index,
                                            choice.isCorrect
                                        )
                                    }
                                    variant="dangerOutline"
                                    aria-label="Delete choice"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-5">
                        <button
                            type="button"
                            onClick={handleAddChoice}
                            className="flex items-center gap-1 text-sm text-accent-foreground cursor-pointer"
                        >
                            <Plus size={14} /> Add choice
                        </button>

                        <div className="flex gap-2 justify-end">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleCancel}
                                size="sm"
                            >
                                Cancel
                            </Button>
                            <Button size="sm">Save changes</Button>
                        </div>
                    </div>
                </form>
            )}
        </BorderBox>
    );
}
