import { createClient } from "@/lib/supabase/server";
import BorderBox from "../ui/BorderBox";
import ErrorUi from "../ui/ErrorUi";
import TertiaryLabel from "../ui/TertiaryLabel";
import { dateFormatter } from "@/utils/date-formatter";
import { Bug, Lightbulb, MessageCircle } from "lucide-react";
import Link from "next/link";

export default async function FeedbacksOverviewList() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("feedbacks")
        .select("id, feedback, submitted_at, category")
        .limit(3)
        .order("submitted_at", { ascending: false });

    if (error) {
        return (
            <div className="text-sm text-muted-foreground">
                Something went wrong while fetching feedbacks list.
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center mb-3 justify-between">
                <TertiaryLabel>Feedback list</TertiaryLabel>
                <Link
                    href="/admin/feedbacks"
                    className="text-muted-foreground hover:text-accent-foreground text-sm"
                >
                    View All
                </Link>
            </div>

            {data.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                    No feedbacks yet.
                </div>
            ) : (
                data.map((feedback) => (
                    <div key={feedback?.id} className="py-2">
                        <p className="text-sm mb-1">{feedback?.feedback}</p>

                        <p className="text-xs text-muted-foreground mb-0.5">
                            {dateFormatter(feedback?.submitted_at)}
                        </p>

                        <p className="text-xs text-muted-foreground capitalize">
                            {feedback?.category}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}
