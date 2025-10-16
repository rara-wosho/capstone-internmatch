"use client";

import AlertModal from "@/components/ui/AlertModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    deleteAssessmentQuestion,
    updateAssessmentQuestion,
} from "@/lib/actions/assessment-test";
import { Check, Loader, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function AssessmentQuestionCard({ question }) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [isEditing, setIsEditing] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState(
        question.assessment_question_text
    );
    const [editedChoices, setEditedChoices] = useState(
        question.assessment_choices || []
    );

    const toggleIsEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleDeleteQuestion = async () => {
        const result = await deleteAssessmentQuestion(question.id);

        if (!result.success) {
            toast.error("Unable to delete question.", {
                description: result.error,
            });
            return;
        }

        toast.success("Question deleted successfully.");
        router.refresh();
    };

    const handleChoiceChange = (id, value) => {
        setEditedChoices((prev) =>
            prev.map((choice) =>
                choice.id === id
                    ? { ...choice, assessment_choice_text: value }
                    : choice
            )
        );
    };

    const handleToggleCorrectChoice = (id) => {
        setEditedChoices((prev) =>
            prev.map((choice) => ({
                ...choice,
                is_correct: choice.id === id,
            }))
        );
    };

    const handleSaveChanges = () => {
        startTransition(async () => {
            const result = await updateAssessmentQuestion({
                id: question.id,
                question_text: editedQuestion,
                choices: editedChoices,
            });

            if (!result.success) {
                toast.error("Unable to save changes.", {
                    description: result.error,
                });
                return;
            }

            toast.success("Question updated successfully.");
            setIsEditing(false);
            router.refresh();
        });
    };

    return (
        <div className="py-4 md:py-5 border-t">
            {!isEditing ? (
                <div className="flex items-start sm:flex-row flex-col sm:justify-between gap-3">
                    <div>
                        <p className="font-medium mb-1">
                            {question.assessment_question_text}
                        </p>
                        <div className="text-muted-foreground text-sm mb-2">
                            Answer:{" "}
                            <span className="text-accent-foreground">
                                {
                                    question.assessment_choices.find(
                                        (c) => c.is_correct
                                    )?.assessment_choice_text
                                }
                            </span>
                        </div>
                        <ul className="text-sm text-muted-foreground list-disc pl-5">
                            {question.assessment_choices.map((c) => (
                                <li key={c.id}>{c.assessment_choice_text}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-2">
                        <AlertModal
                            alertAction={handleDeleteQuestion}
                            alertTitle="Delete question?"
                            alertMessage="This action cannot be undone and will delete this question permanently."
                            cancelLabel="Cancel"
                            actionLabel="Delete Question"
                        >
                            <Button
                                variant="outline"
                                className="text-destructive"
                                size="smallIcon"
                            >
                                <Trash />
                            </Button>
                        </AlertModal>
                        <Button
                            onClick={toggleIsEditing}
                            variant="outline"
                            size="smallIcon"
                        >
                            <Pen />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-2.5">
                    {/* Question input */}
                    <Textarea
                        placeholder="Enter question here"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                    />

                    {/* Choices */}
                    {editedChoices.map((c, index) => (
                        <div key={c.id} className="flex items-center gap-2">
                            <Input
                                placeholder={`Choice ${index + 1}`}
                                value={c.assessment_choice_text}
                                onChange={(e) =>
                                    handleChoiceChange(c.id, e.target.value)
                                }
                            />
                            <Button
                                onClick={() => handleToggleCorrectChoice(c.id)}
                                variant={
                                    c.is_correct ? "successOutline" : "outline"
                                }
                                size="icon"
                                title="Mark as correct"
                            >
                                <Check
                                    className={
                                        c.is_correct
                                            ? "text-white"
                                            : "text-muted-foreground"
                                    }
                                />
                            </Button>
                        </div>
                    ))}

                    {/* Actions */}
                    <div className="flex items-center gap-2 justify-end mt-4">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={toggleIsEditing}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isPending}
                            size="sm"
                            onClick={handleSaveChanges}
                        >
                            {isPending && <Loader className="animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
