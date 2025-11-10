"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { allowExamAccess, revokeExamAccess } from "@/lib/actions/student";
import { Loader } from "lucide-react";

export default function ChangeExamAccessModal({ currentAccess, studentId }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleAllowAccess = () => {
        startTransition(async () => {
            const { success } = await allowExamAccess([studentId]);

            if (!success) {
                toast.error("Unable to grant them exam access.");
                return;
            }

            toast.success("Exam access granted successfully.");
            setOpen(false);
            router.refresh();
        });
    };
    const handleRevokeExamAccess = () => {
        startTransition(async () => {
            const { success } = await revokeExamAccess([studentId]);

            if (!success) {
                toast.error("Unable to grant them exam access.");
                return;
            }

            toast.success("Exam access granted successfully.");
            setOpen(false);
            router.refresh();
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="text-accent-foreground">
                Change
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Exam Access</DialogTitle>
                    <DialogDescription className="sr-only">
                        ..
                    </DialogDescription>
                </DialogHeader>

                <p>
                    {currentAccess
                        ? "Student currently has access to exams."
                        : "Exam access is currently disabled."}
                </p>
                {currentAccess ? (
                    <Button
                        disabled={isPending}
                        onClick={handleRevokeExamAccess}
                        variant="destructive"
                    >
                        {isPending && <Loader className="animate-spin" />}
                        Revoke Access
                    </Button>
                ) : (
                    <Button
                        disabled={isPending}
                        onClick={handleAllowAccess}
                        variant="success"
                    >
                        {isPending && <Loader className="animate-spin" />}
                        Grant Access
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
}
