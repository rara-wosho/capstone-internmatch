import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import ScheduleCard from "@/components/ui/ScheduleCard";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { getCompanySchedules } from "@/lib/actions/schedule";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default async function SchedulesPage() {
    const { data, error } = await getCompanySchedules();

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    return (
        <div>
            <div className="mb-3 flex items-center gap-2 justify-between flex-wrap">
                <SecondaryLabel>Schedules</SecondaryLabel>
                <Button asChild>
                    <Link href="/company/approved-applicants/next-steps">
                        <Calendar />
                        Create New Schedule
                    </Link>
                </Button>
            </div>

            {data?.length === 0 ? (
                <EmptyUi secondaryMessage="" message="No Schedules" />
            ) : (
                <div className="space-y-3">
                    {data.map((sched) => (
                        <ScheduleCard
                            key={sched.schedule_id}
                            schedule={sched}
                            viewType="company"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
