import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCompanyActivities } from "@/lib/actions/company";
import { Logs } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleText from "@/components/ui/TitleText";
import { dateFormatter } from "@/utils/date-formatter";

export default async function CompanyActivitiesPage() {
    const { data, error } = await getCompanyActivities();

    if (error) {
        return (
            <ErrorUi
                message="Something went wrong while loading activity logs"
                secondaryMessage={error}
            />
        );
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
                        <TabsTrigger value="exams">Exams</TabsTrigger>
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
                            Joined InternMatch.
                        </p>
                    </div>
                </TabsContent>

                {/* Exam Activity */}
                <TabsContent value="exams">
                    {data?.exams?.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No activity for exams.
                        </p>
                    ) : (
                        data.exams.map((exam, index) => (
                            <div key={index} className="mb-3">
                                <p>{dateFormatter(exam.created_at)}</p>
                                <p className="text-sm text-muted-foreground">
                                    Created an exam:{" "}
                                    <span className="text-secondary-foreground font-medium">
                                        {exam.title}
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
