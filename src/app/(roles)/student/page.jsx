import BorderBox from "@/components/ui/BorderBox";

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
                <div className="rounded-xl border bg-card shadow-xs h-full">
                    <BorderBox className="border-b">
                        <h1>Activity Logs</h1>
                    </BorderBox>

                    <BorderBox>
                        <p className="text-sm text-muted-foreground">
                            No activities yet.
                        </p>
                    </BorderBox>
                </div>
            </div>
        </div>
    );
}
