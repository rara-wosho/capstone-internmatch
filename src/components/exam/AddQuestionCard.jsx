"use client";

import { PenLine, X, Plus, Check, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/lib/supabase/client";
import AlertModal from "../ui/AlertModal";

export default function AddQuestionCard({
    questionId,
    initialQuestion,
    question_choices = [],
}) {
    const router = useRouter();
    const supabase = createClient();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [question, setQuestion] = useState(initialQuestion);
    const [choices, setChoices] = useState(
        question_choices.map((c) => ({
            choice_text: c.choice_text,
            is_correct: c.is_correct,
        }))
    );

    // ---------- Choice helpers ----------
    const handleAddChoice = () =>
        setChoices((prev) => [...prev, { choice_text: "", is_correct: false }]);

    const handleChoiceChange = (index, value) =>
        setChoices((prev) =>
            prev.map((c, i) => (i === index ? { ...c, choice_text: value } : c))
        );

    const handleMarkCorrect = (index) =>
        setChoices((prev) =>
            prev.map((c, i) => ({ ...c, is_correct: i === index }))
        );

    const handleDeleteChoice = (index) => {
        if (choices[index].is_correct) {
            toast.warning("You cannot delete the correct answer.");
            return;
        }
        if (choices.length <= 2) {
            toast.warning("A question must have at least 2 choices.");
            return;
        }
        setChoices((prev) => prev.filter((_, i) => i !== index));
    };

    // ---------- Submit ----------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (!question.trim()) {
            toast.error("Question text cannot be empty.");
            setLoading(false);
            return;
        }
        if (choices.some((c) => !c.choice_text.trim())) {
            toast.error("Choices cannot be empty.");
            setLoading(false);
            return;
        }
        if (!choices.some((c) => c.is_correct)) {
            toast.error("Please select a correct answer.");
            setLoading(false);
            return;
        }

        // 1️⃣ Update question
        const { error: qError } = await supabase
            .from("questions")
            .update({ question_text: question })
            .eq("id", questionId);

        if (qError) {
            toast.error("Unable to update question", {
                description: qError.message,
            });
            setLoading(false);
            return;
        }

        // 2️⃣ Delete all old choices
        const { error: delErr } = await supabase
            .from("question_choices")
            .delete()
            .eq("question_id", questionId);

        if (delErr) {
            toast.error("Unable to delete old question choices", {
                description: delErr.message,
            });
            setLoading(false);
            return;
        }

        // 3️⃣ Insert new ones
        const rows = choices.map((c) => ({
            question_id: questionId,
            choice_text: c.choice_text,
            is_correct: c.is_correct,
        }));

        const { error: insErr } = await supabase
            .from("question_choices")
            .insert(rows);

        if (insErr) {
            toast.error("Unable to update question choices", {
                description: insErr.message,
            });
            setLoading(false);
            return;
        }

        toast.success("Changes saved!");
        setIsEditing(false);
        setLoading(false);
        router.refresh();
    };

    const handleCancel = () => {
        setIsEditing(false);
        setQuestion(initialQuestion);
        setChoices(
            question_choices.map((c) => ({
                choice_text: c.choice_text,
                is_correct: c.is_correct,
            }))
        );
    };

    const handleDeleteQuestion = async () => {
        try {
            const { error } = await supabase
                .from("questions")
                .delete()
                .eq("id", questionId);

            if (error) {
                toast.error("Unable to delete this question", {
                    description: error.message,
                });
                return;
            }

            toast.success("Question deleted.");
            router.refresh();
        } catch (err) {
            toast.error("Unexpected error deleting question", {
                description: err.message,
            });
        }
    };

    // ---------- UI ----------
    return (
        <BorderBox className="border last:rounded-b-xl bg-card shadow-xs">
            {/* -------- Display Mode -------- */}
            {!isEditing && (
                <div className="flex flex-col">
                    <div className="mb-2 flex gap-2 items-start">
                        <h1 className="w-full text-sm">{question}</h1>
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-2 py-1 hover:text-accent-foreground cursor-pointer"
                                aria-label="Edit question"
                            >
                                <PenLine size={16} />
                            </button>
                            <AlertModal
                                alertTitle="Delete this question?"
                                alertMessage="This action cannot be undone."
                                cancelLabel="Cancel"
                                actionLabel="Yes, Delete question"
                                type="danger"
                                alertAction={() =>
                                    handleDeleteQuestion(questionId)
                                }
                            >
                                <button
                                    className="ps-2 py-1 text-destructive cursor-pointer"
                                    aria-label="delete question"
                                >
                                    <Trash size={17} />
                                </button>
                            </AlertModal>
                        </div>
                    </div>
                    <p className="text-sm text-accent-foreground mb-1">
                        <span className="text-muted-foreground">Answer:</span>{" "}
                        {choices.find((c) => c.is_correct)?.choice_text || "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {choices.length} choices
                    </p>
                </div>
            )}

            {/* -------- Edit Mode -------- */}
            {isEditing && (
                <form className="space-y-3 py-4" onSubmit={handleSubmit}>
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
                                    value={choice.choice_text}
                                    onChange={(e) =>
                                        handleChoiceChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Choice ${index + 1}`}
                                    className={
                                        choice.is_correct
                                            ? "bg-green-500/10 text-green-900 dark:text-green-200 dark:bg-green-700/10 border border-green-700/50"
                                            : ""
                                    }
                                />

                                <Button
                                    type="button"
                                    size="icon"
                                    variant="secondary"
                                    aria-label="Mark as correct"
                                    className={
                                        choice.is_correct
                                            ? "bg-green-500/10 text-green-900 dark:text-green-300 dark:bg-green-700/10 border border-green-700/80"
                                            : ""
                                    }
                                    onClick={() => handleMarkCorrect(index)}
                                >
                                    <Check size={16} />
                                </Button>

                                <Button
                                    type="button"
                                    size="icon"
                                    variant="dangerOutline"
                                    aria-label="Delete choice"
                                    onClick={() => handleDeleteChoice(index)}
                                    disabled={choices.length <= 2}
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
                            className="flex items-center gap-1 text-sm text-accent-foreground"
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
                            <Button size="sm" disabled={loading}>
                                {loading ? "Saving..." : "Save changes"}
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </BorderBox>
    );
}
