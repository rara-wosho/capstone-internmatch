import BarChart from "../charts/BarChart";
import BorderBox from "../ui/BorderBox";
import { createClient } from "@/lib/supabase/server";

export default async function AdminFeedbackGraph() {
    const supabase = await createClient();

    const { data: feedbacks, error: feedbacksErr } = await supabase
        .from("feedbacks")
        .select("id, category");

    if (feedbacksErr) {
        return (
            <div className="text-sm p-4 border rounded-xl bg-card">
                Something went wrong while loading feedbacks
            </div>
        );
    }

    // Define the categories you want to show, even if no data exists
    const categories = ["suggestions", "bugs", "others"];

    // Count feedbacks per category
    const categoryCounts =
        feedbacks?.reduce((acc, curr) => {
            const category = curr.category?.toLowerCase() || "others";
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {}) || {};

    // Prepare chart data, ensuring every category appears
    const feedbackData = categories.map((label) => ({
        label,
        value: categoryCounts[label] || 0,
    }));

    return (
        <BorderBox className="border rounded-xl bg-card shadow-xs">
            <BarChart
                description={`${feedbacks.length} total feedback`}
                link="/admin/feedbacks"
                title="Feedbacks"
                data={feedbackData}
                height={200}
                xAxisLabel="Categories"
            />
        </BorderBox>
    );
}
