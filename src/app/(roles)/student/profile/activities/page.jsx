import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import Wrapper from "@/components/Wrapper";
import { getStudentActivityLogs } from "@/lib/actions/student";
import { dateFormatter } from "@/utils/date-formatter";
import { ArrowUpRight, ClipboardList } from "lucide-react";
import Link from "next/link";

export default async function StudentActivitiesPage() {
    const { data, error } = await getStudentActivityLogs();

    if (error) {
        return (
            <ErrorUi secondaryMessage="Something went wrong while loading activity logs." />
        );
    }

    return (
        <Wrapper size="sm">
            <SecondaryLabel className="mb-3 space-x-2">
                <IconWrapper>
                    <ClipboardList size={17} />
                </IconWrapper>
                <p>Activity Logs</p>
            </SecondaryLabel>

            <div className="flex flex-col gap-3">
                <TitleText>
                    Applications{" "}
                    {data?.applications?.length === 0 && (
                        <span className="text-muted-foreground ms-1">
                            {data?.applications.length} Activity
                        </span>
                    )}
                </TitleText>
                {data?.applications?.map((application) => (
                    <div
                        className="p-4 rounded-xl bg-card shadow-xs flex items-center justify-between gap-3 flex-wrap"
                        key={application.id}
                    >
                        <div className="flex flex-col">
                            <p className="text-secondary-label mb-2">
                                {dateFormatter(
                                    application.applied_at,
                                    true,
                                    true
                                )}
                            </p>

                            <p className="text-muted-foreground text-sm">
                                {data.firstname} {data.lastname} submitted an
                                application. Current status :{" "}
                                <span className="text-secondary-foreground capitalize font-medium">
                                    {application.status}
                                </span>
                            </p>
                        </div>

                        <Button size="sm" variant="outline" asChild>
                            <Link href="/student/applications">
                                View <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                ))}
                <TitleText>
                    Exam Attempts{" "}
                    {data?.exam_attempts?.length === 0 && (
                        <span className="text-muted-foreground ms-1">
                            {data?.exam_attempts.length} Activity
                        </span>
                    )}
                </TitleText>
                {data?.exam_attempts?.map((attempt) => (
                    <div
                        className="p-4 rounded-xl bg-card shadow-xs flex items-center justify-between gap-3 flex-wrap"
                        key={attempt.id}
                    >
                        <div className="flex flex-col">
                            <p className="text-secondary-label mb-2">
                                {dateFormatter(
                                    attempt.completed_at,
                                    true,
                                    true
                                )}
                            </p>

                            <p className="text-muted-foreground text-sm">
                                {data.firstname} {data.lastname} took an
                                examination : {attempt.exam_title}
                            </p>
                        </div>

                        <Button size="sm" variant="outline" asChild>
                            <Link href="/student/my-exams/recent">
                                View <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                ))}

                <TitleText>Account</TitleText>
                <div className="rounded-xl bg-card shadow-xs p-4">
                    <p className="text-secondary-label mb-2">
                        {dateFormatter(data?.created_at, true, true)}
                    </p>

                    <p className="text-muted-foreground text-sm">
                        {data.firstname} {data.lastname} joined InternMatch.
                    </p>
                </div>
            </div>
        </Wrapper>
    );
}
