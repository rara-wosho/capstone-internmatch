import { createClient } from "@/lib/supabase/server";
import { Calendar, Clock, MapPin, Users, FileText } from "lucide-react";

export default async function CompanyScheduleOverview({ id }) {
    const supabase = await createClient();

    // Fetch upcoming schedules for the company
    const { data: schedules, error } = await supabase
        .from("schedules")
        .select(
            `
            id,
            type,
            title,
            date,
            time,
            location,
            details,
            students!inner(firstname,lastname)
        `
        )
        .eq("company_id", id)
        .gte("date", new Date().toISOString().split("T")[0])
        .order("date", { ascending: true })
        .order("time", { ascending: true })
        .limit(5);

    if (error) {
        console.error("Error fetching schedules:", error);
        return (
            <div className="p-6 text-center text-destructive">
                <p>Failed to load schedules</p>
            </div>
        );
    }

    if (!schedules || schedules.length === 0) {
        return (
            <div className="p-6 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                    No Upcoming Schedules
                </h3>
                <p className="text-muted-foreground text-sm">
                    You don't have any upcoming interviews or orientations
                    scheduled.
                </p>
            </div>
        );
    }

    const getScheduleIcon = (type) => {
        switch (type) {
            case "interview":
                return <Users className="h-4 w-4" />;
            case "orientation":
                return <Calendar className="h-4 w-4" />;
            case "document_review":
                return <FileText className="h-4 w-4" />;
            default:
                return <Calendar className="h-4 w-4" />;
        }
    };

    const getScheduleTypeLabel = (type) => {
        switch (type) {
            case "interview":
                return "Interview";
            case "orientation":
                return "Orientation";
            case "document_review":
                return "Document Review";
            default:
                return "Meeting";
        }
    };

    const getScheduleColor = (type) => {
        switch (type) {
            case "interview":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "orientation":
                return "bg-green-100 text-green-800 border-green-200";
            case "document_review":
                return "bg-purple-100 text-purple-800 border-purple-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Reset time part for date comparison
        const normalizedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        const normalizedToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const normalizedTomorrow = new Date(
            tomorrow.getFullYear(),
            tomorrow.getMonth(),
            tomorrow.getDate()
        );

        if (normalizedDate.getTime() === normalizedToday.getTime())
            return "Today";
        if (normalizedDate.getTime() === normalizedTomorrow.getTime())
            return "Tomorrow";

        const options = { weekday: "short", month: "short", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

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
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Upcoming Schedules</h3>
                <span className="text-sm text-muted-foreground">
                    {schedules.length} upcoming
                </span>
            </div>

            <div className="space-y-3">
                {schedules.map((schedule) => (
                    <div
                        key={schedule.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`p-1 rounded-full ${getScheduleColor(schedule.type)}`}
                                >
                                    {getScheduleIcon(schedule.type)}
                                </div>
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${getScheduleColor(schedule.type)}`}
                                >
                                    {getScheduleTypeLabel(schedule.type)}
                                </span>
                            </div>
                        </div>

                        <h4 className="font-semibold text-sm mb-2 line-clamp-1">
                            {schedule.title}
                        </h4>

                        {/* Student Info */}
                        {schedule.students && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                <Users className="h-3 w-3" />
                                <span>
                                    {schedule.students.firstname}{" "}
                                    {schedule.students.lastname}
                                </span>
                            </div>
                        )}

                        {/* Schedule Details */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="font-medium">
                                    {formatDate(schedule.date)} •{" "}
                                    {formatTime(schedule.time)}
                                </span>
                            </div>

                            {schedule.location && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    <span className="line-clamp-1">
                                        {schedule.location}
                                    </span>
                                </div>
                            )}
                        </div>

                        {schedule.details && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {schedule.details}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* View All Link */}
            {schedules.length >= 5 && (
                <div className="pt-2 border-t">
                    <button className="text-sm text-primary hover:text-primary/80 font-medium">
                        View all schedules →
                    </button>
                </div>
            )}
        </div>
    );
}
