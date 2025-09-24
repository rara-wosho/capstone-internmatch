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
import { Settings } from "lucide-react";
import FormLabel from "../ui/FormLabel";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { useSession } from "@/context/SessionContext";
import { notFound } from "next/navigation";

export default function ApplicantsSettingsModal() {
    const { userData } = useSession();

    // get the inital states from companies table
    const [acceptApplicants, setAcceptApplicants] = useState(
        userData?.accept_applicants
    );
    const [acceptCondition, setAcceptCondition] = useState(
        userData?.accept_applicants_term
    );

    if (!userData) {
        notFound();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Example: log settings
        console.log("Accept applicants:", acceptApplicants);
        console.log("Condition:", acceptCondition);

        // TODO: Save to Supabase or API
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Settings /> Settings
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="border-b pb-3 mb-3">
                    <DialogTitle className="text-left">
                        Applicant Acceptance Settings
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Decide when students are allowed to apply.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    {/* Switch */}
                    <div className="mb-4 flex items-center justify-between">
                        <label
                            htmlFor="applicant-status"
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <span>Accept applicants?</span>
                        </label>
                        <Switch
                            id="applicant-status"
                            checked={acceptApplicants}
                            onCheckedChange={setAcceptApplicants}
                        />
                    </div>

                    {/* Select */}
                    {/* Only show if accepting applicant is  true  */}
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
                                    <SelectItem value="all">
                                        After completing all exams
                                    </SelectItem>
                                    <SelectItem value="some">
                                        After completing at least one exam
                                    </SelectItem>
                                    <SelectItem value="anytime">
                                        Anytime
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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
