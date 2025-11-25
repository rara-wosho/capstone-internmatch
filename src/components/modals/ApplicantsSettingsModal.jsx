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
import { Loader, Settings } from "lucide-react";
import { Switch } from "../ui/switch";
import { useState, useTransition, useEffect } from "react";
import { useSession } from "@/context/SessionContext";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { updateApplicationSettings } from "@/lib/actions/company";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

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
    const [acceptCondition, setAcceptCondition] = useState("");

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
                .select("accept_applicants, accept_applicants_term")
                .eq("id", userData.id)
                .single();

            if (error) {
                toast.error("Unable to fetch current settings.");
            } else {
                setAcceptApplicants(data.accept_applicants ?? false);
                setAcceptCondition(data.accept_applicants_term ?? "");
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

            <DialogContent>
                <DialogHeader className="border-b pb-3 mb-3">
                    <DialogTitle>Applicant Acceptance Settings</DialogTitle>
                    <DialogDescription>
                        Decide when students are allowed to apply.
                    </DialogDescription>
                </DialogHeader>

                {isFetching ? (
                    <div className="py-4 text-sm text-muted-foreground flex items-center gap-2">
                        <Loader className="animate-spin" size={16} />
                        <p> Loading current settings...</p>
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
                            <div className="mb-3">
                                <p className="text-sm text-muted-foreground">
                                    When should students be allowed to apply?
                                </p>
                                <Select
                                    value={acceptCondition}
                                    onValueChange={setAcceptCondition}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Choose settings" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="anytime">
                                            Anytime (No examinations required)
                                        </SelectItem>
                                        <SelectItem value="all">
                                            After completing all exams
                                        </SelectItem>
                                        <SelectItem value="some">
                                            After completing at least one exam
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
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
