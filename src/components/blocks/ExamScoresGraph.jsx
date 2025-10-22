import { createClient } from "@/lib/supabase/server";
import BarChart from "../charts/BarChart";

export default async function ExamScoresGraph({ userId }) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("exam_attempt")
        .select("exam_id, exam_title, score")
        .eq("student_id", userId)
        .order("score", { ascending: false })
        .limit(5);

    // if (!data || data.length === 0) {
    //     return <div>No to scores to display.</div>;
    // }

    const examsData = data?.map((d) => ({
        label: d.exam_title,
        value: d.score,
    }));

    return (
        <div>
            {error ? (
                <div>Something went wrong while loading Scores data.</div>
            ) : (
                <div>
                    <BarChart
                        link="/student/my-exams/recent"
                        truncateLabel={true}
                        data={examsData}
                        title="Top Exam Scores"
                        xAxisLabel="Exam Title"
                        height={300}
                    />
                </div>
            )}
        </div>
    );
}
