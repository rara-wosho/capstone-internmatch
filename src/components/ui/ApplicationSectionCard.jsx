"use client";

import Link from "next/link";
import BorderBox from "./BorderBox";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import FormLabel from "./FormLabel";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Award, BriefcaseBusiness, Loader } from "lucide-react";
import {
    cancelApplication,
    resubmitApplication,
    updateApplication,
} from "@/lib/actions/application";

export default function ApplicationSectionCard({ application }) {
    const [applicationForm, setApplicationForm] = useState({
        resume_link: application?.resume_link || "",
        portfolio_link: application?.portfolio_link || "",
        introduction: application?.introduction || "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [currentStatus, setCurrentStatus] = useState(application?.status);

    const applicationId = application?.id;

    const handleCancelApplication = () => {
        startTransition(async () => {
            const result = await cancelApplication(applicationId);

            if (!result.success) {
                toast.error(result.error || "Unable to cancel application.");
                return;
            }

            setCurrentStatus("cancelled");
            toast.success("Application cancelled.");
        });
    };

    const handleResubmitApplication = () => {
        startTransition(async () => {
            const result = await resubmitApplication(applicationId);

            if (!result.success) {
                toast.error(result.error || "Unable to resubmit application.");
                return;
            }

            setCurrentStatus("pending");
            toast.success("Application submitted.");
        });
    };

    const handleSaveChanges = () => {
        // Validate
        if (!applicationForm.resume_link) {
            toast.error("Resume link is required");
            return;
        }
        if (!applicationForm.resume_link.startsWith("http")) {
            toast.error("Resume link is not valid.");
            return;
        }

        startTransition(async () => {
            const result = await updateApplication(
                applicationId,
                applicationForm
            );

            if (!result.success) {
                toast.error(result.error || "Unable to update application.");
                return;
            }

            setIsEditing(false);
            toast.success("Application updated.");
        });
    };

    const handleCancelEdit = () => {
        setApplicationForm({
            resume_link: application?.resume_link || "",
            portfolio_link: application?.portfolio_link || "",
            introduction: application?.introduction || "",
        });
        setIsEditing(false);
    };

    return (
        <div
            className={cn(
                "border rounded-xl mb-3 shadow-xs bg-card",
                application.approve_status === "approved" && "border-green-600"
            )}
        >
            <BorderBox className="border-b flex flex-wrap gap-2 items-center justify-between">
                <div>
                    <Link
                        className="hover:text-accent-foreground transition-colors"
                        href={`/student/companies/${application?.companies?.id}`}
                    >
                        <h1 className="font-semibold">
                            {application?.companies?.name}
                        </h1>
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        {dateFormatter(application?.applied_at, true)}
                    </p>
                </div>
                <div
                    className={cn(
                        "font-medium border rounded-full px-3 text-xs md:text-sm uppercase flex items-center gap-1 py-1",
                        currentStatus === "pending" &&
                            "bg-muted border-neutral-500/70",
                        currentStatus === "cancelled" &&
                            "text-muted-foreground",
                        currentStatus === "accepted" &&
                            "border-green-700 bg-green-700 text-white",
                        currentStatus === "rejected" &&
                            "border-red-700 bg-red-700 text-white",
                        application?.reviewed_at &&
                            currentStatus === "reviewed" &&
                            "border-accent-foreground text-accent-foreground bg-accent"
                    )}
                >
                    {currentStatus}
                </div>
            </BorderBox>
            <BorderBox className="px-3 md:px-5 py-3">
                {/* Display Intern application details  */}
                {application?.approve_status === "approved" && (
                    <div className="flex items-center gap-2 p-2 mb-3 border border-green-600/50 bg-green-500/10 rounded-lg">
                        <div className="rounded-sm bg-green-600 text-green-100 p-3">
                            <BriefcaseBusiness />
                        </div>
                        <div className="text-green-600 dark:text-green-500">
                            <p>Approved</p>
                            <p className=" text-sm">
                                You are currently an intern at{" "}
                                {application?.companies?.name}
                                {" | "} Approved at{" : "}
                                {dateFormatter(application?.approved_at)}
                            </p>
                        </div>
                    </div>
                )}
                {isEditing ? (
                    <>
                        <div className="mb-4 flex flex-col">
                            <FormLabel required>Resume Link</FormLabel>
                            <Input
                                disabled
                                type="url"
                                value={applicationForm.resume_link}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="mb-4 flex flex-col">
                            <FormLabel>Cover Letter Link (Optional)</FormLabel>
                            <Input
                                disabled
                                type="url"
                                value={applicationForm.cover_letter_url}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="mb-4 flex flex-col">
                            <FormLabel>Portfolio Link (Optional)</FormLabel>
                            <Input
                                type="url"
                                value={applicationForm.portfolio_link}
                                onChange={(e) =>
                                    setApplicationForm({
                                        ...applicationForm,
                                        portfolio_link: e.target.value,
                                    })
                                }
                                placeholder="https://..."
                            />
                        </div>
                        <div className="mb-4 flex flex-col">
                            <FormLabel>Introduction (Optional)</FormLabel>
                            <Textarea
                                value={applicationForm.introduction}
                                onChange={(e) =>
                                    setApplicationForm({
                                        ...applicationForm,
                                        introduction: e.target.value,
                                    })
                                }
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-4 flex flex-col">
                            <FormLabel>Resume Link</FormLabel>
                            <Link
                                target="_blank"
                                href={application?.resume_link}
                                className="text-muted-foreground text-sm hover:text-accent-foreground hover:underline underline-offset-2 line-clamp-2"
                            >
                                {application?.resume_link}
                            </Link>
                        </div>
                        <div className="mb-4 flex flex-col">
                            <FormLabel>Cover Letter Link</FormLabel>
                            <Link
                                target="_blank"
                                href={application?.cover_letter_url}
                                className="text-muted-foreground text-sm hover:text-accent-foreground hover:underline underline-offset-2 line-clamp-2"
                            >
                                {application?.cover_letter_url}
                            </Link>
                        </div>
                        {application?.portfolio_link && (
                            <div className="mb-4 flex flex-col">
                                <FormLabel>Portfolio Link</FormLabel>
                                <Link
                                    target="_blank"
                                    href={application?.portfolio_link}
                                    className="text-muted-foreground text-sm hover:text-accent-foreground hover:underline underline-offset-2 line-clamp-2"
                                >
                                    {application?.portfolio_link}
                                </Link>
                            </div>
                        )}
                        {application?.introduction && (
                            <div className="mb-4 flex flex-col">
                                <FormLabel>Introduction</FormLabel>
                                <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                                    {application?.introduction}
                                </p>
                            </div>
                        )}
                    </>
                )}

                <div className="flex justify-end gap-2 mt-3">
                    {isEditing ? (
                        <>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancelEdit}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleSaveChanges}
                                disabled={isPending}
                            >
                                {isPending && (
                                    <Loader
                                        className="animate-spin"
                                        size={16}
                                    />
                                )}
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <>
                            {currentStatus === "pending" && (
                                <Button
                                    size="sm"
                                    disabled={isPending}
                                    onClick={handleCancelApplication}
                                    variant="secondary"
                                >
                                    {isPending && (
                                        <Loader
                                            className="animate-spin"
                                            size={16}
                                        />
                                    )}
                                    Cancel Application
                                </Button>
                            )}

                            {currentStatus === "cancelled" && (
                                <Button
                                    size="sm"
                                    disabled={isPending}
                                    onClick={handleResubmitApplication}
                                    variant="secondary"
                                >
                                    {isPending && (
                                        <Loader
                                            className="animate-spin"
                                            size={16}
                                        />
                                    )}
                                    Resubmit Application
                                </Button>
                            )}

                            {(currentStatus === "pending" ||
                                currentStatus === "cancelled") && (
                                <Button
                                    variant="white"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Application
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </BorderBox>
        </div>
    );
}
