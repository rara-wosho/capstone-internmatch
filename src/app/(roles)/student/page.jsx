import StudentActivityLog from "@/components/blocks/StudentActivityLog";
import BorderBox from "@/components/ui/BorderBox";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudentDashboardPage() {
    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-[2fr_1.3fr]">
            <div className="flex flex-col gap-3">
                <div className="gap-3 flex flex-wrap">
                    <div className="bg-card rounded-xl grow basis-[120px] border p-5"></div>
                    <div className="bg-card rounded-xl grow basis-[120px] border p-5"></div>
                    <div className="bg-card rounded-xl grow basis-[120px] border p-5"></div>
                    <div className="bg-card rounded-xl grow basis-[120px] border p-5"></div>
                </div>

                <div className="bg-card rounded-xl border shadow-xs">
                    <BorderBox className="border-b">
                        Pending Applications
                    </BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox className="border-b"></BorderBox>
                    <BorderBox></BorderBox>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="rounded-xl border bg-card shadow-xs">
                    <BorderBox className="border-b">
                        <h1>Notifications</h1>
                    </BorderBox>

                    <BorderBox>
                        <p className="text-sm text-muted-foreground">
                            No notifications yet. Stay tune for more updates.
                        </p>
                    </BorderBox>
                </div>
                <div className="rounded-xl border bg-card shadow-xs h-full relative pb-14">
                    <BorderBox className="border-b">
                        <h1>Activity Logs</h1>
                    </BorderBox>

                    <StudentActivityLog />

                    <div className="border-t absolute bottom-0 left-0 w-full bg-card z-10 px-4 md:px-5 h-14 flex items-center rounded-b-xl">
                        <Link
                            href="/#"
                            className="w-full text-left font-medium text-primary-text flex  items-center gap-1 hover:gap-2 transition-all h-10"
                        >
                            <span>See all activities</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
