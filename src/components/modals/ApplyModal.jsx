"use client";

import { useSession } from "@/context/SessionContext";
import { checkStudentEligibility } from "@/lib/actions/company";
import { useEffect, useState, useTransition } from "react";

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

import SecondaryLabel from "../ui/SecondaryLabel";
import { ScrollArea } from "../ui/scroll-area";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Check, Info, Loader } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { submitApplication } from "@/lib/actions/application";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function ApplyModal({ companyId, accept_applicants, term }) {
    const { userData } = useSession();
    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);
    const [isEligible, setIsEligible] = useState(false);
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState(null);

    // loading states
    const [loading, setLoading] = useState(true);
    const [checkingApply, setCheckingApply] = useState(true);

    // form Data
    const [formData, setFormData] = useState({
        resume_link: "",
        portfolio_link: "",
        introduction: "",
    });

    if (!userData) {
        return (
            <ErrorUi secondaryMessage="You need to be logged in to apply." />
        );
    }

    const resetForm = () => {
        setFormData({ resume_link: "", portfolio_link: "", introduction: "" });
    };

    const handleSubmit = async () => {
        if (!formData.resume_link) {
            toast.error("Please provide your resume link.");
            return;
        }

        if (!formData.resume_link.startsWith("http")) {
            toast.error("Invalid resume link.");
            return;
        }

        startTransition(async () => {
            const { success, error } = await submitApplication({
                ...formData,
                company_id: companyId,
                student_id: userData.id,
                status: "pending",
            });

            if (!success) {
                toast.error("Unable to submit application.", {
                    description: error,
                });
                return;
            }

            toast.success("Application submitted successfully!");
            resetForm();
            setTimeout(() => {
                setOpen(false);
                setApplied(true);
            }, 600);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
        const { eligible, error } = await checkStudentEligibility(
            companyId,
            userData.id
        );

        if (error) {
            setError("Something went wrong while checking eligibility.");
            return;
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
                <ScrollArea className="max-w-[600px] mx-auto w-full max-h-[60svh]">
                    {error && <ErrorUi secondaryMessage={error} />}

                    {loading ? (
                        <div className="flex items-center gap-1">
                            <Loader size={16} className="animate-spin" />{" "}
                            Checking status
                        </div>
                    ) : isEligible && !error ? (
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
                                        href={"/student/account/edit"}
                                        className="underline"
                                    >
                                        Click here
                                    </Link>
                                </p>
                            </div>
                            <Separator className="mb-5" />

                            <div className="mb-3">
                                <div className="flex items-center gap-1.5">
                                    <FormLabel>Resume link</FormLabel>
                                    <Popover>
                                        <PopoverTrigger className="mb-1">
                                            <Info size={16} />
                                        </PopoverTrigger>
                                        <PopoverContent className="p-2 text-sm text-muted-foreground">
                                            <p className="font-semibold">
                                                USING GOOGLE DRIVE.
                                            </p>
                                            <ul className="list-decimal ps-3 mt-2">
                                                <li>Upload to Google Drive</li>
                                                <li>Click "Share"</li>
                                                <li>
                                                    Under General access, select
                                                    “Anyone with the link”
                                                </li>
                                                <li>
                                                    Click "Copy link" then paste
                                                    here
                                                </li>
                                            </ul>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <Input
                                    disabled={applied}
                                    value={formData.resume_link}
                                    name="resume_link"
                                    onChange={handleChange}
                                    placeholder="Enter a valid link to your resume."
                                />
                                <p className="text-xs text-muted-foreground mt-1 text-right">
                                    A Google Drive link is preferred.
                                </p>
                            </div>
                            <div className="mb-3">
                                <FormLabel>Portfolio link (Optional)</FormLabel>
                                <Input
                                    disabled={applied}
                                    value={formData.portfolio_link}
                                    name="portfolio_link"
                                    onChange={handleChange}
                                    placeholder="e.g. https://yourportfolio.com"
                                />
                            </div>
                            <div className="mb-3">
                                <FormLabel>
                                    Short Introduction (Optional)
                                </FormLabel>
                                <Textarea
                                    disabled={applied}
                                    value={formData.introduction}
                                    name="introduction"
                                    onChange={handleChange}
                                    placeholder="Write a brief introduction about yourself."
                                />
                            </div>
                        </div>
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
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            !isEligible ||
                            applied ||
                            isPending ||
                            !formData.resume_link
                        }
                    >
                        {isPending && <Loader className="animate-spin" />}
                        Submit Application
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
