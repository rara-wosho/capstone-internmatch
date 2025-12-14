import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { dateFormatter } from "@/utils/date-formatter";
import {
    Building,
    CheckCircle,
    Clock,
    MessageSquare,
    Shield,
    Tag,
    User,
} from "lucide-react";

export default async function AdminFeedbacksPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("feedbacks")
        .select("id, submitted_at, category, feedback, user_id, rating, role")
        .eq("is_deleted", false);

    if (error) {
        return <ErrorUi secondaryMessage={error?.message} />;
    }

    return (
        <Wrapper>
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                Feedbacks
            </SecondaryLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {data?.map((feedback) => (
                    <div
                        key={feedback.id}
                        className="border bg-card rounded-xl"
                    >
                        <BorderBox className="border-b flex items-center gap-2">
                            <div className="rounded-md bg-accent text-accent-foreground p-2">
                                <MessageSquare size={18} />
                            </div>

                            <div>
                                <TitleText>Feedback Details</TitleText>
                                <p className="text-muted-foreground text-xs">
                                    {dateFormatter(feedback?.submitted_at)}
                                </p>
                            </div>
                        </BorderBox>

                        <BorderBox>
                            <p className="text-sm text-muted-foreground">
                                "{feedback.feedback || ""}"
                            </p>

                            <div className="mt-2 text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted border inline-flex">
                                <p className="capitalize">
                                    {feedback.category}
                                </p>
                            </div>
                        </BorderBox>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}
