"use client";

import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import TitleText from "../ui/TitleText";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useActionState, useEffect, useRef } from "react";
import { createSchedule } from "@/lib/actions/schedule";
import { toast } from "sonner";

export default function CreateScheduleForm({ type, studentId, studentEmail }) {
    const [state, formAction, isPending] = useActionState(createSchedule, null);
    const formRef = useRef(null);

    useEffect(() => {
        if (state?.success) {
            toast.success("Schedule created successfully!");
            formRef.current?.reset(); // Reset form on success
        } else if (state?.error) {
            toast.error(state.error);
        }
    }, [state?.time]); // Use time to trigger effect on each submission

    return (
        <Form action={formAction} className="space-y-4" ref={formRef}>
            {/* Hidden inputs for type and studentId */}
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="student_id" value={studentId} />
            <input type="hidden" name="student_email" value={studentEmail} />

            <div className="mb-3">
                <TitleText>
                    {type === "orientation"
                        ? "Create an orientation schedule"
                        : "Create an interview schedule"}
                </TitleText>
            </div>

            <div className="space-y-3">
                {/* Title */}
                <div>
                    <FormLabel>Title</FormLabel>
                    <Input
                        name="title"
                        placeholder="Schedule title"
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
                        placeholder="Provide details about this schedule"
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
                        placeholder="Any additional information..."
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

                {/* Time (Optional Addition) */}
                <div>
                    <FormLabel>Time (Optional)</FormLabel>
                    <Input
                        name="time"
                        type="time"
                        defaultValue={state?.formData?.time}
                        disabled={isPending}
                    />
                </div>

                {/* Location */}
                <div>
                    <FormLabel>Location</FormLabel>
                    <Input
                        name="location"
                        placeholder="Physical address or online meeting link"
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

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Creating..." : "Create Schedule"}
            </Button>
        </Form>
    );
}
