"use client";

import { useMemo, useState } from "react";
import ApplicationSectionCard from "../ui/ApplicationSectionCard";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

const TABS = [
    { label: "all" },
    { label: "accepted" },
    { label: "pending" },
    { label: "reviewed" },
    { label: "cancelled" },
];

export default function ApplicationsSection({ applications = [] }) {
    const [activeTab, setActiveTab] = useState("all");

    // Filter applications based on the active tab
    const filteredApplications = useMemo(() => {
        if (activeTab === "all") return applications;
        return applications.filter(
            (app) => app.status?.toLowerCase() === activeTab
        );
    }, [activeTab, applications]);

    return (
        <div>
            {/* Tabs */}
            <div className="mb-3 flex items-center flex-wrap gap-2">
                {TABS.map((tab) => (
                    <button
                        onClick={() => setActiveTab(tab.label)}
                        key={tab.label}
                        className={cn(
                            "rounded-sm border px-3 py-1 cursor-pointer hover:text-accent-foreground text-sm text-muted-foreground capitalize transition-colors",
                            activeTab === tab.label &&
                                "border-blue-500/60 dark:border-sky-400/60 text-accent-foreground bg-accent"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Applications List */}
            <div className="space-y-3">
                {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => (
                        <ApplicationSectionCard
                            key={application.id}
                            application={application}
                        />
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No {activeTab === "all" ? "" : activeTab} applications
                        found.
                    </p>
                )}
            </div>
        </div>
    );
}
