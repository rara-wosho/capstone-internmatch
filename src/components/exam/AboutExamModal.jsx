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
import { Edit, Loader } from "lucide-react";
import { toast } from "sonner";

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
                }, 600);
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
                        <DialogTitle className="py-1">
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
                                <p className="mb-1">Settings</p>

                                <div className="flex justify-between items-center w-full">
                                    <FormLabel>Publish</FormLabel>
                                    <Switch
                                        name="is_published"
                                        defaultChecked={exam?.is_published}
                                    />
                                </div>

                                <div className="flex justify-between items-center w-full">
                                    <FormLabel>Shuffle questions</FormLabel>
                                    <Switch
                                        name="shuffle_questions"
                                        defaultChecked={exam?.shuffle_questions}
                                    />
                                </div>

                                <div className="mt-1 w-full flex flex-col items-start">
                                    <FormLabel>Exam duration</FormLabel>
                                    <Select
                                        name="duration"
                                        defaultValue={exam?.duration}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Exam duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="30">
                                                30 minutes
                                            </SelectItem>
                                            <SelectItem value="60">
                                                1 hour
                                            </SelectItem>
                                            <SelectItem value="90">
                                                1 hour, 30 minutes
                                            </SelectItem>
                                            <SelectItem value="120">
                                                2 hours
                                            </SelectItem>
                                            <SelectItem value="150">
                                                2 hours, 30 minutes
                                            </SelectItem>
                                            <SelectItem value="180">
                                                3 hours
                                            </SelectItem>
                                            <SelectItem value="0">
                                                No time limit
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="w-full flex flex-col items-start">
                                    <FormLabel>Mode</FormLabel>
                                    <Select
                                        name="mode"
                                        defaultValue={exam?.mode || "classic"}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="classic">
                                                Classic
                                            </SelectItem>
                                            <SelectItem value="focus">
                                                Focus
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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
