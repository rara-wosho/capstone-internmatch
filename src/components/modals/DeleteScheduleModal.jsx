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

import { createClient } from "@/lib/supabase/client";
import { Loader, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function DeleteScheduleModal({
    scheduleTitle,
    students,
    scheduleId,
}) {
    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const router = useRouter();

    const handleCancelSchedule = () => {
        const notificationData = students?.map((s) => ({
            title: "Schedule Update",
            message: `The schedule "${scheduleTitle}" has been cancelled by the company and is no longer scheduled to happen.`,
            link_url: "/student/schedules",
            type: "cancelled_schedule",
            recipient_id: s.id,
        }));

        startTransition(async () => {
            const supabase = createClient();

            const { error } = await supabase
                .from("schedules")
                .update({ status: "cancelled" })
                .eq("id", scheduleId);

            if (error) {
                toast.error("Unable to cancel schedule");
                return;
            }

            // Notify student that the schedule is no longer happening
            await supabase.from("notifications").insert(notificationData);

            toast.success(
                "Schedule cancelled successfully. Please wait a moment while we refresh the page."
            );
            setOpen(false);
            router.refresh();
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className="cursor-pointer w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-red-500/10 transition-colors rounded-sm">
                    <X size={16} />
                    <span>Cancel Schedule</span>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Confirm Schedule Cancellation
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        If cancelled, we will notify participants that this
                        schedule will no longer take place.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <Button
                        disabled={isPending}
                        variant="destructive"
                        onClick={handleCancelSchedule}
                    >
                        {isPending ? (
                            <Loader className="animate-spin w-4 h-4" />
                        ) : (
                            <X className="w-4 h-4" />
                        )}
                        {isPending ? "Canceling Schedule" : " Cancel Schedule"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
