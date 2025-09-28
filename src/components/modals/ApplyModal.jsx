"use client";

import { useSession } from "@/context/SessionContext";
import { checkStudentEligibility } from "@/lib/actions/company";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ErrorUi from "../ui/ErrorUi";
import { Button } from "../ui/button";

export default function ApplyModal({ companyId, accept_applicants, term }) {
    const { userData } = useSession();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEligible, setIsEligible] = useState(false);

    if (!userData) {
        return (
            <ErrorUi secondaryMessage="You need to be logged in to apply." />
        );
    }

    const checkEligibility = async () => {
        setLoading(true);
        const { eligible, error, message } = await checkStudentEligibility(
            companyId,
            userData.id
        );

        if (error) {
            console.log("error: ", error);
        }
        if (message) {
            console.log("message ", message);
        }

        setIsEligible(eligible);

        console.log("eligibility", eligible);
        console.log("accept applicants", accept_applicants);
        console.log("term ", term);

        setLoading(false);
    };

    useEffect(() => {
        if (open) {
            checkEligibility();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="w-full">
                <Button>Apply</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply for Internship</DialogTitle>
                    <DialogDescription className="sr-only">
                        You’re about to apply for an internship.
                    </DialogDescription>
                </DialogHeader>

                <div className="body">
                    {loading ? (
                        <div>Checking status</div>
                    ) : (
                        <div className="flex flex-col">
                            <h1>
                                {isEligible ? "Congratulations!" : "Uh oh..."}
                            </h1>
                            <p>
                                {isEligible
                                    ? "You are eligible to apply for this company."
                                    : "You are not eligible to apply for this company."}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
