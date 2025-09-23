import ExamQuestionForm from "@/components/forms/ExamQuestionForm";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getExamById } from "@/lib/actions/exam";
import { notFound } from "next/navigation";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TertiaryLabel from "@/components/ui/TertiaryLabel";

export default async function Page({ params }) {
    const { examId } = await params;

    if (!examId) {
        notFound();
    }

    const { user } = await getCurrentUser();

    const supabase = await createClient();

    // check from exam attempt table if student already took the exam
    const { data: attempts, error: attemptsError } = await supabase
        .from("exam_attempt")
        .select("id")
        .eq("student_id", user.id)
        .eq("exam_id", examId);

    if (attemptsError) {
        return (
            <ErrorUi
                message="Failed to check exam attempts."
                secondaryMessage={attemptsError.message}
            />
        );
    }

    if (attempts && attempts.length > 0) {
        return (
            <div className="py-10 px-3 flex flex-col items-center justify-center">
                <TertiaryLabel>You already answered the exam.</TertiaryLabel>
                <p className="text-center mb-6 mt-2">
                    You can check your examination results now or browse other
                    exams.
                </p>
                <div className="flex flex-col gap-2">
                    <Button variant="secondary" asChild>
                        <Link href="/student/my-exams/recent">
                            View Recent Exams
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/student/exams">Browse Exams</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const { data: exam, error } = await getExamById(examId);

    if (error) {
        return (
            <ErrorUi
                message="Something went wrong while starting the exam."
                secondaryMessage={error}
            />
        );
    }

    if (!exam || exam.length === 0) {
        notFound();
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <SidebarTrigger />
                <Popover>
                    <PopoverTrigger>
                        <IconWrapper className="cursor-pointer ms-auto">
                            <Info size={20} />
                        </IconWrapper>
                    </PopoverTrigger>
                    <PopoverContent align="end">
                        <div className="flex flex-col gap-3">
                            <p>Reminders</p>
                            {exam.passing && (
                                <p className="text-xs text-muted-foreground">
                                    Passing score: {exam.passing}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Auto submit when time expires.
                            </p>
                            <p className="text-xs text-amber-600 dark:text-amber-400/90">
                                Switching tabs or leaving the window will result
                                in immediate forfeit.
                            </p>

                            <p className="text-xs text-amber-600 dark:text-amber-400/90">
                                Avoid refreshing the page or you will lose your
                                progress.
                            </p>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <SecondaryLabel className="mb-2 mt-3 md:mt-4">
                {exam.title}
            </SecondaryLabel>

            <p className="text-muted-foreground">
                {exam?.description
                    ? exam?.description
                    : "No description provided."}
            </p>
            {exam?.instruction && (
                <p className="text-sm text-muted-foreground mt-3">
                    <span className="text-primary-text">Instruction</span> :{" "}
                    {exam.instruction}
                </p>
            )}

            {/* Examination question Form  */}
            <ExamQuestionForm examinationData={exam || []} />
        </div>
    );
}
