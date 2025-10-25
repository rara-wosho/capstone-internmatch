"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconWrapper from "@/components/ui/IconWrapper";
import { Trash } from "lucide-react";

import { getCompanyTrashItems } from "@/lib/actions/company";

import { useEffect, useState } from "react";
import { restoreExam } from "@/lib/actions/exam";
import { restoreQuestion } from "@/lib/actions/question";
import { toast } from "sonner";

export default function CompanyTrashPage() {
    const [data, setData] = useState({
        deletedExams: [],
        deletedQuestions: [],
    });
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        async function loadTrash() {
            const result = await getCompanyTrashItems();
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error);
            }

            setFetching(false);
        }
        loadTrash();
    }, []);

    const handleRestoreExam = async (id) => {
        const promise = restoreExam(id).then((res) => {
            if (!res.success) throw new Error(res.error);
            setData((prev) => ({
                ...prev,
                deletedExams: prev.deletedExams.filter((e) => e.id !== id),
            }));
        });

        toast.promise(promise, {
            loading: "Restoring exam...",
            success: "Exam restored successfully!",
            error: "Failed to restore exam.",
        });

        startTransition(() => promise);
    };
    const handleRestoreQuestion = async (id) => {
        const promise = restoreQuestion(id).then((res) => {
            if (!res.success) throw new Error(res.error);
            setData((prev) => ({
                ...prev,
                deletedQuestions: prev.deletedQuestions.filter(
                    (e) => e.id !== id
                ),
            }));
        });

        toast.promise(promise, {
            loading: "Restoring question...",
            success: "Question restored successfully!",
            error: "Failed to restore question.",
        });

        startTransition(() => promise);
    };

    if (error) return <ErrorUi secondaryMessage={error} />;

    const { deletedExams, deletedQuestions } = data;

    return (
        <div>
            <div className="mb-4">
                <SecondaryLabel className="space-x-2">
                    <IconWrapper>
                        <Trash size={18} />
                    </IconWrapper>
                    <p>Trash</p>
                </SecondaryLabel>
            </div>

            <Tabs defaultValue="exams" className="w-full">
                <div className="border-b overflow-x-auto overflow-y-hidden">
                    <TabsList className="h-[55px] gap-3.5 pt-[2px]">
                        <TabsTrigger value="exams">Exams</TabsTrigger>
                        <TabsTrigger value="questions">Questions</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="exams">
                    {deletedExams.length === 0 ? (
                        <div className="text-muted-foreground mt-4">
                            {fetching ? (
                                <div>Loading trash items...</div>
                            ) : (
                                <div>No deleted exam.</div>
                            )}
                        </div>
                    ) : (
                        deletedExams.map((e) => (
                            <div
                                className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                                key={e.id}
                            >
                                <span>{e.title}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isPending}
                                    onClick={() => handleRestoreExam(e.id)}
                                >
                                    Restore
                                </Button>
                            </div>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="questions">
                    {deletedQuestions.length === 0 ? (
                        <p className="text-muted-foreground mt-4">
                            No deleted questions.
                        </p>
                    ) : (
                        deletedQuestions.map((q) => (
                            <div
                                className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                                key={q.id}
                            >
                                <span>{q.question_text}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isPending}
                                    onClick={() => handleRestoreQuestion(q.id)}
                                >
                                    Restore
                                </Button>
                            </div>
                        ))
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
