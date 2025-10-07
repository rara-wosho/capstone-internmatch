"use client";

import { Button } from "@/components/ui/button";
import { updateRegistrationStatus } from "@/lib/actions/registration";
import { Loader, X } from "lucide-react";
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

                return;
            }

            toast.success("Successfully updated the status.");
        });
    };

    return (
        <div className="flex items-center gap-2 justify-end">
            {status !== "accepted" && (
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-destructive disabled:opacity-30"
                    onClick={() => handleUpdateStatus("rejected")}
                    disabled={isPending || status === "rejected"}
                >
                    {status === "rejected" ? "Rejected" : "Reject"}
                </Button>
            )}
            {status !== "rejected" && (
                <Button
                    variant="successOutline"
                    size="sm"
                    className="disabled:opacity-30"
                    disabled={isPending || status === "accepted"}
                    onClick={() => handleUpdateStatus("accepted")}
                >
                    {isPending && <Loader className="animate-spin" />}

                    {status === "accepted" ? "Accepted" : "Accept"}
                </Button>
            )}
        </div>
    );
}
