import BorderBox from "@/components/ui/BorderBox";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import FormLabel from "@/components/ui/FormLabel";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { getStudentSchedulesByInstructor } from "@/lib/actions/instructor";
import { dateFormatter } from "@/utils/date-formatter";
import { getScheduleStatus } from "@/utils/get-schedule-status";

export default async function StudentSchedulesPage() {
    const { data, error } = await getStudentSchedulesByInstructor();

    if (error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    console.log(data);

    const formatTime = (timeString) => {
        if (!timeString) return "";

        // Handle both full time strings and time-only strings
        let timePart = timeString;
        if (timeString.includes("T")) {
            timePart = timeString.split("T")[1]?.split(".")[0] || timeString;
        }

        const [hours, minutes] = timePart.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;

        return `${formattedHour}:${minutes.padStart(2, "0")} ${ampm}`;
    };

    const statusColors = {
        past: "bg-gray-100 dark:bg-gray-500/10 text-gray-600 border-gray-200 dark:border-gray-500/20",
        today: "bg-red-100 dark:bg-red-500/10 text-red-600 border-red-200 dark:border-red-500/20",
        upcoming:
            "bg-green-100 dark:bg-green-500/10 text-green-600 border-green-200 dark:border-green-500/20",
    };

    return (
        <div>
            <div className="mb-3">
                <SecondaryLabel>Student Schedules</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    View your students' schedules set by companies.
                </p>
            </div>

            {data?.length === 0 ? (
                <EmptyUi message="No schedule to show." />
            ) : (
                data.map((s) => {
                    const scheduleStatus = getScheduleStatus(s.date);
                    const statusColor =
                        statusColors[scheduleStatus] || statusColors.upcoming;

                    return (
                        <div
                            className="border bg-card rounded-xl mb-3"
                            key={s.id}
                        >
                            <BorderBox className="border-b flex items-center gap-3 justify-between">
                                <div>
                                    <TertiaryLabel>{s.title}</TertiaryLabel>
                                    <p className="text-sm text-muted-foreground">
                                        Company : {s.company_name}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="capitalize rounded-full text-sm py-2 px-3 text-green-600 border-green-500/30 border">
                                        {s.type}
                                    </div>
                                    <div
                                        className={`capitalize rounded-full text-sm py-2 px-3 border ${statusColor}`}
                                    >
                                        {scheduleStatus}
                                    </div>
                                </div>
                            </BorderBox>
                            <BorderBox>
                                <div className="mb-3">
                                    <p className="text-xs text-muted-foreground">
                                        Details
                                    </p>
                                    <p className="whitespace-pre-wrap ">
                                        {s.details}
                                    </p>
                                </div>

                                {s.additional_notes && (
                                    <div className="mb-3">
                                        <p className="text-xs text-muted-foreground">
                                            Additional Notes
                                        </p>
                                        <p className="whitespace-pre-wrap ">
                                            {s.additional_notes}
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className="bg-muted px-3 py-2 rounded-sm">
                                        <p className="text-sm">
                                            {dateFormatter(s.date)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Date
                                        </p>
                                    </div>
                                    <div className="bg-muted px-3 py-2 rounded-sm">
                                        <p className="text-sm">
                                            {formatTime(s.time)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Time
                                        </p>
                                    </div>
                                    <div className="bg-muted px-3 py-2 rounded-sm">
                                        <p className="text-sm max-w-[300px] truncate">
                                            {s.location}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Location
                                        </p>
                                    </div>
                                </div>
                            </BorderBox>
                            <div className="px-3 md:px-5 border-t py-3 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Participants ({s.students?.length})
                                </p>
                                {s.students.map((s) => (
                                    <p key={s.id}>
                                        {s.firstname} {s.lastname}
                                    </p>
                                ))}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
