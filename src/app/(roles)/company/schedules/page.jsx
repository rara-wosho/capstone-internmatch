import BorderBox from "@/components/ui/BorderBox";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import ScheduleCard from "@/components/ui/ScheduleCard";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { getCompanySchedules } from "@/lib/actions/schedule";

export default async function SchedulesPage() {
    const { data, error } = await getCompanySchedules();

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    console.log(data);
    return (
        <div>
            <div className="mb-3">
                <SecondaryLabel>Schedules</SecondaryLabel>
            </div>

            {data?.length === 0 ? (
                <EmptyUi secondaryMessage="No schedules yet." />
            ) : (
                <div className="space-y-3">
                    {data.map((sched) => (
                        <ScheduleCard
                            key={sched.id}
                            schedule={sched}
                            viewType="company"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
