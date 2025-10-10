"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMemo, useState } from "react";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const TABS = [
    { label: "all" },
    { label: "accepted" },
    { label: "pending" },
    { label: "reviewed" },
    { label: "cancelled" },
];

export default function InstructorApplicationsSection({ applications = [] }) {
    const [activeTab, setActiveTab] = useState("all");

    const filteredApplications = useMemo(() => {
        if (activeTab === "all") return applications;

        return applications.filter((app) =>
            app.applicants?.some((a) => a.status === activeTab)
        );
    }, [activeTab, applications]);

    return (
        <>
            {/* Tabs */}
            <div className="mb-4 flex items-center flex-wrap gap-1 md:gap-2">
                {TABS.map((tab) => (
                    <button
                        onClick={() => setActiveTab(tab.label)}
                        key={tab.label}
                        className={cn(
                            "rounded-sm border px-3 py-1 cursor-pointer hover:text-accent-foreground text-sm text-muted-foreground capitalize transition-colors",
                            activeTab === tab.label
                                ? "border-blue-500/60 dark:border-sky-400/60 text-accent-foreground bg-accent"
                                : "bg-secondary border-transparent"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {filteredApplications.length === 0 ? (
                <div>
                    <p className="text-sm text-muted-foreground">
                        No {activeTab} applications found.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {filteredApplications.map((app) => (
                        <div
                            key={app.id}
                            className="border rounded-xl bg-card shadow-xs"
                        >
                            <Link
                                href={`/instructor/students/${app.id}`}
                                className="flex items-center gap-2 p-4 border-b"
                            >
                                <Avatar className="size-5 aspect-square">
                                    <AvatarImage
                                        src={app.avatar_url}
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>?</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold hover:text-accent-foreground">
                                    {app.firstname} {app.lastname}
                                </p>

                                <div className="ms-auto text-muted-foreground hover:text-accent-foreground">
                                    <ChevronRight size={18} />
                                </div>
                            </Link>

                            <div className="p-4 space-y-3">
                                {app.applicants?.map((a) => (
                                    <div
                                        key={a.id}
                                        className="flex items-center justify-between gap-2 text-muted-foreground text-sm"
                                    >
                                        <div className="flex flex-col">
                                            <p className="font-medium text-secondary-foreground">
                                                {a.companies.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {dateFormatter(a.applied_at)}
                                            </p>
                                        </div>
                                        <p className="capitalize">{a.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
