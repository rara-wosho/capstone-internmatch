"use client";

import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useActionState, useEffect, useRef } from "react";
import { createSchedule } from "@/lib/actions/schedule";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function CreateScheduleForm({ selectedApplicants }) {
    const [state, formAction, isPending] = useActionState(createSchedule, null);
    const formRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            toast.success("Schedule created successfully");
            formRef.current?.reset();
            setTimeout(() => {
                router.replace("/company/schedules");
            }, 100);
        } else if (state?.error) {
            toast.error(state.error);
        }
    }, [state?.time]);

    // Get selected student IDs for the hidden input
    const selectedStudentIds =
        selectedApplicants?.map((applicant) => applicant?.id).join(",") || "";

    return (
        <>
            <Form action={formAction} className="space-y-4" ref={formRef}>
                {/* Hidden input for multiple student IDs */}
                <input
                    type="hidden"
                    name="student_ids"
                    value={selectedStudentIds}
                />

                <div className="space-y-3">
                    {/* Schedule Type */}
                    <div>
                        <FormLabel>Schedule Type</FormLabel>
                        <Select name="type" required>
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
                        {state?.errors?.type && (
                            <p className="text-red-500 text-sm mt-1">
                                {state.errors.type}
                            </p>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <FormLabel>Schedule Name</FormLabel>
                        <Input
                            name="title"
                            placeholder="e.g., Final Orientation for Interns"
                            required
                            defaultValue={state?.formData?.title}
                            disabled={isPending}
                        />
                        {state?.errors?.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {state.errors.title}
                            </p>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <FormLabel>Details</FormLabel>
                        <Textarea
                            name="details"
                            placeholder={`Provide details about this schedule for ${selectedApplicants.length} student${selectedApplicants.length !== 1 ? "s" : ""}...`}
                            className="w-full min-h-[120px] border rounded-md p-2 text-sm"
                            required
                            defaultValue={state?.formData?.details}
                            disabled={isPending}
                        />
                        {state?.errors?.details && (
                            <p className="text-red-500 text-sm mt-1">
                                {state.errors.details}
                            </p>
                        )}
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <Textarea
                            name="notes"
                            placeholder="Any additional information or instructions..."
                            className="w-full min-h-[100px] border rounded-md p-2 text-sm"
                            defaultValue={state?.formData?.notes}
                            disabled={isPending}
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <FormLabel>Date</FormLabel>
                        <Input
                            name="date"
                            type="date"
                            required
                            defaultValue={state?.formData?.date}
                            disabled={isPending}
                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                        />
                        {state?.errors?.date && (
                            <p className="text-red-500 text-sm mt-1">
                                {state.errors.date}
                            </p>
                        )}
                    </div>

                    {/* Time */}
                    <div>
                        <FormLabel>Time</FormLabel>
                        <Input
                            name="time"
                            type="time"
                            required
                            defaultValue={state?.formData?.time}
                            disabled={isPending}
                        />
                        {state?.errors?.time && (
                            <p className="text-red-500 text-sm mt-1">
                                {state.errors.time}
                            </p>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <FormLabel>Location</FormLabel>
                        <Input
                            name="location"
                            placeholder="Physical address, online meeting link, or conference room"
                            required
                            defaultValue={state?.formData?.location}
                            disabled={isPending}
                        />
                        {state?.errors?.location && (
                            <p className="text-red-500 text-sm mt-1">
                                {state.errors.location}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isPending || selectedApplicants.length === 0}
                    className="w-full"
                >
                    {isPending ? (
                        <>
                            Creating Schedule
                            {selectedApplicants.length > 1 ? "s" : ""}...
                        </>
                    ) : (
                        <>
                            Create Schedule for {selectedApplicants.length}{" "}
                            Student{selectedApplicants.length !== 1 ? "s" : ""}
                        </>
                    )}
                </Button>

                {selectedApplicants.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                        Please select at least one student to create a schedule.
                    </p>
                )}
            </Form>
        </>
    );
}
