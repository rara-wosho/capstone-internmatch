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
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteExam } from "@/lib/actions/exam";
import { Trash } from "lucide-react";

export default function DeleteExamModal({ examId, type = "button" }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = () => {
        startTransition(async () => {
            const { success, error } = await deleteExam(examId);

            if (!success) {
                toast.error(error ?? "Unable to delete exam.");
                return;
            }

            toast.success("Exam deleted successfully.");
            setOpen(false);
            router.push("/company/manage-exam");
            router.refresh();
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild className="w-full">
                {type === "button" ? (
                    <Button variant="destructive" type="button">
                        <Trash /> Delete exam
                    </Button>
                ) : (
                    <button
                        type="button"
                        className="text-destructive cursor-pointer"
                    >
                        <Trash size={16} />
                    </button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Exam?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deleting this exam will remove all its questions and
                        examinee data. If you only want to hide it, consider
                        unpublishing instead.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Yes, Delete exam"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
