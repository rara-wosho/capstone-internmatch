"use client";

import { PenLine, X, Plus, Check } from "lucide-react";
import BorderBox from "../ui/BorderBox";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

export default function AddQuestionCard({ id, initialQuestion }) {
    const [isEditing, setIsEditing] = useState(false);
    const [question, setQuestion] = useState(initialQuestion);
    const [choices, setChoices] = useState([
        { text: "Choice A", isCorrect: true },
        { text: "Choice B", isCorrect: false },
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
            toast.warning("You cannot delete a correct answer", {
                position: "bottom-left",
            });
            return;
        }
        if (choices.length > 2) {
            setChoices((prev) => prev.filter((_, i) => i !== index));
        } else {
            toast.warning("Questions should have at least 2 choices.", {
                position: "bottom-left",
            });
        }
    }

    function handleSave() {
        setIsEditing(false);
    }

    function handleCancel() {
        setIsEditing(false);
    }

    console.log("component render");
    return (
        <BorderBox className="border rounded-xl bg-card shadow-xs p-4">
            <p className="text-sm text-muted-foreground mb-2">Question 1</p>

            {/* Display Mode */}
            {!isEditing && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                        <h1 className="w-full">{question}</h1>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 hover:text-accent-foreground"
                            aria-label="Edit question"
                        >
                            <PenLine size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Mode */}
            {isEditing && (
                <form className="space-y-3">
                    <Input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter your question"
                    />

                    <div className="space-y-2">
                        {choices.map((choice, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <Button
                                    variant="secondary"
                                    type="button"
                                    size="icon"
                                    className={
                                        choice.isCorrect && "bg-green-600"
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
                            variant="secondary"
                            onClick={handleCancel}
                            size="sm"
                        >
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                            Save changes
                        </Button>
                    </div>
                </form>
            )}
        </BorderBox>
    );
}
