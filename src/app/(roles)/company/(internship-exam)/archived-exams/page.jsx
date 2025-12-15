"use client";

import { useState, useEffect } from "react";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Button } from "@/components/ui/button";
import { Loader2, ArchiveRestore } from "lucide-react";
import { toast } from "sonner";
import { getArchivedExams, unarchiveExam } from "@/lib/actions/exam";
import Wrapper from "@/components/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArchivedExamsPage() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null); // Track specific exam ID

    // Fetch archived exams
    useEffect(() => {
        async function fetchExams() {
            setLoading(true);
            const { data, error } = await getArchivedExams();

            if (error) {
                setError(error);
            } else {
                setExams(data || []);
            }
            setLoading(false);
        }

        fetchExams();
    }, []);

    // Handle unarchive
    const handleUnarchive = async (examId, examTitle) => {
        if (processingId) return; // Prevent multiple operations

        setProcessingId(examId); // Mark this specific exam as processing

        try {
            const result = await unarchiveExam(examId);

            if (result.success) {
                toast.success(`"${examTitle}" has been unarchived`);
                // Remove from list after successful unarchive
                setExams((prev) => prev.filter((exam) => exam.id !== examId));
            } else {
                toast.error(
                    result.error ||
                        "Something went wrong while performing action."
                );
            }
        } catch (error) {
            console.error("Error unarchiving exam:", error);
            toast.error("Failed to unarchive exam");
        } finally {
            setProcessingId(null); // Clear processing state
        }
    };

    if (loading) {
        return (
            <>
                <div className="mb-3">
                    <Skeleton className="h-7 w-[300px] mb-2" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>

                <Skeleton className="w-full h-[60px]" />
            </>
        );
    }

    if (error) {
        return (
            <ErrorUi
                message="Unable to load archived exams."
                secondaryMessage={error}
            />
        );
    }

    return (
        <Wrapper>
            <div className="mb-3">
                <SecondaryLabel>Archived Exams</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    {exams.length} archived exam{exams.length !== 1 ? "s" : ""}
                </p>
            </div>

            {exams.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <ArchiveRestore className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No archived exams</p>
                    <p className="text-sm">Archived exams will appear here</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {exams.map((exam) => {
                        const isProcessing = processingId === exam.id;

                        return (
                            <div
                                key={exam.id}
                                className={`
                                    flex items-center justify-between 
                                    p-4 border rounded-lg bg-card
                                    transition-all duration-200
                                    ${isProcessing ? "opacity-50" : "hover:shadow-md"}
                                `}
                            >
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-base truncate">
                                        {exam.title}
                                    </h3>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        handleUnarchive(exam.id, exam.title)
                                    }
                                    disabled={
                                        isProcessing || processingId !== null
                                    }
                                    className="flex items-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Unarchiving...
                                        </>
                                    ) : (
                                        <>
                                            <ArchiveRestore className="h-4 w-4" />
                                            Unarchive
                                        </>
                                    )}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}
        </Wrapper>
    );
}
