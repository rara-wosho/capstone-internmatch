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
            return status === "upcoming" || status === "today";
        }) || [];

    const completed =
        data?.filter((schedule) => {
            const status = getScheduleStatus(schedule.date, schedule.time);
            return status === "past";
        }) || [];

    const totalSchedules = data?.length || 0;

    return (
        <div>
            <div className="flex items-center gap-2 justify-between flex-wrap">
                <div>
                    <SecondaryLabel>Schedules</SecondaryLabel>
                    {/* {totalSchedules > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                            {totalSchedules} schedule
                            {totalSchedules !== 1 ? "s" : ""} total
                        </p>
                    )} */}
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
                        <TabsList className="h-[50px] space-x-2">
                            <TabsTrigger value="upcoming" className="relative">
                                Upcoming
                                {upcoming.length > 0 && (
                                    <span className="size-4 rounded-full bg-primary text-white flex items-center justify-center">
                                        {upcoming.length}
                                    </span>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="completed" className="relative">
                                Completed
                                {completed.length > 0 && (
                                    <span className="size-4 rounded-full bg-primary text-white flex items-center justify-center">
                                        {completed.length}
                                    </span>
                                )}
                            </TabsTrigger>
                        </TabsList>

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
                    </Tabs>
                </div>
            )}
        </div>
    );
}
