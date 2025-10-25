"use client";

import { createClient } from "@/lib/supabase/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useCallback, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Loader } from "lucide-react";

export default function QuestionReportsModal({ examId, children }) {
    const [reports, setReports] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchQuestionReports = useCallback(async () => {
        setIsLoading(true);
        setError("");

        const supabase = createClient();
        const { data, error } = await supabase
            .from("questions")
            .select("question_text, attempt_questions(id)")
            .eq("exam_id", examId)
            .eq("is_deleted", false)
            .eq("attempt_questions.is_answer_correct", true);

        if (error) {
            console.error("Error fetching question reports:", error);
            setError(error.message);
            setIsLoading(false);
            return;
        }

        // Map data to { question_text, totalCorrects }
        const reportsData = data.map((question) => ({
            question_text: question.question_text,
            totalCorrects: question.attempt_questions.length,
        }));

        // Sort from highest correct count to lowest
        const sortedReports = reportsData.sort(
            (a, b) => b.totalCorrects - a.totalCorrects
        );

        setReports(sortedReports);
        setIsLoading(false);
    }, [examId]);

    const handleOpenChange = (isOpen) => {
        if (isOpen) fetchQuestionReports();
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>Question Performance Report</DialogTitle>
                    <DialogDescription>
                        This report summarizes how students performed on each
                        question.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[70svh] ">
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader className="animate-spin" size={18} />
                            <p>Loading report...</p>
                        </div>
                    ) : error ? (
                        <div className="text-destructive">
                            Something went wrong while fetching question
                            reports.
                        </div>
                    ) : reports?.length > 0 ? (
                        <div className="space-y-2">
                            {reports.map((report, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-b pb-2 gap-3"
                                >
                                    <p className="line-clamp-2">
                                        {report.question_text}
                                    </p>
                                    <p className="text-muted-foreground text-sm whitespace-nowrap">
                                        {report.totalCorrects} correct
                                        {report.totalCorrects > 1 && "s"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No reports found.</div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
