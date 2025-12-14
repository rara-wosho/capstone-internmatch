import Link from "next/link";
import BorderBox from "./BorderBox";
import { Button } from "./button";
import { cn } from "@/lib/utils";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formatDuration } from "@/utils/format-duration";

export default function AssessmentTestCard({ assessmentTest }) {
    const questionCount = assessmentTest?.assessment_questions?.length || 0;

    return (
        <BorderBox className="border rounded-xl bg-card shadow-xs flex flex-col">
            <div className="mb-1">
                <p>{assessmentTest.assessment_title}</p>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
                {assessmentTest.assessment_description
                    ? assessmentTest.assessment_description
                    : "No description provided."}
            </p>

            <div className="flex items-center gap-2 flex-wrap mb-4">
                <div className="rounded-full px-3 h-7 text-secondary-foreground capitalize inline-flex items-center text-sm bg-muted">
                    {assessmentTest.assessment_difficulty}
                </div>

                {assessmentTest.hasAttempted && (
                    <div className="rounded-full px-3 h-7 text-green-600 dark:text-green-500 capitalize inline-flex items-center text-sm bg-green-600/10">
                        Already Answered
                    </div>
                )}
            </div>

            <div className="py-2 mt-auto text-sm">
                {questionCount} total questions.
            </div>

            <div className="pt-4 border-t flex items-end gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button disabled={assessmentTest.hasAttempted}>
                            Take Test
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Start Assessment Test?</DialogTitle>
                            <DialogDescription>
                                Before starting the assessment test, make sure
                                that you read the reminders below.
                            </DialogDescription>
                        </DialogHeader>
                        <ul className="list-disc ps-6 bg-amber-500/10 p-2 rounded-md mb-3 border border-amber-500/40 space-y-2">
                            <li className="text-amber-600 dark:text-amber-400 text-sm">
                                Switching tabs is prohibited and may result to
                                forfeiture of the test once violation is
                                commited.
                            </li>
                            <li className="text-amber-600 dark:text-amber-400 text-sm">
                                Time limit :{" "}
                                <span className="font-bold">
                                    {formatDuration(assessmentTest?.time_limit)}
                                </span>
                            </li>
                        </ul>
                        <Button asChild>
                            <Link
                                href={`/student/assessment-test/${assessmentTest.id}/start`}
                                className={cn(
                                    assessmentTest.hasAttempted &&
                                        "pointer-events-none opacity-50"
                                )}
                            >
                                Start Test
                            </Link>
                        </Button>
                    </DialogContent>
                </Dialog>
                {assessmentTest.hasAttempted && (
                    <Button variant="outline" asChild>
                        <Link
                            href={`/student/assessment-result/${assessmentTest.attemptDetails.id}`}
                        >
                            View Result
                        </Link>
                    </Button>
                )}
            </div>
        </BorderBox>
    );
}
