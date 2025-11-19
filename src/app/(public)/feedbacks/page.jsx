import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { dateFormatter } from "@/utils/date-formatter";
import { Star } from "lucide-react";

export default async function Page() {
    const supabase = await createClient();

    // Fetch feedbacks from the database
    const { data: feedbacks, error } = await supabase
        .from("feedbacks")
        .select("submitted_at, category, feedback, rating, user_id")
        .eq("is_deleted", false)
        .order("submitted_at", { ascending: false });

    if (error) {
        return (
            <div className="min-h-svh flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-destructive mb-2">
                        Error Loading Feedbacks
                    </h2>
                    <p className="text-muted-foreground">
                        Unable to load feedback data. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    if (!feedbacks || feedbacks.length === 0) {
        return (
            <div className="min-h-svh flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        No Feedbacks Yet
                    </h2>
                    <p className="text-muted-foreground">
                        There are no feedbacks to display at this time.
                    </p>
                </div>
            </div>
        );
    }

    // Function to render star rating
    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={16}
                        className={
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-svh py-6 px-4 mb-12">
            <Wrapper>
                {/* Header */}
                <div className="mb-8 mt-12">
                    <h1 className="text-3xl font-bold mb-2">User Feedbacks</h1>
                    <p className="text-muted-foreground">
                        Showing {feedbacks.length} feedback submission
                        {feedbacks.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* Feedback Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {feedbacks.map((feedback, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Header with rating and date */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    {renderStars(feedback.rating)}
                                    <span className="text-sm text-muted-foreground mt-1 block">
                                        {feedback.rating}/5
                                    </span>
                                </div>
                                <div className="text-right">
                                    {dateFormatter(feedback.submitted_at)}
                                </div>
                            </div>

                            {/* Category */}
                            {feedback.category && (
                                <div className="mb-3">
                                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                        {feedback.category}
                                    </span>
                                </div>
                            )}

                            {/* Feedback Text */}
                            <div className="mb-4">
                                <p className="text-sm text-foreground leading-relaxed">
                                    {feedback.feedback}
                                </p>
                            </div>

                            {/* User ID (optional - you might want to hide this) */}
                            <div className="pt-3 border-t">
                                <p className="text-xs text-muted-foreground">
                                    User: {feedback.user_id.substring(0, 8)}...
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </div>
    );
}
