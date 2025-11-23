"use client";

import { dateFormatter } from "@/utils/date-formatter";
import { getScheduleStatus } from "@/utils/get-schedule-status";
import {
    Calendar,
    Clock,
    MapPin,
    FileText,
    User,
    Building2,
    MoreVertical,
    Edit,
    Trash2,
    Loader,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import TertiaryLabel from "./TertiaryLabel";
import DeleteScheduleModal from "../modals/DeleteScheduleModal";
import EditScheduleModal from "../modals/EditScheduleModal";

export default function ScheduleCard({
    schedule,
    onEdit,
    onDelete,
    viewType = "company",
}) {
    const status = getScheduleStatus(schedule.date, schedule.time);
    const isPast = status === "past";
    const isToday = status === "today";
    const isUpcoming = status === "upcoming";

    // Type badge colors
    const typeColors = {
        interview:
            "bg-green-100 dark:bg-green-500/10 text-green-500 border-green-200 dark:border-green-500/20",
        orientation:
            "bg-blue-100 dark:bg-blue-500/10 text-blue-500 border-blue-200 dark:border-blue-500/20",
        meeting: "bg-purple-100 text-purple-600 border-purple-200",
        training: "bg-green-100 text-green-600 border-green-200",
        evaluation: "bg-orange-100 text-orange-600 border-orange-200",
    };

    // Format time helper
    const formatTime = (timeString) => {
        if (!timeString) return null;
        const [hours, minutes] = timeString.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div
            className={`bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isPast ? "opacity-75" : ""}`}
        >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        {/* Type Badge */}
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColors[schedule.type] || typeColors.meeting}`}
                            >
                                {schedule.type.charAt(0).toUpperCase() +
                                    schedule.type.slice(1)}
                            </span>
                            {isToday && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 animate-pulse">
                                    Today
                                </span>
                            )}
                            {isPast && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                    Completed
                                </span>
                            )}
                            {isUpcoming && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                    Upcoming
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold">
                            {schedule.title}
                        </h3>

                        {schedule?.updated_at && (
                            <p className="text-xs text-muted-foreground">
                                Updated: {dateFormatter(schedule.updated_at)}
                            </p>
                        )}
                    </div>

                    {/* Actions Dropdown */}
                    {!isPast && (
                        <div className="relative group">
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-1 w-48 bg-neutral-50 overflow-hidden rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <EditScheduleModal editData={schedule} />

                                <DeleteScheduleModal
                                    scheduleId={schedule.schedule_id}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 space-y-3">
                {/* Date & Time */}
                <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3">
                        <div
                            className={`p-2 rounded-lg ${isToday ? "bg-red-100 dark:bg-red-500/10" : "bg-blue-50 dark:bg-blue-500/10"}`}
                        >
                            <Calendar
                                className={`w-5 h-5 ${isToday ? "text-red-600" : "text-blue-600"}`}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">
                                Date
                            </p>
                            <p className="text-sm font-medium">
                                {dateFormatter(schedule.date)}
                            </p>
                        </div>
                    </div>

                    {schedule.time && (
                        <div className="flex items-start gap-3">
                            <div
                                className={`p-2 rounded-lg ${isToday ? "bg-red-100 dark:bg-red-500/10 " : "bg-purple-50 dark:bg-purple-500/10"}`}
                            >
                                <Clock
                                    className={`w-5 h-5 ${isToday ? "text-red-600" : "text-purple-600"}`}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground mb-0.5">
                                    Time
                                </p>
                                <p className="text-sm font-medium">
                                    {formatTime(schedule.time)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg shrink-0">
                        <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                            Location
                        </p>
                        <p className="text-sm font-medium break-words">
                            {schedule.location}
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg shrink-0">
                        <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                            Details
                        </p>
                        <p className="text-sm whitespace-pre-wrap">
                            {schedule.details}
                        </p>
                    </div>
                </div>

                {/* Additional Notes */}
                {schedule.additional_notes && (
                    <div className="bg-amber-50  dark:bg-amber-300/10 border border-amber-200 dark:border-amber-300/10 rounded-lg p-3">
                        <p className="text-xs font-medium text-amber-800 dark:text-amber-300 mb-1">
                            📝 Additional Notes
                        </p>
                        <p className="text-sm text-amber-900 dark:text-amber-300">
                            {schedule.additional_notes}
                        </p>
                    </div>
                )}

                {/* Participant Info */}
                <div className="pt-3 border-t">
                    <div className="flex flex-col gap-4">
                        <TertiaryLabel>Participants</TertiaryLabel>
                        {viewType === "company" ? (
                            schedule?.students?.map((student) => (
                                <div
                                    key={student.id}
                                    className="flex items-center gap-2"
                                >
                                    <Avatar className="w-[30px] aspect-square">
                                        <AvatarImage
                                            src={
                                                student?.avatar_url ||
                                                "/images/default-avatar.jpg"
                                            }
                                            alt="image"
                                        />
                                        <AvatarFallback>?</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Student
                                        </p>
                                        <p className="text-sm font-medium text-secondary-foreground">
                                            {student.firstname}{" "}
                                            {student.lastname}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-gray-100 rounded-full">
                                    <Building2 className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Company
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {schedule.companies.name}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* <Button
                            className={`${
                                isPast
                                    ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                                    : isToday
                                      ? "bg-red-600 text-white hover:bg-red-700"
                                      : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                            disabled={isPast}
                        >
                            {isPast ? "Completed" : "View Details"}
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
