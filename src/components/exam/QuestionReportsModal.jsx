"use client";

import { createClient } from "@/lib/supabase/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useCallback, useState } from "react";

export default function QuestionReportsModal({ examId, children }) {
    const [reports, setReports] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchQuestionReports = useCallback(async () => {
        setIsLoading(true);

        const supabase = createClient();
        const { data, error } = await supabase
            .from("questions")
            .select("question_text")
            .eq("exam_id", examId);

        if (error) {
            console.error("Error fetching question reports:", error);
        }

        setReports(data);

        setIsLoading(false);
    }, [examId]);

    const handleOpenChange = (isOpen) => {
        if (isOpen) {
            fetchQuestionReports();
        }
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Question Reports</DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading report...</div>
                ) : (
                    <div>
                        {reports?.length > 0 ? (
                            // Render your reports here
                            <pre>{JSON.stringify(reports, null, 2)}</pre>
                        ) : (
                            <div>No reports found.</div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
