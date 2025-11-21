import { createClient } from "@/lib/supabase/server";
import ErrorUi from "../ui/ErrorUi";
import BorderBox from "../ui/BorderBox";
import TitleText from "../ui/TitleText";
import BarChart from "../charts/BarChart";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Input } from "../ui/input";
import FormLabel from "../ui/FormLabel";

export default async function ApplicantsBlock({ userId }) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("applicants")
        .select(
            "id, applied_at, status, students!inner(firstname, lastname, school)"
        )
        .eq("company_id", userId)
        .neq("status", "cancelled")
        .order("applied_at", { ascending: false });

    if (error) {
        return (
            <ErrorUi
                message="Unable to load applicants graph"
                secondaryMessage={error.message}
            />
        );
    }

    const monthLabels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Count applications per month
    const monthlyCounts = Array(12).fill(0); // index 0 → Jan, 11 → Dec

    data?.forEach((applicant) => {
        const date = new Date(applicant.applied_at);
        const monthIndex = date.getMonth(); // 0-11
        monthlyCounts[monthIndex]++;
    });

    // Format data for BarChart

    let chartData = [];

    if (data?.length > 0) {
        chartData = monthLabels.map((label, index) => ({
            label,
            value: monthlyCounts[index],
        }));
    }

    return (
        <div>
            <div className="border rounded-xl bg-card shadow-xs">
                <div className="px-3 md:px-5 py-3 border-b flex flex-wrap items-center gap-2">
                    <TertiaryLabel>Total applicants</TertiaryLabel>
                    <div className="size-6 flex items-center justify-center bg-muted border rounded sm">
                        <p className="tabular-nums">{data?.length || 0}</p>
                    </div>
                </div>

                <BorderBox>
                    <BarChart
                        data={chartData}
                        title="Applicants per month"
                        xAxisLabel="Months"
                        yAxisLabel="Number of applicants"
                        height={250}
                    />
                </BorderBox>
            </div>
        </div>
    );
}
