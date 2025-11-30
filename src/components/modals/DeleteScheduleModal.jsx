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
import { Loader, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function DeleteScheduleModal({ scheduleId }) {
    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const router = useRouter();

    const handleDeleteSchedule = () => {
        startTransition(async () => {
            const supabase = createClient();

            const { error } = await supabase
                .from("schedules")
                .delete()
                .eq("id", scheduleId);

            if (error) {
                toast.error("Unable to delete schedule");
                return;
            }

            toast.success(
                "Schedule deleted successfully. Please wait a moment while we refresh the page."
            );
            setOpen(false);
            router.refresh();
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className="cursor-pointer w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-red-500/10 transition-colors rounded-sm">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Schedule</span>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure to delete this schedule?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Deleting a schedule will notify participants that it is
                        now cancelled.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        disabled={isPending}
                        variant="destructive"
                        onClick={handleDeleteSchedule}
                    >
                        {isPending ? (
                            <Loader className="animate-spin w-4 h-4" />
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                        {isPending ? "Deleting Schedule" : " Delete Schedule"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
