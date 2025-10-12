import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const assessmentId = (await params.id) || "";

    if (!assessmentId) {
        notFound();
    }

    const db = await createClient();

    const { data, error } = await db
        .from("assessment_test")
        .select()
        .eq("id", assessmentId)
        .single();

    if (error) {
        return <ErrorUi />;
    }

    return (
        <div>
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center gap-2 justify-between px-3">
                    <div className="flex flex-col">
                        <p>{data.assessment_title}</p>
                        <span className="text-sm text-muted-foreground font-normal">
                            Created at: {dateFormatter(data.created_at)}
                        </span>
                    </div>

                    <div
                        className={cn(
                            "capitalize text-sm",
                            data.assessment_difficulty
                        )}
                    >
                        {data.assessment_difficulty}
                    </div>
                </Wrapper>
            </SecondaryLabel>
        </div>
    );
}
