import { getStudentSchedulesByInstructor } from "@/lib/actions/instructor";
import ScheduleCalendar from "./ScheduleCalendar";
import BorderBox from "../ui/BorderBox";
import { Calendar1Icon, Clock, MapPin } from "lucide-react";
import { dateFormatter } from "@/utils/date-formatter";
import TertiaryLabel from "../ui/TertiaryLabel";
import Link from "next/link";
import EmptyUi from "../ui/EmptyUi";

export default async function InstructorScheduleOverview() {
    const { data, error } = await getStudentSchedulesByInstructor();

    if (error) {
        return (
            <BorderBox className="bg-card border rounded-xl ">
                Something went wrong while loading schedules
            </BorderBox>
        );
    }

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

    return (
        <BorderBox className="rounded-xl border bg-card flex flex-wrap gap-3 md:gap-5">
            <div className="basis-[400px] grow">
                <div className="mb-4 pb-2 border-b flex items-center gap-2 justify-between">
                    <TertiaryLabel>Student Schedules</TertiaryLabel>
                    {data?.length > 5 && (
                        <Link
                            href="/instructor/schedules"
                            className="text-sm text-muted-foreground hover:text-secondary-foreground"
                        >
                            View all
                        </Link>
                    )}
                </div>

                {data?.length === 0 ? (
                    <EmptyUi
                        message="No Schedules"
                        secondaryMessage="There's nothing in here yet."
                    />
                ) : (
                    data?.slice(0, 5)?.map((s, index) => (
                        <div key={index} className="mb-3">
                            <p>{s?.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {s?.company_name}
                            </p>
                            <div className="p-3 mt-2 rounded-sm bg-muted dark:bg-background flex items-center gap-3 flex-wrap text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar1Icon size={14} />
                                    <p className="text-sm max-w-[200px] truncate">
                                        {dateFormatter(s.date)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    <p className="text-sm max-w-[200px] truncate">
                                        {formatTime(s.time)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    <p className="text-sm max-w-[200px] truncate">
                                        {s.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="grow">
                <ScheduleCalendar schedules={data} />
            </div>
        </BorderBox>
    );
}
