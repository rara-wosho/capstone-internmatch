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
import { Edit, Calendar, Clock, MapPin, FileText, Loader } from "lucide-react";
import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { updateSchedule } from "@/lib/actions/schedule";
import { toast } from "sonner";

export default function EditScheduleModal({ editData }) {
    const [open, setOpen] = useState(false);

    // Format date for input field (YYYY-MM-DD)
    const formattedDate = editData?.date
        ? new Date(editData.date).toISOString().split("T")[0]
        : "";

    const [state, formAction, isPending] = useActionState(updateSchedule, null);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
            toast.success("Schedule updated successfully!");
            // Dialog will close automatically if you're using the form action
        } else if (state?.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="cursor-pointer w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Edit className="size-4" />
                    Edit Schedule Details
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Edit Schedule Details
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Update the schedule information for your applicants.
                    </DialogDescription>
                </DialogHeader>

                <Form action={formAction} className="space-y-4">
                    {/* Hidden field for schedule ID */}
                    <input
                        type="hidden"
                        name="schedule_id"
                        value={editData?.schedule_id}
                    />

                    {/* Schedule Type */}
                    <div>
                        <FormLabel className="flex items-center gap-2">
                            <FileText className="size-4" />
                            Schedule Type
                        </FormLabel>
                        <Select name="type" defaultValue={editData?.type}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select schedule type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="interview">
                                    Interview
                                </SelectItem>
                                <SelectItem value="orientation">
                                    Orientation
                                </SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="training">
                                    Training
                                </SelectItem>
                                <SelectItem value="assessment">
                                    Assessment
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Schedule Name */}
                    <div>
                        <FormLabel>Schedule Name</FormLabel>
                        <Input
                            name="title"
                            required
                            defaultValue={editData?.title}
                            placeholder="e.g., Final Interview for Interns"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <FormLabel>Details</FormLabel>
                        <Textarea
                            required
                            name="details"
                            defaultValue={editData?.details}
                            placeholder="Provide detailed information about this schedule..."
                            className="min-h-[100px]"
                        />
                    </div>

                    {/* Date and Time Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Date */}
                        <div>
                            <FormLabel className="flex items-center gap-2">
                                <Calendar className="size-4" />
                                Date
                            </FormLabel>
                            <Input
                                required
                                name="date"
                                type="date"
                                defaultValue={formattedDate}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <FormLabel className="flex items-center gap-2">
                                <Clock className="size-4" />
                                Time
                            </FormLabel>
                            <Input
                                name="time"
                                required
                                type="time"
                                defaultValue={editData?.time}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <FormLabel className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            Location
                        </FormLabel>
                        <Input
                            name="location"
                            required
                            defaultValue={editData?.location}
                            placeholder="Physical address or online meeting link"
                        />
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <Textarea
                            name="additional_notes"
                            defaultValue={editData?.additional_notes}
                            placeholder="Any additional information or instructions..."
                            className="min-h-[80px]"
                        />
                    </div>

                    {/* Students Information (Read-only) */}
                    {editData?.students && editData.students.length > 0 && (
                        <div className="border rounded-lg p-4 bg-muted/20">
                            <FormLabel className="text-sm font-medium mb-3">
                                Associated Students ({editData.students.length})
                            </FormLabel>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {editData.students.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between text-sm py-2 px-3 bg-background rounded border"
                                    >
                                        <span>
                                            {student.firstname}{" "}
                                            {student.lastname}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                            {student.school}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Students cannot be modified in this view. Create
                                a new schedule to add or remove students.
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}

                    <DialogFooter className="">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} type="submit">
                            {isPending && <Loader className="animate-spin" />}
                            Update Schedule
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
