import { CreateTestModal } from "@/components/modals/CreateTestModal";
import { Button } from "@/components/ui/button";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { FileText } from "lucide-react";
import Link from "next/link";

export default async function AdminAssessmentTestPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("assessment_test")
        .select("id, assessment_title, created_at, assessment_difficulty");

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    console.log(data);

    return (
        <div>
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center justify-between flex-wrap px-3 gap-3">
                    <div className="flex items-center gap-2">
                        <IconWrapper>
                            <FileText size={18} />
                        </IconWrapper>
                        <p> Assessment Test</p>
                    </div>

                    <CreateTestModal />
                </Wrapper>
            </SecondaryLabel>

            {data.length === 0 ? (
                <EmptyUi secondaryMessage="No assessment test yet. Click 'Create Test' to make a new test. " />
            ) : (
                <div>
                    <Wrapper className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {data.map((ass) => (
                            <div
                                key={ass.id}
                                className="border rounded-xl bg-card"
                            >
                                <Link
                                    href={`/admin/assessment-test/${ass.id}`}
                                    className="p-4 flex flex-col"
                                >
                                    {ass.assessment_title}

                                    <p className="text-sm text-muted-foreground mt-1 capitalize">
                                        {ass.assessment_difficulty}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </Wrapper>
                </div>
            )}
        </div>
    );
}
