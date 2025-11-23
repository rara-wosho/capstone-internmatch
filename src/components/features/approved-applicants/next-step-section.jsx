"use client";

import CreateScheduleForm from "@/components/forms/CreateScheduleForm";
import RequestAdditionalDocumentsForm from "@/components/forms/RequestAdditionalDocumentForm";
import BorderBox from "@/components/ui/BorderBox";
import TitleText from "@/components/ui/TitleText";
import { cn } from "@/lib/utils";
import { Calendar, FileText, Handshake, Check, X } from "lucide-react";
import { useState } from "react";

const tabs = [
    {
        id: "create-schedule",
        label: "Create Schedule",
        icon: <Calendar size={16} />,
    },
    {
        id: "documents",
        label: "Request Additional Documents",
        icon: <FileText size={16} />,
    },
];

export default function NextStepSection({ applicants, studentId }) {
    const [activeTab, setActiveTab] = useState("create-schedule");
    const [selectedApplicants, setSelectedApplicants] = useState([]);

    const handleSelectApplicant = (studentObj) => {
        setSelectedApplicants((prev) => {
            // Check if applicant is already selected
            const isAlreadySelected = prev.some(
                (student) => student.id === studentObj.id
            );

            if (isAlreadySelected) {
                // Remove if already selected (toggle off)
                return prev.filter((student) => student.id !== studentObj.id);
            } else {
                // Add if not selected (toggle on)
                return [...prev, studentObj];
            }
        });
    };

    const isApplicantSelected = (studentId) => {
        return selectedApplicants.some((student) => student.id === studentId);
    };

    const hasNoApplicants = applicants?.length == 0;

    return (
        <div>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4 flex-wrap mb-4">
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

            <TitleText className="mb-4 text-sm">
                {activeTab === "create-schedule"
                    ? "Select participants for the schedule"
                    : "Select applicants for your document request."}
            </TitleText>

            {/* Selected Applicants Counter */}
            {selectedApplicants.length > 0 && (
                <div className="mb-4 px-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between gap-2">
                    <p className="text-sm text-primary font-medium">
                        {selectedApplicants.length} applicant
                        {selectedApplicants.length !== 1 ? "s" : ""} selected
                    </p>
                    <button
                        className="p-3 cursor-pointer text-muted-foreground transition-colors hover:text-secondary-foreground"
                        onClick={() => setSelectedApplicants([])}
                    >
                        <X size={20} />
                    </button>
                </div>
            )}

            {/* Applicants List with Highlight Selection */}
            <div className="space-y-3 mb-6">
                {applicants.map((app) => {
                    const isSelected = isApplicantSelected(app.students.id);
                    const hasPendingSchedule =
                        app?.students?.schedule_student_ids.length > 0;

                    return (
                        <div
                            key={app.id}
                            onClick={() => handleSelectApplicant(app.students)}
                            className={cn(
                                "p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
                                isSelected
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-border bg-card hover:border-primary/30"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* Selection Indicator */}
                                    <div
                                        className={cn(
                                            "flex items-center justify-center w-5 h-5 border rounded-full transition-colors",
                                            isSelected
                                                ? "bg-primary border-primary text-white"
                                                : "border-gray-300 bg-white"
                                        )}
                                    >
                                        {isSelected && <Check size={12} />}
                                    </div>

                                    {/* Applicant Info */}
                                    <div>
                                        <h3
                                            className={cn(
                                                "font-medium",
                                                isSelected
                                                    ? "text-primary"
                                                    : "text-foreground"
                                            )}
                                        >
                                            {app.students.firstname}{" "}
                                            {app.students.lastname}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {app.students.school ||
                                                "No school provided"}
                                        </p>

                                        {hasPendingSchedule && (
                                            <p className="text-sm text-yellow-600">
                                                The student is also a
                                                participant with another
                                                schedule
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div
                                    className={cn(
                                        "px-2 py-1 rounded-full text-xs font-medium",
                                        isSelected
                                            ? "bg-primary text-white"
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {isSelected
                                        ? "Selected"
                                        : "Click to select"}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Forms Section - Only show if applicants are selected for scheduling */}
            {selectedApplicants.length > 0 && (
                <BorderBox className="border rounded-xl bg-card mt-6">
                    {activeTab === "create-schedule" && (
                        <CreateScheduleForm
                            selectedApplicants={selectedApplicants}
                        />
                    )}
                    {activeTab === "documents" && (
                        <RequestAdditionalDocumentsForm
                            selectedApplicants={selectedApplicants}
                        />
                    )}
                </BorderBox>
            )}

            {/* Empty State when no applicants in the list */}
            {hasNoApplicants ? (
                <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                    <h3 className="font-medium text-lg mb-2">
                        No Approved Applicants
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        You can only create schedule or request an additional
                        document if there are approved applicants from the list.
                    </p>
                </div>
            ) : (
                //  Empty State when no applicants selected
                selectedApplicants.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                        <Handshake className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <h3 className="font-medium text-lg mb-2">
                            No Applicants Selected
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">
                            Select applicants from the list above to create
                            schedules or request additional documents.
                        </p>
                    </div>
                )
            )}
        </div>
    );
}
