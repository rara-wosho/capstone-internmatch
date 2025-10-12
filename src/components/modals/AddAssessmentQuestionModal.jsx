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
import { useCallback, useState, useTransition, useRef } from "react";
import { Input } from "../ui/input";
import FormLabel from "../ui/FormLabel";
import { Check, Loader } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { addAssessmentQuestion } from "@/lib/actions/assessment-test";
import { toast } from "sonner";

const INITIAL_CHOICES = [
    { choiceText: "", isCorrect: true },
    { choiceText: "", isCorrect: false },
    { choiceText: "", isCorrect: false },
    { choiceText: "", isCorrect: false },
];

export default function AddAssessmentQuestionModal({ assessmentId }) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const closeButtonRef = useRef(null);

    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState(INITIAL_CHOICES);

    const resetForm = useCallback(() => {
        setQuestion("");
        setChoices(INITIAL_CHOICES);
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            // Client-side validation
            const hasCorrectAnswer = choices.some((c) => c.isCorrect);
            if (!hasCorrectAnswer) {
                toast.error("At least one choice must be marked as correct.");
                return;
            }

            const hasEmptyChoice = choices.some((c) => !c.choiceText.trim());
            if (!question.trim() || hasEmptyChoice) {
                toast.warning("All fields are required.");
                return;
            }

            startTransition(async () => {
                const result = await addAssessmentQuestion(
                    assessmentId,
                    question,
                    choices
                );

                if (!result.success) {
                    toast.error(result.error);
                    return;
                }

                toast.success("Added question successfully.");
                resetForm();

                setTimeout(() => {
                    setOpen(false);
                }, 600);
            });
        },
        [assessmentId, question, choices, resetForm]
    );

    const handleChoiceChange = useCallback((index, value) => {
        setChoices((prev) =>
            prev.map((c, i) => (i === index ? { ...c, choiceText: value } : c))
        );
    }, []);

    const handleMarkCorrect = useCallback((index) => {
        setChoices((prev) =>
            prev.map((c, i) =>
                index === i
                    ? { ...c, isCorrect: true }
                    : { ...c, isCorrect: false }
            )
        );
    }, []);

    const handleOpenChange = useCallback(
        (newOpen) => {
            setOpen(newOpen);
            if (!newOpen) {
                resetForm();
            }
        },
        [resetForm]
    );

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className="grow sm:grow-0" asChild>
                <Button>Add Question</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Question</DialogTitle>
                    <DialogDescription className="sr-only">
                        Add a new assessment question with multiple choice
                        answers
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <FormLabel>Question</FormLabel>
                        <Textarea
                            required
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="What is a software?"
                            disabled={isPending}
                        />
                    </div>

                    <div className="mb-5">
                        {choices.map((choice, index) => (
                            <div
                                key={index}
                                className="mb-2 flex items-center gap-2"
                            >
                                <Input
                                    required
                                    value={choice.choiceText}
                                    onChange={(e) =>
                                        handleChoiceChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Choice ${index + 1}`}
                                    disabled={isPending}
                                />
                                <Button
                                    type="button"
                                    variant={
                                        choice.isCorrect
                                            ? "successOutline"
                                            : "outline"
                                    }
                                    onClick={() => handleMarkCorrect(index)}
                                    disabled={isPending}
                                    aria-label={`Mark choice ${index + 1} as correct`}
                                >
                                    <Check />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={isPending}
                                ref={closeButtonRef}
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button disabled={isPending} type="submit">
                            {isPending && <Loader className="animate-spin" />}
                            {isPending ? "Adding..." : "Add Question"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
