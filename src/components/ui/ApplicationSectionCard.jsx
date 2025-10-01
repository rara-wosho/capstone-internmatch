"use client";

import Link from "next/link";
import BorderBox from "./BorderBox";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import FormLabel from "./FormLabel";
import { Button } from "./button";
import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function ApplicationSectionCard({ application }) {
    const [isPending, startTransition] = useTransition();
    const [cancelled, setCancelled] = useState(false);
    const applicationId = application?.id;

    const handleCancelApplication = () => {
        startTransition(async () => {
            const supabase = createClient();

            const { error } = await supabase
                .from("applicants")
                .update({ status: "cancelled" })
                .eq("id", applicationId);

            if (error) {
                toast.error("Unable to cancel application.");
                return;
            }

            toast.success("Application cancelled.");
            setCancelled(true);
        });
    };

    return (
        <div className="border rounded-xl mb-3 shadow-xs bg-card">
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
                        application?.status === "pending" &&
                            "bg-muted border-neutral-500/70",
                        application?.status === "cancelled" &&
                            "text-muted-foreground",
                        application?.status === "accepted" &&
                            "border-green-700 bg-green-700 text-white",
                        application?.reviewed_at &&
                            "border-accent-foreground text-accent-foreground bg-accent"
                    )}
                >
                    {application?.status === "pending" && cancelled
                        ? "Cancelled"
                        : application?.status}
                </div>
            </BorderBox>
            <BorderBox className="px-3 md:px-5 py-3">
                <div className="mb-4 flex flex-col">
                    <FormLabel>Resume Link</FormLabel>
                    <Link
                        target="_blank"
                        href={application?.resume_link}
                        className="text-muted-foreground text-sm hover:text-accent-foreground hover:underline underline-offset-2"
                    >
                        {application?.resume_link}
                    </Link>
                </div>
                {application?.portfolio_link && (
                    <div className="mb-4 flex flex-col">
                        <FormLabel>Portfolio Link</FormLabel>
                        <Link
                            target="_blank"
                            href={application?.portfolio_link}
                            className="text-muted-foreground text-sm hover:text-accent-foreground hover:underline underline-offset-2"
                        >
                            {application?.portfolio_link}
                        </Link>
                    </div>
                )}

                {application?.introduction && (
                    <div className="mb-4 flex flex-col">
                        <FormLabel>Introduction</FormLabel>
                        <p className="text-muted-foreground text-sm">
                            {application?.introduction}
                        </p>
                    </div>
                )}

                <div className="flex justify-end">
                    {application?.status === "pending" && (
                        <Button
                            disabled={isPending || cancelled}
                            onClick={handleCancelApplication}
                            variant="secondary"
                        >
                            {isPending && <Loader className="animate-spin" />}
                            {application?.status === "pending" && cancelled
                                ? "Cancelled"
                                : " Cancel Application"}
                        </Button>
                    )}
                </div>
            </BorderBox>
        </div>
    );
}
