import {
    BookOpenCheck,
    Check,
    FileText,
    FileUser,
    Hourglass,
    NotepadText,
} from "lucide-react";
import DashboardCountBox from "../ui/DashboardCountBox";
import { createClient } from "@/lib/supabase/server";
import ProfilePercentage from "../ui/ProfilePercentage";

export default async function StudentDashboardOverview({ userId }) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("students")
        .select(
            "exam_access, applicants(id, status), exam_attempt(id), assessment_attempt(id)"
        )
        .eq("id", userId)
        .maybeSingle();

    if (error) {
        return <div>Something went wrong while loading overview.</div>;
    }

    const pendingApplications = data?.applicants?.filter(
        (app) => app.status === "pending"
    );
    const acceptedApplications = data?.applicants?.filter(
        (app) => app.status === "accepted"
    );

    return (
        <div className="gap-2 sm:gap-3 md:gap-4 flex flex-wrap">
            <DashboardCountBox
                href="/student/applications"
                label="Pending Applications"
                icon={<Hourglass size={18} />}
                valueText={pendingApplications.length || 0}
                color="bg-yellow-500/80"
            />
            <DashboardCountBox
                href="/student/applications"
                label="Accepted Applications"
                icon={<Check size={18} />}
                valueText={acceptedApplications.length || 0}
                color="bg-emerald-500/80"
            />
            <DashboardCountBox
                href="/student/applications"
                label="Submitted Applications"
                icon={<FileUser size={18} />}
                valueText={data?.applicants.length || 0}
                color="bg-sky-500/80"
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

            <ProfilePercentage />
        </div>
    );
}
