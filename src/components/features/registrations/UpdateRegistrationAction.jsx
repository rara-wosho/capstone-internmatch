"use client";

import { Button } from "@/components/ui/button";
import {
    acceptRegistration,
    rejectRegistration,
} from "@/lib/actions/registration";
import { Loader, X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function UpdateRegistrationAction({ registrant }) {
    const [isPending, startTransition] = useTransition();

    const handleAcceptRegistration = () => {
        startTransition(async () => {
            const result = await acceptRegistration({
                firstname: registrant.firstname,
                lastname: registrant.lastname,
                email: registrant.email,
                school: registrant.school,
                barangay: registrant.barangay,
                city: registrant.city,
                province: registrant.province,
                id: registrant.id,
            });

            if (!result.success) {
                toast.error("Unable to accept registration", {
                    description: result.error,
                });
                return;
            }

            toast.success("Successfully accepted the registration.");
        });
    };
    const handleRejectRegistration = () => {
        startTransition(async () => {
            const result = await rejectRegistration(registrant.id);

            if (!result.success) {
                toast.error("Unable to reject registration", {
                    description: result.error,
                });
                return;
            }
            toast.success("Successfully rejected the registration.");
        });
    };

    return (
        <div className="flex items-center gap-2 justify-end">
            {registrant?.status !== "accepted" && (
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-destructive disabled:opacity-30"
                    onClick={handleRejectRegistration}
                    disabled={isPending || registrant?.status === "rejected"}
                >
                    {registrant?.status === "rejected" ? "Rejected" : "Reject"}
                </Button>
            )}
            {registrant?.status !== "rejected" && (
                <Button
                    variant="successOutline"
                    size="sm"
                    className="disabled:opacity-30"
                    disabled={isPending || registrant?.status === "accepted"}
                    onClick={handleAcceptRegistration}
                >
                    {isPending && <Loader className="animate-spin" />}

                    {registrant?.status === "accepted" ? "Accepted" : "Accept"}
                </Button>
            )}
        </div>
    );
}
