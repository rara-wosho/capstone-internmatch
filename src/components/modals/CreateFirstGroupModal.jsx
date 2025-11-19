"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFirstGroupModal({ id }) {
    const [hasNoGroup, setHasNoGroup] = useState(false);
    const [open, setOpen] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const router = useRouter();

    // --- Load local preference on mount ---
    useEffect(() => {
        const stored = localStorage.getItem(
            "instructor-hide-first-group-modal"
        );
        if (stored === "true") {
            setDontShowAgain(true);
        }
        setIsLoading(false); // Mark loading as complete
    }, []);

    const fetchGroup = useCallback(async () => {
        if (isLoading) return; // Don't fetch until we know the user preference

        const supabase = createClient();

        const { data, error } = await supabase
            .from("groups")
            .select("id")
            .eq("ojt_instructor_id", id);

        if (!error && data?.length === 0) {
            setHasNoGroup(true);

            // Only open if user has not chosen "Don't show again"
            // AND we're done loading the preference
            if (!dontShowAgain && !isLoading) {
                setOpen(true);
            }
        }
    }, [id, dontShowAgain, isLoading]); // Add isLoading to dependencies

    useEffect(() => {
        fetchGroup();
    }, [fetchGroup]);

    // When closing modal, store preference
    const handleClose = (value) => {
        setOpen(value);

        if (!value && dontShowAgain) {
            localStorage.setItem("instructor-hide-first-group-modal", "true");
        }
    };

    // Don't render anything until we've checked localStorage
    if (isLoading) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="py-2">
                        <DialogTitle className="text-2xl">
                            Welcome aboard! 🚀
                        </DialogTitle>
                    </div>
                    <DialogDescription>
                        To get started, you'll need to create your first OJT
                        group. This group will allow students to join under your
                        supervision.
                        <br />
                        Let's build your first group and start your journey!
                    </DialogDescription>
                </DialogHeader>

                {/* Checkbox Row */}
                <div className="flex items-center gap-2 mt-4">
                    <Checkbox
                        id="dont-show"
                        checked={dontShowAgain}
                        onCheckedChange={(v) => setDontShowAgain(Boolean(v))}
                    />
                    <label htmlFor="dont-show" className="text-sm">
                        Don't show again
                    </label>
                </div>

                <DialogFooter className="mt-2">
                    <Button
                        onClick={() => {
                            router.push("/instructor/manage-groups");
                        }}
                    >
                        Create Group
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
