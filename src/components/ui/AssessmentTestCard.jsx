import Link from "next/link";
import BorderBox from "./BorderBox";
import { Button } from "./button";

export default function AssessmentTestCard({ assessmentTest }) {
    return (
        <BorderBox className="border rounded-xl bg-card shadow-xs">
            <p className="mb-1">{assessmentTest.assessment_title}</p>

            <p className="text-sm text-muted-foreground mb-3">
                {assessmentTest.assessment_description
                    ? assessmentTest.assessment_description
                    : "No description provided."}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
                <div className="rounded-full px-3 h-7 text-secondary-foreground capitalize inline-flex items-center text-sm bg-muted">
                    {assessmentTest.assessment_difficulty}
                </div>

                {assessmentTest.hasAttempted && (
                    <div className="rounded-full px-3 h-7 text-green-600 dark:text-green-500 capitalize inline-flex items-center text-sm bg-green-600/10">
                        Already Answered
                    </div>
                )}
            </div>

            <div className="pt-4 mt-4 border-t flex items-end justify-between gap-2">
                {assessmentTest.hasAttempted ? (
                    <Button variant="default" asChild>
                        <Link
                            href={`/student/assessment-result/${assessmentTest.id}`}
                        >
                            View Result
                        </Link>
                    </Button>
                ) : (
                    <Button asChild variant="default">
                        <Link
                            href={`/student/assessment-test/${assessmentTest.id}/start`}
                        >
                            View Details
                        </Link>
                    </Button>
                )}
            </div>
        </BorderBox>
    );
}
