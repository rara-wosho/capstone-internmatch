"use client";

import { PenLine, X, Plus, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/lib/supabase/client";

export default function AddQuestionCard({
    questionId,
    initialQuestion,
    question_choices = [],
}) {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [question, setQuestion] = useState(initialQuestion);
    const [choices, setChoices] = useState(
        question_choices.map((c) => ({
            id: c.id ?? null,
            choice_text: c.choice_text,
            is_correct: c.is_correct,
        }))
    );
    const [loading, setLoading] = useState(false);

    console.log(choices);
    // ---- Choice helpers ----
    function handleAddChoice() {
        setChoices((prev) => [
            ...prev,
            { id: undefined, choice_text: "", is_correct: false },
        ]);
    }

    function handleChoiceChange(index, value) {
        setChoices((prev) =>
            prev.map((c, i) => (i === index ? { ...c, choice_text: value } : c))
        );
    }

    function handleMarkCorrect(index) {
        setChoices((prev) =>
            prev.map((c, i) => ({ ...c, is_correct: i === index }))
        );
    }

    function handleDeleteChoice(index) {
        if (choices[index].is_correct) {
            toast.warning("You cannot delete the correct answer.");
            return;
        }
        if (choices.length <= 2) {
            toast.warning("A question must have at least 2 choices.");
            return;
        }
        setChoices((prev) => prev.filter((_, i) => i !== index));
    }

    // ---- Submit ----
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const supabase = createClient();

        // Validation
        if (!question.trim()) {
            toast.error("Question text cannot be empty.");
            setLoading(false);
            return;
        }

        const hasEmptyChoice = choices.some(
            (c) => !c.choice_text || !c.choice_text.trim()
        );
        if (hasEmptyChoice) {
            toast.error("Choices cannot be empty.");
            setLoading(false);
            return;
        }

        const hasCorrect = choices.some((c) => c.is_correct);
        if (!hasCorrect) {
            toast.error("Please select a correct answer.");
            setLoading(false);
            return;
        }

        try {
            // 1. Update question
            const { error: qError } = await supabase
                .from("questions")
                .update({ question_text: question })
                .eq("id", questionId);

            if (qError) throw new Error("Unable to update question");

            // 2. Upsert choices
            const toUpsert = choices.map((c) => ({
                id: c.id || undefined,
                choice_text: c.choice_text,
                is_correct: c.is_correct,
                question_id: questionId,
            }));

            const { error: upsertErr } = await supabase
                .from("question_choices")
                .upsert(toUpsert, { onConflict: "id" });

            if (upsertErr) throw new Error(upsertErr.message);

            // 3. Delete removed choices (compare by id)
            const originalIds = new Set(
                question_choices.map((c) => c.id).filter(Boolean)
            );
            const currentIds = new Set(
                choices.map((c) => c.id).filter(Boolean)
            );
            const idsToDelete = [...originalIds].filter(
                (id) => !currentIds.has(id)
            );

            if (idsToDelete.length > 0) {
                const { error: delErr } = await supabase
                    .from("question_choices")
                    .delete()
                    .in("id", idsToDelete);
                if (delErr) throw new Error("Unable to delete old choices");
            }

            toast.success("Changes saved!");
            router.refresh();
            setIsEditing(false);
        } catch (err) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    function handleCancel() {
        setIsEditing(false);
        setQuestion(initialQuestion);
        setChoices(
            question_choices.map((c) => ({
                id: c.id ?? null,
                choice_text: c.choice_text,
                is_correct: c.is_correct,
            }))
        );
    }

    // ---- UI ----
    return (
        <BorderBox className="border last:rounded-b-xl bg-card shadow-xs">
            {/* ---------- Display Mode ---------- */}
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
                        Answer:{" "}
                        {choices
                            .filter((c) => c.is_correct)
                            .map((c) => c.choice_text)
                            .join(", ")}
                    </p>
                </div>
            )}

            {/* ---------- Edit Mode ---------- */}
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
                                key={choice.id ?? index}
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
                                />

                                <Button
                                    variant="secondary"
                                    type="button"
                                    size="icon"
                                    aria-label="Mark as correct"
                                    className={
                                        choice.is_correct
                                            ? "bg-green-500/10 text-green-900 dark:text-green-300 dark:bg-green-700/10 border border-green-700"
                                            : ""
                                    }
                                    onClick={() => handleMarkCorrect(index)}
                                >
                                    <Check size={16} />
                                </Button>

                                <Button
                                    size="icon"
                                    type="button"
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
