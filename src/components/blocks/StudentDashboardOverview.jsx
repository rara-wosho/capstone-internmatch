import { BookOpenCheck, FileText, FileUser, NotepadText } from "lucide-react";
import DashboardCountBox from "../ui/DashboardCountBox";
import { createClient } from "@/lib/supabase/server";

export default async function StudentDashboardOverview({ userId }) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("students")
        .select(
            "exam_access, applicants(id), exam_attempt(id), assessment_attempt(id)"
        )
        .eq("id", userId)
        .maybeSingle();

    return (
        <>
            {error ? (
                <div>Something went wrong while loading overview.</div>
            ) : (
                <div className="gap-3 flex flex-wrap">
                    <DashboardCountBox
                        href="/student/applications"
                        label="Applications"
                        icon={<FileUser size={18} />}
                        valueText={data?.applicants.length || 0}
                        color="bg-emerald-500/80"
                    />
                    <DashboardCountBox
                        href="/student/my-exams/recent"
                        label="Exams Taken"
                        icon={<NotepadText size={18} />}
                        valueText={data?.exam_attempt.length || 0}
                        color="bg-blue-500/80"
                    />
                    <DashboardCountBox
                        href="/student/assessment-test"
                        label="Assessment Test"
                        icon={<FileText size={18} />}
                        valueText={data?.assessment_attempt.length || 0}
                        color="bg-purple-500/80"
                    />
                    <DashboardCountBox
                        label="Exam Access"
                        icon={<BookOpenCheck size={18} />}
                        valueText={data.exam_access ? "Allowed" : "Not Allowed"}
                        color="bg-violet-500/80"
                    />
                </div>
            )}
        </>
    );
}
