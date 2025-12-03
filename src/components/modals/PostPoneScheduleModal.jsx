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
import { Input } from "@/components/ui/input";

import { createClient } from "@/lib/supabase/client";
import {
    CalendarArrowDown,
    Loader,
    CalendarClock,
    Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import FormLabel from "../ui/FormLabel";
import { dateFormatter } from "@/utils/date-formatter";

export default function PostponeScheduleModal({ schedule, students }) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [rescheduleDate, setRescheduleDate] = useState(schedule.date);
    const [newTime, setNewTime] = useState(schedule.time);
    const router = useRouter();

    const handlePostponeSchedule = () => {
        const notificationData = students?.map((s) => ({
            title: "Reschedule Details",
            message: rescheduleDate
                ? `The schedule "${schedule.title}" has been rescheduled. New date: ${dateFormatter(rescheduleDate)}.`
                : `The schedule "${schedule.title}" has been postponed by the company. We will notify you once it's rescheduled.`,
            link_url: "/student/schedules",
            type: "reschedule",
            recipient_id: s.id,
        }));

        startTransition(async () => {
            const supabase = createClient();

            if (!rescheduleDate || !newTime) {
                toast.error("New date and time is required.");
                return;
            }

            let updateData = {
                status: "rescheduled",
                date: rescheduleDate,
                time: newTime,
            };

            // If reschedule date is provided, store it
            // if (rescheduleDate && newTime) {
            //     updateData.postpone_date = rescheduleDate;
            //     updateData.time = newTime;
            // }

            const { error } = await supabase
                .from("schedules")
                .update(updateData)
                .eq("id", schedule.schedule_id);

            if (error) {
                console.log("error", error.message);
                toast.error("Unable to postpone schedule");
                return;
            }

            // // Notify students
            if (notificationData && notificationData.length > 0) {
                await supabase.from("notifications").insert(notificationData);
            }

            toast.success(
                rescheduleDate
                    ? `New schedule date and time are set successfully.`
                    : `Schedule postponed. Students have been notified.`
            );
            setOpen(false);
            setRescheduleDate(""); // Reset date
            router.refresh();
        });
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(open) => {
                setOpen(open);
                if (!open) setRescheduleDate(""); // Reset when closing
            }}
        >
            <AlertDialogTrigger asChild>
                <button className="cursor-pointer w-full flex items-center gap-2 px-4 py-2.5 text-sm text-amber-600 hover:bg-amber-50 hover:dark:bg-amber-500/5 transition-colors rounded-sm">
                    <CalendarClock className="w-4 h-4" />
                    <span>Reschedule</span>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
                        <CalendarClock className="w-5 h-5" />
                        Set a new date and time
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <span>
                            Rescheduling <strong>"{schedule.title}"</strong>
                        </span>
                    </AlertDialogDescription>
                    {/* Optional Reschedule Date */}
                    <div className="space-y-2 my-2">
                        <div>
                            <FormLabel
                                htmlFor="reschedule-date"
                                className="text-sm font-medium"
                            >
                                New Date (Optional)
                            </FormLabel>
                            <Input
                                id="reschedule-date"
                                type="date"
                                value={rescheduleDate.split("T")[0]}
                                onChange={(e) =>
                                    setRescheduleDate(e.target.value)
                                }
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <FormLabel>New Time</FormLabel>
                            <Input
                                value={newTime}
                                onChange={(e) => setNewTime(e.target.value)}
                                type="time"
                            />
                        </div>
                    </div>

                    {students && students.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                            This will notify <strong>{students.length}</strong>{" "}
                            participant
                            {students.length !== 1 ? "s" : ""} about the
                            postponement.
                        </p>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        disabled={isPending}
                        onClick={handlePostponeSchedule}
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <CalendarArrowDown />
                        )}
                        {isPending ? "Please wait" : "Save New Schedule"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
