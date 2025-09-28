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
import { Loader } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";

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

        setLoading(false);
    };

    useEffect(() => {
        if (open) {
            checkEligibility();
        }
    }, [open]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild className="w-full">
                <Button>Apply</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="max-w-[600px] mx-auto w-full">
                    <DrawerTitle className="text-left">
                        <SecondaryLabel>Apply for Internship</SecondaryLabel>
                    </DrawerTitle>
                    <DrawerDescription className="text-left">
                        Please provide your details and required materials so
                        the company can review your application.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="max-w-[600px] mx-auto w-full px-4">
                    {loading ? (
                        <div className="flex items-center gap-1">
                            <Loader size={16} className="animate-spin" />{" "}
                            Checking status
                        </div>
                    ) : isEligible ? (
                        <div className="flex flex-col">
                            <div className="border-sky-600/50 border rounded-sm p-3 bg-accent mb-7">
                                <p className="text-sm text-accent-foreground mb-2">
                                    We’ll use the information from your profile
                                    for this application. Make sure your account
                                    profile is up to date.
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
                                <FormLabel>Portfolio link (Optional)</FormLabel>
                                <Input placeholder="e.g. https://yourportfolio.com" />
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 rounded-md border border-amber-500/30 bg-amber-500/5 text-amber-500 flex flex-col items-center justify-center">
                            <p className="text-sm text-center">
                                You’re not eligible to apply yet. Please
                                complete the required company exam to unlock the
                                application form.
                            </p>
                        </div>
                    )}
                </div>

                <DrawerFooter className="max-w-[600px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2">
                    <Button
                        size="sm"
                        className="order-1 sm:order-2"
                        disabled={!isEligible}
                    >
                        Submit Application
                    </Button>
                    <DrawerClose asChild className="order-2 sm:order-1">
                        <Button size="sm" variant="outline">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
