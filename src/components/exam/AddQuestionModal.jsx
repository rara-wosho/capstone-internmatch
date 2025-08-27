"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FileText, PlusCircle, X, Check, Plus } from "lucide-react";
import TertiaryLabel from "../ui/TertiaryLabel";
import IconWrapper from "../ui/IconWrapper";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

export default function AddQuestionModal({ onQuestionAdded }) {
    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState([
        { text: "", isCorrect: true },
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
                isCorrect: i === index,
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

        // Check for empty question
        if (!question.trim()) {
            toast.error("Please enter a question.");
            return;
        }

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

        // Create the question object
        const newQuestion = {
            id: Date.now(), // Temporary ID
            question: question.trim(),
            choices: choices.map((choice) => ({
                text: choice.text.trim(),
                isCorrect: choice.isCorrect,
            })),
        };

        // Pass the new question to the parent component
        if (onQuestionAdded) {
            onQuestionAdded(newQuestion);
        }

        // Reset form
        setQuestion("");
        setChoices([
            { text: "", isCorrect: true },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
        ]);

        toast.success("Question added successfully!");
    }

    function handleCancel() {
        // Reset form on cancel
        setQuestion("");
        setChoices([
            { text: "", isCorrect: true },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
        ]);
    }

    return (
        <Dialog>
            <Button variant="white" asChild className="sm:grow-0 grow">
                <DialogTrigger>
                    <PlusCircle />
                    Add question
                </DialogTrigger>
            </Button>

            <DialogContent className="p-3 sm:p-5 overflow-y-auto max-h-[90svh]">
                <div>
                    <DialogHeader>
                        <DialogTitle className="py-2">
                            <TertiaryLabel className="space-x-2">
                                <IconWrapper>
                                    <FileText size={16} />
                                </IconWrapper>
                                <p>New Question</p>
                            </TertiaryLabel>
                        </DialogTitle>

                        <div className="mt-2">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-3 mb-6">
                                    <div className="flex flex-col items-start">
                                        <FormLabel className="text-left mb-2">
                                            Question
                                        </FormLabel>
                                        <Textarea
                                            value={question}
                                            onChange={(e) =>
                                                setQuestion(e.target.value)
                                            }
                                            placeholder="Enter your question"
                                            className="min-h-20"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <FormLabel className="mb-2">
                                            Choices
                                        </FormLabel>
                                        <div className="w-full space-y-3">
                                            {choices.map((choice, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Input
                                                        value={choice.text}
                                                        onChange={(e) =>
                                                            handleChoiceChange(
                                                                index,
                                                                "text",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={`Choice ${
                                                            index + 1
                                                        }`}
                                                        className="flex-1"
                                                        required
                                                    />

                                                    <Button
                                                        variant="secondary"
                                                        type="button"
                                                        size="icon"
                                                        className={
                                                            choice.isCorrect
                                                                ? "bg-green-500/10 text-green-900 dark:text-green-300 dark:bg-green-700/10 border border-green-700"
                                                                : ""
                                                        }
                                                        asChild
                                                    >
                                                        <label
                                                            htmlFor={`is-correct-${index}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="is-correct"
                                                                id={`is-correct-${index}`}
                                                                checked={
                                                                    choice.isCorrect
                                                                }
                                                                onChange={() =>
                                                                    handleMarkCorrect(
                                                                        index
                                                                    )
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

                                        <button
                                            type="button"
                                            onClick={handleAddChoice}
                                            className="mt-3 flex items-center gap-1 text-sm text-accent-foreground cursor-pointer"
                                        >
                                            <Plus size={14} className="mr-1" />
                                            Add choice
                                        </button>
                                    </div>
                                </div>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="submit">
                                            Save question
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </div>
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    );
}
