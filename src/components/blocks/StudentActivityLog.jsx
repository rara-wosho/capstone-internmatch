import BorderBox from "../ui/BorderBox";
import { getStudentActivityLogs } from "@/lib/actions/student";
import { dateFormatter } from "@/utils/date-formatter";

export default async function StudentActivityLog() {
    const { data, activityDates, error } = await getStudentActivityLogs(1);

    return (
        <BorderBox>
            {error && (
                <p className="text-sm text-muted-foreground">
                    Something went wrong while fetching activity logs.
                </p>
            )}

            <div className="space-y-3 text-muted-foreground">
                {data?.applicants.length > 0 &&
                    data?.applicants.map((application) => (
                        <div key={application.id} className="flex flex-col">
                            <p className="text-xs mb-1">
                                {dateFormatter(application.applied_at)}
                            </p>
                            <p className="text-sm">
                                {data?.firstname} {data?.lastname} submitted an
                                application. Current status :{" "}
                                <span className="text-secondary-foreground">
                                    {application.status}.
                                </span>
                            </p>
                        </div>
                    ))}
                {data?.exam_attempt.length > 0 &&
                    data?.exam_attempt.map((attempt) => (
                        <div
                            key={attempt.completed_at}
                            className="flex flex-col"
                        >
                            <p className="text-xs mb-1">
                                {dateFormatter(attempt.completed_at)}
                            </p>
                            <p className="text-sm">
                                {data?.firstname} {data?.lastname} took an exam
                                {" : "}
                                <span className="text-secondary-foreground">
                                    {attempt.exam_title}.
                                </span>
                            </p>
                        </div>
                    ))}
                {data && (
                    <div className="flex flex-col">
                        <p className="text-xs  mb-1">
                            {dateFormatter(data?.created_at)}
                        </p>
                        <p className="text-sm">
                            <span className="text-secondary-foreground">
                                {data?.firstname} {data?.lastname}
                            </span>{" "}
                            joined InternMatch.
                        </p>
                    </div>
                )}
            </div>
        </BorderBox>
    );
}
