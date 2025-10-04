"use client";

import { useMemo, useState } from "react";
import ApplicantCard from "../ui/ApplicantCard";
import { cn } from "@/lib/utils";
import EmptyUi from "../ui/EmptyUi";
import { Skeleton } from "../ui/skeleton";

const TABS = [
    { label: "all" },
    { label: "pending" },
    { label: "accepted" },
    { label: "reviewed" },
];

export default function ApplicantsSection({ applicants }) {
    const [status, setStatus] = useState("all");

    const sortedApplicants = useMemo(() => {
        if (status === "all") return applicants;

        return applicants.filter((app) => app.status === status);
    }, [status, applicants]);

    return (
        <>
            <div className="mb-3 flex items-center flex-wrap gap-2 mt-6">
                {TABS.map((tab) => (
                    <button
                        onClick={() => setStatus(tab.label)}
                        key={tab.label}
                        className={cn(
                            "rounded-sm border px-3 py-1 cursor-pointer hover:text-accent-foreground text-sm text-muted-foreground capitalize transition-colors",
                            status === tab.label &&
                                "border-blue-500/60 dark:border-sky-400/60 text-accent-foreground bg-accent"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sortedApplicants.length === 0 ? (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                        <EmptyUi
                            message="Nothing's here"
                            secondaryMessage={`There are no ${status} application`}
                        />
                    </div>
                ) : (
                    sortedApplicants.map((applicant, index) => (
                        <ApplicantCard key={index} applicant={applicant} />
                    ))
                )}
            </div>
        </>
    );
}
