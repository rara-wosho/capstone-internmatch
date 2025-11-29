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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { AlertCircle, Loader, Settings } from "lucide-react";
import { Switch } from "../ui/switch";
import { useState, useTransition, useEffect } from "react";
import { useSession } from "@/context/SessionContext";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { updateApplicationSettings } from "@/lib/actions/company";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ApplicantsSettingsModal() {
    const searchParams = useSearchParams();

    const openSettings = searchParams.get("open");

    const { userData } = useSession();
    const [open, setOpen] = useState(openSettings === "true");
    const [isFetching, setIsFetching] = useState(false);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    // Form states
    const [acceptApplicants, setAcceptApplicants] = useState(false);
    const [acceptCondition, setAcceptCondition] = useState("anytime");
    const [hasExam, setHasExam] = useState(false);

    // Ensure we have a valid user
    if (!userData) {
        notFound();
    }

    // Fetch settings from Supabase
    const fetchStatus = async () => {
        if (!userData?.id) return;

        setIsFetching(true);
        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("companies")
                .select("accept_applicants, accept_applicants_term, exams(id)")
                .eq("id", userData.id)
                .eq("exams.company_id", userData.id)
                .eq("exams.is_published", true)
                .eq("exams.is_deleted", false)
                .single();

            if (error) {
                toast.error("Unable to fetch current settings.");
            } else {
                setAcceptApplicants(data.accept_applicants ?? false);
                setAcceptCondition(data.accept_applicants_term ?? "anytime");
                setHasExam(data?.exams?.length > 0);
                router.refresh();
            }
        } catch (err) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isPending) return;

        // Validate: if no exams exist, can only use "anytime"
        if (
            !hasExam &&
            (acceptCondition === "some" || acceptCondition === "all")
        ) {
            toast.error(
                "You must create and publish an exam first to require exam completion."
            );
            return;
        }

        startTransition(async () => {
            const { success, error } = await updateApplicationSettings(
                userData.id,
                acceptApplicants,
                acceptCondition
            );

            if (!success) {
                toast.error(error || "Failed to update settings.");
                return;
            }

            toast.success("Settings updated successfully!");
            setTimeout(() => setOpen(false), 900);
        });
    };

    // Auto-reset to "anytime" if user selects exam-based option but has no exams
    useEffect(() => {
        if (
            !hasExam &&
            (acceptCondition === "some" || acceptCondition === "all")
        ) {
            setAcceptCondition("anytime");
        }
    }, [hasExam, acceptCondition]);

    // When modal opens, fetch current settings
    useEffect(() => {
        if (open) fetchStatus();
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Settings className="mr-2" /> Settings
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl">
                <DialogHeader className="border-b pb-3 mb-3">
                    <DialogTitle>Applicant Acceptance Settings</DialogTitle>
                    <DialogDescription>
                        Decide when students are allowed to apply for
                        internships.
                    </DialogDescription>
                </DialogHeader>

                {isFetching ? (
                    <div className="py-4 text-sm text-muted-foreground flex items-center gap-2">
                        <Loader className="animate-spin" size={16} />
                        <p>Loading current settings...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Switch */}
                        <div className="mb-4 flex items-center justify-between">
                            <label
                                htmlFor="applicant-status"
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                Accept applicants?
                            </label>
                            <Switch
                                id="applicant-status"
                                checked={acceptApplicants}
                                onCheckedChange={setAcceptApplicants}
                            />
                        </div>

                        {/* Conditional select */}
                        {acceptApplicants && (
                            <>
                                <div className="mb-3">
                                    <p className="text-sm font-medium mb-1">
                                        Application Requirements
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        When should students be allowed to
                                        apply?
                                    </p>
                                    <Select
                                        value={acceptCondition}
                                        onValueChange={setAcceptCondition}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choose settings" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="anytime">
                                                Anytime (No examinations
                                                required)
                                            </SelectItem>
                                            <SelectItem
                                                value="some"
                                                disabled={!hasExam}
                                            >
                                                After completing at least one
                                                exam
                                                {!hasExam &&
                                                    " (Requires published exam)"}
                                            </SelectItem>
                                            <SelectItem
                                                value="all"
                                                disabled={!hasExam}
                                            >
                                                After completing all exams
                                                {!hasExam &&
                                                    " (Requires published exam)"}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Warning message when no exams exist */}
                                {!hasExam && (
                                    <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3 mb-3">
                                        <div className="flex gap-2">
                                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                            <div className="text-sm">
                                                <p className="font-semibold text-amber-500 mb-1">
                                                    No Published Exams
                                                </p>
                                                <p className="text-amber-700 dark:text-amber-400 mb-2">
                                                    To require exam completion
                                                    before applying, you must
                                                    first create and publish at
                                                    least one exam.
                                                </p>
                                                <Link
                                                    href="/company/create-exam"
                                                    className="text-amber-600 dark:text-amber-300 underline hover:no-underline font-medium"
                                                >
                                                    Create an exam now →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Info message explaining each option */}
                                <div className="rounded-md border bg-accent/50 p-3 mb-3">
                                    <div className="text-sm text-muted-foreground">
                                        <p className="font-semibold text-foreground mb-1">
                                            About Application Requirements:
                                        </p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>
                                                <strong>Anytime:</strong>{" "}
                                                Students can apply immediately
                                                without taking any exams
                                            </li>
                                            <li>
                                                <strong>
                                                    At least one exam:
                                                </strong>{" "}
                                                Students must complete at least
                                                one of your published exams
                                            </li>
                                            <li>
                                                <strong>All exams:</strong>{" "}
                                                Students must complete every
                                                published exam you've created
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}

                        <DialogFooter className="mt-6">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending && (
                                    <Loader
                                        className="animate-spin mr-2"
                                        size={18}
                                    />
                                )}
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
