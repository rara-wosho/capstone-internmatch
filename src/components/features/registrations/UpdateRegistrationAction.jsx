"use client";

import { Button } from "@/components/ui/button";
import { updateRegistrationStatus } from "@/lib/actions/registration";
import { Check, Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function UpdateRegistrationAction({ registrationId, status }) {
    const [isPending, startTransition] = useTransition();

    const handleUpdateStatus = (newStatus) => {
        startTransition(async () => {
            const result = await updateRegistrationStatus(
                newStatus,
                registrationId
            );

            if (!result.success) {
                toast.error("Unable to update registration status", {
                    description: result.error,
                });
            }

            toast.success("Successfully updated the status.");
        });
    };
    return (
        <div className="ms-auto grid grid-cols-2 max-w-[250px] gap-2">
            <Button
                onClick={() => handleUpdateStatus("rejected")}
                disabled={isPending || status === "rejected"}
                size="sm"
                variant="destructive"
            >
                Reject
            </Button>
            <Button
                disabled={isPending || status === "accepted"}
                onClick={() => handleUpdateStatus("accepted")}
                variant="success"
                size="sm"
            >
                {isPending && <Loader className="animate-spin" />}
                {status === "accepted" ? "Accepted" : "Accept"}
            </Button>
        </div>
    );
}
