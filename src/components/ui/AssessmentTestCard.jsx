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

export default function AssessmentTestCard({ assessmentTest }) {
    const questionCount = assessmentTest?.assessment_questions?.length || 0;

    return (
        <BorderBox className="border rounded-xl bg-card shadow-xs flex flex-col">
            <p className="mb-1">{assessmentTest.assessment_title}</p>

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
                            View Details
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
                        <div className="py-2">
                            <p>
                                Switching tabs is prohibited and may result to
                                auto submission of the test once violation is
                                commited.
                            </p>
                        </div>
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
