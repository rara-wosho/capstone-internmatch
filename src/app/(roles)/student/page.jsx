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
            <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
                {/* ========= LEFT SECTION ==============  */}
                <div className="flex flex-col gap-3 md:gap-4">
                    <StudentDashboardDetails userId={user.id} />
                    <StudentDashboardOverview userId={user.id} />

                    <div className="flex flex-wrap gap-3 md:gap-4 h-full">
                        <div className="rounded-xl grow border bg-card">
                            <BorderBox>
                                <ExamScoresGraph userId={user.id} />
                            </BorderBox>
                        </div>
                        <div className="rounded-xl grow border bg-card">
                            <BorderBox>
                                <ExamScoresGraph userId={user.id} />
                            </BorderBox>
                        </div>
                    </div>
                </div>

                {/* ============ RIGHT SECTION ================= */}
                <div className="flex flex-col gap-3 md:gap-4">
                    {/* <div className="rounded-xl border bg-card">
                        <BorderBox className="border-b">
                            <TitleText>Recent Notifications</TitleText>
                        </BorderBox>

                        <BorderBox>
                            <p className="text-sm text-muted-foreground">
                                No notifications yet. Stay tune for more
                                updates.
                            </p>
                        </BorderBox>
                    </div> */}
                    <div className="rounded-xl border bg-card h-full relative">
                        <BorderBox className="border-b flex items-center justify-between">
                            <TitleText>Activity Logs</TitleText>

                            <Link
                                href="#"
                                className="hover:text-accent-foreground transition-colors font-light"
                            >
                                <span>See all</span>
                            </Link>
                        </BorderBox>

                        <StudentActivityLog />
                    </div>
                </div>
            </div>
        </>
    );
}
