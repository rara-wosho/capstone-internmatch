import ErrorUi from "@/components/ui/ErrorUi";
import ScheduleCard from "@/components/ui/ScheduleCard";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/actions/auth";
import { getScheduleByStudent } from "@/lib/actions/student";
import { getScheduleStatus } from "@/utils/get-schedule-status";

export default async function SchedulesPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return <ErrorUi secondaryMessage={"Unauthorized User"} />;
    }

    const { data, error } = await getScheduleByStudent(user.id);

    if (error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    // Add date status to each schedule using the existing data.date field
    const schedulesWithStatus =
        data?.map((schedule) => ({
            ...schedule,
            dateStatus: getScheduleStatus(schedule.date),
        })) || [];

    // Filter schedules for each tab
    const allSchedules = schedulesWithStatus;
    const upcomingSchedules = schedulesWithStatus.filter(
        (schedule) => schedule.dateStatus === "upcoming"
    );
    const todaySchedules = schedulesWithStatus.filter(
        (schedule) => schedule.dateStatus === "today"
    );
    const completedSchedules = schedulesWithStatus.filter(
        (schedule) => schedule.dateStatus === "past"
    );

    return (
        <div>
            <div className="mb-3">
                <SecondaryLabel>Schedules</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    This page shows all scheduled activities related to your
                    internship, including interviews, meetings, and
                    orientations.
                </p>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="h-[35px] space-x-2 mb-2 overflow-x-hidden">
                    <TabsTrigger value="all">
                        All ({allSchedules.length})
                    </TabsTrigger>
                    <TabsTrigger value="upcoming">
                        Upcoming ({upcomingSchedules.length})
                    </TabsTrigger>
                    <TabsTrigger value="today">
                        Today ({todaySchedules.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                        Completed ({completedSchedules.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    {allSchedules.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                No schedules yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {allSchedules.map((sched) => (
                                <ScheduleCard
                                    schedule={sched}
                                    key={sched.id}
                                    viewType="student"
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="upcoming">
                    {upcomingSchedules.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                No upcoming schedules.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {upcomingSchedules.map((sched) => (
                                <ScheduleCard
                                    schedule={sched}
                                    key={sched.id}
                                    viewType="student"
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="today">
                    {todaySchedules.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                No schedules for today.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {todaySchedules.map((sched) => (
                                <ScheduleCard
                                    schedule={sched}
                                    key={sched.id}
                                    viewType="student"
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="completed">
                    {completedSchedules.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                No completed schedules.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {completedSchedules.map((sched) => (
                                <ScheduleCard
                                    schedule={sched}
                                    key={sched.id}
                                    viewType="student"
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
