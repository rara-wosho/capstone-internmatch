import ExamScoresGraph from "@/components/blocks/ExamScoresGraph";
import StudentActivityLog from "@/components/blocks/StudentActivityLog";
import { StudentDashboardDetails } from "@/components/blocks/StudentDashboardDetails";
import StudentDashboardOverview from "@/components/blocks/StudentDashboardOverview";
import BorderBox from "@/components/ui/BorderBox";
import DashboardCountBox from "@/components/ui/DashboardCountBox";
import TitleText from "@/components/ui/TitleText";
import { getCurrentUser } from "@/lib/actions/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function StudentDashboardPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        notFound();
    }

    return (
        <>
            {/* ========= LEFT SECTION ==============  */}
            <div className="flex flex-col gap-3 md:gap-4 animation-show mb-3 md:mb-4">
                <StudentDashboardDetails userId={user.id} />
                <StudentDashboardOverview userId={user.id} />
            </div>

            {/* ============ RIGHT SECTION ================= */}
            <div className="flex flex-wrap gap-3 md:gap-4 animation-show delay-300">
                <div className="rounded-xl grow border bg-card basis-[300px]">
                    <BorderBox>
                        <ExamScoresGraph userId={user.id} />
                    </BorderBox>
                </div>
                <div className="rounded-xl border bg-card grow basis-auto">
                    <BorderBox className="border-b">
                        <TitleText>Recent Notifications</TitleText>
                    </BorderBox>

                    <BorderBox>
                        <p className="text-sm text-muted-foreground">
                            No notifications yet. Stay tune for more updates.
                        </p>
                    </BorderBox>
                </div>
                <div className="rounded-xl border bg-card grow basis-auto h-full">
                    <BorderBox className="border-b flex items-center justify-between">
                        <TitleText>Activity Logs</TitleText>

                        <Link
                            href="/student/profile/activities"
                            className="hover:text-accent-foreground transition-colors font-light"
                        >
                            <span>See all</span>
                        </Link>
                    </BorderBox>

                    <StudentActivityLog />
                </div>
            </div>
        </>
    );
}
