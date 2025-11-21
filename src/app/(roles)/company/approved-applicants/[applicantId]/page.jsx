import NextStepSection from "@/components/features/approved-applicants/next-step-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { dateFormatter } from "@/utils/date-formatter";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Suspense } from "react";

const links = [
    { href: "", label: "Home" },
    { href: "/company/approved-applicants", label: "Approved Applicants" },
    { href: "", label: "Next Steps" },
];

export default async function Page({ params }) {
    const applicantId = (await params)?.applicantId || "";

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("applicants")
        .select(
            "id, company_id, students!inner(id, firstname, lastname, school, email, avatar_url)"
        )
        .eq("approve_status", "approved")
        .eq("status", "accepted")
        .eq("id", applicantId)
        .maybeSingle();

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    if (!data) {
        return (
            <EmptyUi
                message="No data available"
                secondaryMessage="We could not find any data prior to this application. Please try refreshing the page."
            />
        );
    }

    const student = data?.students;

    // Check for existing pending schedule
    const existingSchedule = await checkExistingSchedule({
        studentId: student.id,
        companyId: data.company_id,
    });

    return (
        <div>
            <Wrapper size="sm">
                <div className="mb-3">
                    <BreadCrumbs links={links} />
                </div>

                {/* HEADER / STUDENT INFO  */}
                <div className="flex items-center gap-3 mb-6">
                    <Avatar className="w-[100px] aspect-square">
                        <AvatarImage
                            src={
                                student?.avatar_url ||
                                "/images/default-avatar.jpg"
                            }
                        />
                        <AvatarFallback>
                            {student?.lastname?.charAt(0) || "?"}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <SecondaryLabel>
                            {student?.firstname} {student?.lastname}
                        </SecondaryLabel>
                        <p className="text-sm text-muted-foreground">
                            {student?.school}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {student?.email}
                        </p>
                    </div>
                </div>

                {/* EXISTING SCHEDULE WARNING */}
                <Suspense fallback={null}>{existingSchedule}</Suspense>

                {/* NEXT STEPS SECTION */}
                <NextStepSection
                    studentId={student.id}
                    studentEmail={student.email}
                    hasExistingSchedule={!!existingSchedule}
                />
            </Wrapper>
        </div>
    );
}

async function checkExistingSchedule({ studentId, companyId }) {
    const supabase = await createClient();

    // Get the current date/time
    const now = new Date().toISOString();

    // Check for pending schedules (upcoming schedules)
    const { data: schedules, error } = await supabase
        .from("schedules")
        .select("id, title, type, date, time, location")
        .eq("student_id", studentId)
        .eq("company_id", companyId)
        .gte("date", now.split("T")[0]) // Only get future or today's schedules
        .order("date", { ascending: true })
        .order("time", { ascending: true })
        .limit(1);

    if (error) {
        console.error("Error checking existing schedule:", error);
        return null;
    }

    // If no existing schedule, return null
    if (!schedules || schedules.length === 0) {
        return null;
    }

    const schedule = schedules[0];

    // Format time
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

    // Check if the schedule is today
    const isToday = () => {
        const today = new Date();
        const scheduleDate = new Date(schedule.date);
        return (
            today.getFullYear() === scheduleDate.getFullYear() &&
            today.getMonth() === scheduleDate.getMonth() &&
            today.getDate() === scheduleDate.getDate()
        );
    };

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

    return (
        <div className="mb-6 bg-amber-50 dark:bg-yellow-300/10 border border-amber-200 dark:border-yellow-300/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
                {/* <div className="p-2 bg-amber-100 dark:bg-amber-300/10 rounded-lg shrink-0">
                    <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div> */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-amber-800 dark:text-amber-400">
                            Pending Schedule
                        </h3>
                        {isToday() && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                                Today
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-amber-800 dark:text-amber-400 mb-3">
                        This student already has a scheduled {schedule.type}.
                    </p>

                    <div className="bg-card rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                                    typeColors[schedule.type] ||
                                    typeColors.meeting
                                }`}
                            >
                                {schedule.type.charAt(0).toUpperCase() +
                                    schedule.type.slice(1)}
                            </span>
                            <p className="font-medium text-secondary-foreground text-sm">
                                {schedule.title}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{dateFormatter(schedule.date)}</span>
                            </div>

                            {schedule.time && (
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatTime(schedule.time)}</span>
                                </div>
                            )}

                            {schedule.location && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    <span className="truncate max-w-xs">
                                        {schedule.location}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <p className="text-xs text-amber-700 dark:text-amber-400 mt-3">
                        💡 You can create a new schedule after this one is
                        completed or cancelled.
                    </p> */}
                </div>
            </div>
        </div>
    );
}
