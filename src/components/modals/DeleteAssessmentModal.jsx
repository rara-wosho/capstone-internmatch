"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useTransition } from "react";
import { deleteAssessmentTest } from "@/lib/actions/assessment-test";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { CirclePlus, Loader, Trash } from "lucide-react";

export default function DeleteAssessmentModal({ assessmentId }) {
    const [isPending, startTransition] = useTransition();

    const handleDeleteAssessment = () => {
        startTransition(async () => {
            const result = await deleteAssessmentTest(assessmentId);

            if (!result.success) {
                toast.error("Failed to delete assessment", {
                    description: result.error,
                });
                return;
            }

            // if success, server action will redirect to assessment test page
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    disabled={isPending}
                    className="hover:text-destructive"
                >
                    {isPending ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <Trash />
                    )}
                    {isPending ? "Deleting" : "Delete"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this assessment test and all its associated data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteAssessment}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Yes, Delete now"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
