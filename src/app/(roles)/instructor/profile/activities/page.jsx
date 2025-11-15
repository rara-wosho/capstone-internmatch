import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInstructorActivityLogs } from "@/lib/actions/instructor";
import { dateFormatter } from "@/utils/date-formatter";
import { Logs } from "lucide-react";

export default async function InstructorActivitiesPage() {
    const { data, error } = await getInstructorActivityLogs();

    if (error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <IconWrapper>
                    <Logs size={18} />
                </IconWrapper>
                <SecondaryLabel>Activity Logs</SecondaryLabel>
            </div>

            <Tabs defaultValue="account">
                <div className="border-b mb-3">
                    <TabsList className="h-[55px] space-x-3">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="group">Groups</TabsTrigger>
                    </TabsList>
                </div>

                {/* Account Activity */}
                <TabsContent value="account">
                    <div className="mb-3">
                        <p>
                            {data?.created_at
                                ? dateFormatter(data.created_at)
                                : "N/A"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {data.firstname} {data.lastname} Joined InternMatch.
                        </p>
                    </div>
                </TabsContent>

                {/* Exam Activity */}
                <TabsContent value="group">
                    {data?.groups?.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No data available.
                        </p>
                    ) : (
                        data.groups.map((group, index) => (
                            <div key={index} className="mb-3">
                                <p>{dateFormatter(group.created_at)}</p>
                                <p className="text-sm text-muted-foreground">
                                    Created group:{" "}
                                    <span className="text-secondary-foreground font-medium">
                                        {group.group_name}
                                    </span>
                                </p>
                            </div>
                        ))
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
