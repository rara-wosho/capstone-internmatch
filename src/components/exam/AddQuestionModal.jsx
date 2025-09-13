"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FileText, PlusCircle, X, Check, Plus, Shuffle } from "lucide-react";
import TertiaryLabel from "../ui/TertiaryLabel";
import IconWrapper from "../ui/IconWrapper";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { addQuestionAndChoices } from "@/lib/actions/question";
import SubmitButton from "../ui/SubmitButton";

const DEFAULT_CHOICES = [
    { text: "", isCorrect: true },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
];

export default function AddQuestionModal({ examId }) {
    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState(DEFAULT_CHOICES);
    const [shuffleChoices, setShuffleChoices] = useState(false);
    const [open, setOpen] = useState(false);

    const resetForm = useCallback(() => {
        setQuestion("");
        setChoices(DEFAULT_CHOICES);
        setShuffleChoices(false);
    }, []);

    const handleAddChoice = useCallback(() => {
        setChoices((prev) => [...prev, { text: "", isCorrect: false }]);
    }, []);

    const handleChoiceChange = useCallback((index, field, value) => {
        setChoices((prev) =>
            prev.map((choice, i) =>
                i === index ? { ...choice, [field]: value } : choice
            )
        );
    }, []);

    const handleMarkCorrect = useCallback((index) => {
        setChoices((prev) =>
            prev.map((choice, i) => ({ ...choice, isCorrect: i === index }))
        );
    }, []);

    const handleDeleteChoice = useCallback((index, isCorrect) => {
        if (isCorrect) {
            toast.warning("You cannot delete the correct answer.");
            return;
        }
        setChoices((prev) => {
            if (prev.length <= 2) {
                toast.warning("Questions must have at least two choices.");
                return prev;
            }
            return prev.filter((_, i) => i !== index);
        });
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            if (!question.trim()) {
                toast.error("Please enter a question.");
                return;
            }
            if (choices.some((c) => !c.text.trim())) {
                toast.error("All choices must have text.");
                return;
            }
            if (!choices.some((c) => c.isCorrect)) {
                toast.error("Please mark one choice as correct.");
                return;
            }

            const result = await addQuestionAndChoices(
                {
                    question: question.trim(),
                    choices: choices.map((c) => ({
                        text: c.text.trim(),
                        isCorrect: c.isCorrect,
                    })),
                },
                examId
            );

            if (!result.success) {
                toast.error("Unable to add question.");
                return;
            }

            toast.success("Question added!");
            resetForm();
            setTimeout(() => {
                setOpen(false);
            }, 600);
        },
        [question, choices, examId, resetForm]
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button asChild className="sm:grow-0 grow">
                <DialogTrigger>
                    <PlusCircle /> Add question
                </DialogTrigger>
            </Button>

            <DialogContent className="md:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        <TertiaryLabel className="space-x-2">
                            <IconWrapper>
                                <FileText size={16} />
                            </IconWrapper>
                            <p>New Question</p>
                        </TertiaryLabel>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <ScrollArea className="h-[65svh]">
                        <div className="flex flex-col gap-3 mb-6">
                            <div>
                                <FormLabel className="mb-2">Question</FormLabel>
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

                            <div>
                                <div className="flex items-center justify-between mb-4 mt-3">
                                    <FormLabel>Choices</FormLabel>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShuffleChoices((s) => !s)
                                        }
                                        className={`mb-1 flex items-center gap-1 text-muted-foreground/50 ${
                                            shuffleChoices ? "text-primary" : ""
                                        }`}
                                    >
                                        <Shuffle size={22} />
                                    </button>
                                </div>

                                <div className="space-y-3">
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
                                                size="icon"
                                                type="button"
                                                className={
                                                    choice.isCorrect
                                                        ? "bg-green-500/10 text-green-900 dark:text-green-300 dark:bg-green-700/10 border border-green-700"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleMarkCorrect(index)
                                                }
                                                aria-label="Mark as correct"
                                            >
                                                <Check size={16} />
                                            </Button>

                                            <Button
                                                size="icon"
                                                type="button"
                                                variant="dangerOutline"
                                                aria-label="Delete choice"
                                                onClick={() =>
                                                    handleDeleteChoice(
                                                        index,
                                                        choice.isCorrect
                                                    )
                                                }
                                            >
                                                <X size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleAddChoice}
                                    className="mt-3 flex items-center gap-1 text-sm text-accent-foreground"
                                >
                                    <Plus size={14} className="mr-1" /> Add
                                    choice
                                </button>
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter className="gap-2 pt-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={resetForm}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <SubmitButton>Save question</SubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
