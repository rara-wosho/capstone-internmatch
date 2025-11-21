"use client";

import CreateScheduleForm from "@/components/forms/CreateScheduleForm";
import RequestAdditionalDocumentsForm from "@/components/forms/RequestAdditionalDocumentForm";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, FileText, Handshake } from "lucide-react";
import { useState } from "react";

const tabs = [
    {
        id: "orientation",
        label: "Schedule Orientation",
        icon: <Calendar size={16} />,
    },
    {
        id: "interview",
        label: "Schedule Final Interview",
        icon: <Handshake size={16} />,
    },
    {
        id: "documents",
        label: "Request Additional Documents",
        icon: <FileText size={16} />,
    },
];

export default function NextStepSection({ studentId, studentEmail }) {
    const [activeTab, setActiveTab] = useState("orientation");

    return (
        <div>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4 flex-wrap mb-5">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 h-9 cursor-pointer justify-center px-3 rounded-sm text-sm transition-colors",
                            activeTab === tab.id
                                ? "bg-primary text-white"
                                : "bg-secondary"
                        )}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>
            <BorderBox className="border rounded-xl bg-card">
                {activeTab === "orientation" && (
                    <CreateScheduleForm
                        type="orientation"
                        studentId={studentId}
                        studentEmail={studentEmail}
                    />
                )}
                {activeTab === "interview" && (
                    <CreateScheduleForm
                        type="interview"
                        studentEmail={studentEmail}
                        studentId={studentId}
                    />
                )}
                {activeTab === "documents" && (
                    <RequestAdditionalDocumentsForm />
                )}
            </BorderBox>
        </div>
    );
}
