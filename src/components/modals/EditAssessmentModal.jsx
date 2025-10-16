"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function EditAssessmentModal({ assessment }) {
    if (!assessment) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{assessment.assessment_title}</DialogTitle>
                    <DialogDescription>
                        {assessment?.assessment_description}
                    </DialogDescription>
                </DialogHeader>
                .
            </DialogContent>
        </Dialog>
    );
}
