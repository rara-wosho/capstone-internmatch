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
import TertiaryLabel from "../ui/TertiaryLabel";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { ScrollArea } from "../ui/scroll-area";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { updateExamDetails } from "@/lib/actions/exam";
import { useState, useTransition } from "react";
import { Edit, FileText, Info, Loader } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import IconWrapper from "../ui/IconWrapper";

export default function AboutExamModal({ exam }) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await updateExamDetails(formData);
            if (result?.success) {
                toast.success("Exam details updated");
                setTimeout(() => {
                    setOpen(false);
                }, 800);
            } else {
                toast.error(result?.error || "Failed to update exam");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="primaryOutline" size="sm">
                    <Edit /> Edit exam
                </Button>
            </DialogTrigger>

            <DialogContent className="p-3 sm:p-5 sm:max-w-2xl">
                <DialogHeader>
                    <div className="border-b pb-3">
                        <DialogTitle className="py-1 flex items-center gap-2">
                            <IconWrapper>
                                <FileText size={17} />
                            </IconWrapper>
                            <TertiaryLabel>Edit exam</TertiaryLabel>
                        </DialogTitle>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <ScrollArea className="h-[65svh]">
                            <input
                                type="hidden"
                                name="examId"
                                value={exam?.id}
                            />

                            <div className="flex flex-col gap-y-3.5 mb-6">
                                <div className="flex flex-col items-start">
                                    <FormLabel className="text-left">
                                        Title
                                    </FormLabel>
                                    <Input
                                        name="title"
                                        defaultValue={exam?.title}
                                        placeholder="Enter exam title"
                                    />
                                </div>

                                <div className="flex flex-col items-start">
                                    <FormLabel className="text-left">
                                        Description
                                    </FormLabel>
                                    <Input
                                        name="description"
                                        defaultValue={exam?.description}
                                        placeholder="Enter description"
                                    />
                                </div>

                                <div className="flex flex-col items-start">
                                    <FormLabel className="text-left">
                                        Instruction
                                    </FormLabel>
                                    <Input
                                        name="instruction"
                                        defaultValue={exam?.instruction}
                                        placeholder="Enter instruction"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col mb-6 gap-y-2 items-start">
                                <p className="mb-1 text-sm font-bold tracking-wider text-muted-foreground">
                                    Settings
                                </p>

                                <div className="flex justify-between items-center w-full">
                                    <FormLabel>
                                        <label htmlFor="publish">Publish</label>
                                    </FormLabel>
                                    <Switch
                                        id="publish"
                                        className="mb-1"
                                        name="is_published"
                                        defaultChecked={exam?.is_published}
                                    />
                                </div>

                                <div className="flex justify-between items-center w-full">
                                    <FormLabel>
                                        <label htmlFor="shuffle">
                                            Shuffle questions
                                        </label>
                                    </FormLabel>
                                    <Switch
                                        className="mb-1"
                                        id="shuffle"
                                        name="shuffle_questions"
                                        defaultChecked={exam?.shuffle_questions}
                                    />
                                </div>

                                <div className=" mt-3 flex flex-col items-start w-full">
                                    <FormLabel className="text-left">
                                        Exam Duration (minutes)
                                    </FormLabel>
                                    <Input
                                        name="duration"
                                        type="number"
                                        placeholder="Enter exam duration"
                                        defaultValue={exam?.duration}
                                    />
                                </div>
                            </div>
                        </ScrollArea>

                        <DialogFooter className="pt-2.5">
                            <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending && (
                                    <Loader className="animate-spin" />
                                )}
                                {isPending ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
