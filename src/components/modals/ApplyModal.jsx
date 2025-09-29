"use client";

import { useSession } from "@/context/SessionContext";
import { checkStudentEligibility } from "@/lib/actions/company";
import { useEffect, useState } from "react";

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
import ErrorUi from "../ui/ErrorUi";
import { Button } from "../ui/button";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import SecondaryLabel from "../ui/SecondaryLabel";
import { ScrollArea } from "../ui/scroll-area";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Check, Loader } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { dateFormatter } from "@/utils/date-formatter";

export default function ApplyModal({ companyId, accept_applicants, term }) {
    const { userData } = useSession();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEligible, setIsEligible] = useState(false);
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState(null);
    const [checkingApply, setCheckingApply] = useState(true);

    if (!userData) {
        return (
            <ErrorUi secondaryMessage="You need to be logged in to apply." />
        );
    }

    const alreadyApplied = async () => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("applicants")
                .select("applied_at")
                .eq("student_id", userData.id)
                .eq("company_id", companyId)
                .maybeSingle();

            if (error) throw new Error(error.message);
            if (data) setApplied(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setCheckingApply(false);
        }
    };

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

        setLoading(false);
    };

    useEffect(() => {
        alreadyApplied();
    }, []);

    useEffect(() => {
        if (open) {
            checkEligibility();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="w-full">
                <Button
                    disabled={!accept_applicants || applied || checkingApply}
                >
                    {checkingApply && <Loader className="animate-spin" />}
                    {applied ? "Applied" : "Apply"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        <SecondaryLabel>Apply for Internship</SecondaryLabel>
                    </DialogTitle>

                    <DialogDescription className="text-left sr-only">
                        Please provide your details and required materials so
                        the company can review your application.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-w-[600px] mx-auto w-full max-h-[55svh]">
                    {error && <ErrorUi secondaryMessage={error} />}

                    {loading ? (
                        <div className="flex items-center gap-1">
                            <Loader size={16} className="animate-spin" />{" "}
                            Checking status
                        </div>
                    ) : isEligible && !error ? (
                        applied ? (
                            <div className="text-sm py-3 text-green-600 flex items-center gap-2">
                                <Check size={16} />
                                <p>
                                    You've already submitted your application
                                    for this company.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <div className="border-sky-600/50 border rounded-sm p-3 bg-accent mb-7">
                                    <p className="text-sm text-accent-foreground mb-2">
                                        We’ll use the information from your
                                        profile for this application. Make sure
                                        your account profile is up to date.
                                    </p>
                                    <p className="text-sm text-accent-foreground">
                                        Need to edit?{" "}
                                        <Link
                                            href={`/student/profile/${userData?.id}`}
                                            className="underline"
                                        >
                                            Click here
                                        </Link>
                                    </p>
                                </div>
                                <Separator className="mb-5" />

                                <div className="mb-3">
                                    <FormLabel>Resume link</FormLabel>
                                    <Input placeholder="Enter a google drive link to your resume" />
                                </div>
                                <div className="mb-3">
                                    <FormLabel>
                                        Portfolio link (Optional)
                                    </FormLabel>
                                    <Input placeholder="e.g. https://yourportfolio.com" />
                                </div>
                                <div className="mb-3">
                                    <FormLabel>
                                        Short Introduction (Optional)
                                    </FormLabel>
                                    <Textarea placeholder="Write a brief introduction about yourself." />
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="p-4 rounded-md border border-amber-500/30 bg-amber-500/5 text-amber-500 flex flex-col justify-center">
                            {term === "all" && (
                                <p className="text-sm">
                                    This company requires applicants to complete
                                    all of its exams before applying.
                                </p>
                            )}
                            {term === "some" && (
                                <p className="text-sm">
                                    This company requires applicants to take at
                                    least one of its exams before applying.
                                </p>
                            )}
                        </div>
                    )}
                </ScrollArea>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                                setError(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={!isEligible || applied}>
                        Submit Application
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
