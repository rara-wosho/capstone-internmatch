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
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateAssessmentTest } from "@/lib/actions/assessment-test";
import { PenIcon } from "lucide-react";

export default function EditAssessmentModal({ assessment }) {
    if (!assessment) return null;

    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        startTransition(async () => {
            const formData = new FormData(e.target);

            const result = await updateAssessmentTest(assessment?.id, formData);

            if (!result.success) {
                toast.error("Failed to update assessment", {
                    description: result.error,
                });
                return;
            }

            toast.success("Assessment updated successfully!");
            setTimeout(() => {
                setOpen(false);
            }, 500);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={isPending}>
                    <PenIcon />
                    {isPending ? "Please wait..." : "Edit"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Assessment</DialogTitle>
                    <DialogDescription>
                        Modify the details of this assessment test.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <FormLabel>Assessment Title</FormLabel>
                        <Input
                            name="assessment_title"
                            defaultValue={assessment?.assessment_title}
                            placeholder="Assessment Title"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <FormLabel>Description/Instruction</FormLabel>
                        <Input
                            name="assessment_description"
                            defaultValue={assessment?.assessment_description}
                            placeholder="Enter description"
                        />
                    </div>
                    <div className="mb-3">
                        <FormLabel>Difficulty</FormLabel>
                        <Select
                            name="assessment_difficulty"
                            defaultValue={assessment?.assessment_difficulty}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Difficulty" />
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
                            <Button variant="ghost" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
