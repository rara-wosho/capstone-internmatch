import { getScheduleByStudent } from "@/lib/actions/student";
import BorderBox from "../ui/BorderBox";
import TitleText from "../ui/TitleText";
import { getScheduleStatus } from "@/utils/get-schedule-status";
import IconWrapper from "../ui/IconWrapper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function StudentUpcomingSchedules({ userId }) {
    const { data, error } = await getScheduleByStudent(userId);

    if (error) {
        return (
            <BorderBox className="text-muted-foreground text-center">
                Unable to load upcoming schedules
            </BorderBox>
        );
    }

    // Filter only upcoming schedules
    const upcomingSchedules =
        data?.filter(
            (schedule) => getScheduleStatus(schedule.date) === "upcoming"
        ) || [];

    return (
        <>
            <BorderBox className="border-b flex items-center gap-2 justify-between">
                <TitleText>Upcoming Schedules</TitleText>

                {upcomingSchedules?.length > 3 && (
                    <Link
                        href="/student/schedules"
                        className="text-sm text-muted-foreground hover:text-accent-foreground"
                    >
                        See all
                    </Link>
                )}
            </BorderBox>

            <BorderBox>
                {upcomingSchedules.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No upcoming schedules. Stay tuned for more updates.
                    </p>
                ) : (
                    <div className="space-y-1.5">
                        {upcomingSchedules.map((schedule) => (
                            <div
                                key={schedule.id}
                                className="border rounded-sm p-2 bg-secondary"
                            >
                                <h4 className="font-medium text-sm">
                                    {schedule.title || "Schedule"}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(
                                        schedule.date
                                    ).toLocaleDateString()}{" "}
                                    •
                                    {schedule.company_name &&
                                        ` with ${schedule.company_name}`}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </BorderBox>
        </>
    );
}
