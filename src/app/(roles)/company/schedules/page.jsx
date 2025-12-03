import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import ScheduleCard from "@/components/ui/ScheduleCard";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCompanySchedules } from "@/lib/actions/schedule";
import { Calendar } from "lucide-react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getScheduleStatus } from "@/utils/get-schedule-status";

export default async function SchedulesPage() {
    const { data, error } = await getCompanySchedules();

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    // Filter schedules based on status
    const upcoming =
        data?.filter((schedule) => {
            const status = getScheduleStatus(schedule.date, schedule.time);

            return (
                schedule?.status !== "cancelled" &&
                (status === "upcoming" || status === "today")
            );
        }) || [];

    // const completed =
    //     data?.filter((schedule) => {
    //         const status = getScheduleStatus(schedule.date, schedule.time);

    //         const isPostPoneCompleted = schedule.postpone_date
    //             ? getScheduleStatus(schedule.postpone_date) === "past"
    //             : false;

    //         return (
    //             status === "past" &&
    //             isPostPoneCompleted &&
    //             schedule.status !== "cancelled"
    //         );
    //     }) || [];

    const completed =
        data?.filter((schedule) => {
            const status = getScheduleStatus(schedule.date, schedule.time);

            return status === "past" && schedule.status !== "cancelled";
        }) || [];

    // const postponed =
    //     data?.filter((schedule) => {
    //         const noNewSched = schedule.postpone_date === null;

    //         return (
    //             schedule.status === "postponed" &&
    //             noNewSched &&
    //             schedule.status !== "cancelled"
    //         );
    //     }) || [];

    const cancelled = data?.filter((s) => s?.status === "cancelled");

    const totalSchedules = data?.length || 0;

    return (
        <div>
            <div className="flex items-center gap-2 justify-between flex-wrap">
                <div>
                    <SecondaryLabel>Schedules</SecondaryLabel>
                </div>
                <Button asChild>
                    <Link href="/company/approved-applicants/next-steps">
                        <Calendar />
                        Create New Schedule
                    </Link>
                </Button>
            </div>

            {totalSchedules === 0 ? (
                <EmptyUi
                    message="No Schedules Created"
                    secondaryMessage="Create your first schedule to organize interviews, orientations, and meetings with students."
                    action={
                        <Button asChild>
                            <Link href="/company/approved-applicants/next-steps">
                                <Calendar />
                                Create Schedule
                            </Link>
                        </Button>
                    }
                />
            ) : (
                <div className="space-y-3">
                    <Tabs defaultValue="upcoming" className="w-full">
                        <div className="overflow-x-auto">
                            <TabsList className="h-[40px] space-x-2">
                                <TabsTrigger
                                    value="upcoming"
                                    className="relative"
                                >
                                    Upcoming
                                    {upcoming.length > 0 && (
                                        <span className="size-4 rounded-full bg-primary text-white flex items-center justify-center">
                                            {upcoming.length}
                                        </span>
                                    )}
                                </TabsTrigger>

                                {/* <TabsTrigger
                                    value="postponed"
                                    className="relative"
                                >
                                    Postponed
                                    {postponed.length > 0 && (
                                        <span className="size-4 rounded-full bg-primary text-white flex items-center justify-center">
                                            {postponed.length}
                                        </span>
                                    )}
                                </TabsTrigger> */}

                                <TabsTrigger
                                    value="completed"
                                    className="relative"
                                >
                                    Completed
                                    {completed.length > 0 && (
                                        <span className="size-4 rounded-full bg-primary text-white flex items-center justify-center">
                                            {completed.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="cancelled"
                                    className="relative"
                                >
                                    Cancelled
                                    {cancelled.length > 0 && (
                                        <span className="size-4 rounded-full bg-primary text-white flex items-center justify-center">
                                            {cancelled.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="upcoming">
                            {upcoming.length === 0 ? (
                                <BorderBox className="text-center">
                                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Upcoming Schedules
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        All your schedules are completed. Create
                                        new schedules to see them here.
                                    </p>
                                    <Button asChild>
                                        <Link href="/company/approved-applicants/next-steps">
                                            Create New Schedule
                                        </Link>
                                    </Button>
                                </BorderBox>
                            ) : (
                                <div className="space-y-3">
                                    {upcoming.map((schedule) => (
                                        <ScheduleCard
                                            key={schedule.schedule_id}
                                            schedule={schedule}
                                            viewType="company"
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* <TabsContent value="postponed">
                            {postponed.length === 0 ? (
                                <BorderBox className="text-center">
                                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Postponed Schedules
                                    </h3>
                                </BorderBox>
                            ) : (
                                <div className="space-y-3">
                                    {postponed.map((schedule) => (
                                        <ScheduleCard
                                            key={schedule.schedule_id}
                                            schedule={schedule}
                                            viewType="company"
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent> */}

                        <TabsContent value="completed">
                            {completed.length === 0 ? (
                                <BorderBox className="text-center">
                                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Completed Schedules
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Completed schedules will appear here
                                        once they've passed.
                                    </p>
                                </BorderBox>
                            ) : (
                                <div className="space-y-3">
                                    {completed.map((schedule) => (
                                        <ScheduleCard
                                            key={schedule.schedule_id}
                                            schedule={schedule}
                                            viewType="company"
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="cancelled">
                            {cancelled.length === 0 ? (
                                <BorderBox className="text-center">
                                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Cancelled Schedules
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Cancelled schedules will appear here.
                                    </p>
                                </BorderBox>
                            ) : (
                                <div className="space-y-3">
                                    {cancelled.map((schedule) => (
                                        <ScheduleCard
                                            key={schedule.schedule_id}
                                            schedule={schedule}
                                            viewType="company"
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    );
}
