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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import TertiaryLabel from "../ui/TertiaryLabel";
import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { createAssessmentTest } from "@/lib/actions/assessment-test";

export const CreateTestModal = () => {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        startTransition(async () => {
            const result = await createAssessmentTest(formData);

            if (!result.success) {
                toast.error("Unable to create test.", {
                    description: result.error,
                });
                return;
            }

            setTimeout(() => {
                setOpen(false);
            }, 500);
            toast.success("Test created successfully.");
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isPending}>Create Test</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <TertiaryLabel>Create New Test</TertiaryLabel>
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>

                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <FormLabel>Title</FormLabel>
                        <Input
                            name="assessment-title"
                            required
                            placeholder="Assessment title"
                        />
                    </div>
                    <div className="mb-3">
                        <FormLabel>Description (Optional)</FormLabel>
                        <Textarea
                            name="assessment-description"
                            placeholder="Assessment description"
                        />
                    </div>
                    <div className="mb-6">
                        <FormLabel>Difficulty</FormLabel>
                        <Select name="assessment-difficulty" required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="moderate">
                                    Moderate
                                </SelectItem>
                                <SelectItem value="difficult">
                                    Difficult
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button disabled={isPending}>
                            {isPending && <Loader className="animate-spin" />}
                            Create Test
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
