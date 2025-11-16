import { getStudentOverviewCount } from "@/lib/actions/instructor";
import ErrorUi from "../ui/ErrorUi";
import TitleText from "../ui/TitleText";
import DashboardCountBox from "../ui/DashboardCountBox";
import { Users } from "lucide-react";
import Link from "next/link";

export default async function InstructorStudentOverview({ instructorId }) {
    const { success, error, data } =
        await getStudentOverviewCount(instructorId);

    if (!success || error) {
        return <p>Something went wrong while loading student overview</p>;
    }

    return (
        <>
            <div className="flex items-center gap-2 justify-between mb-2">
                <TitleText>Overview</TitleText>

                {data.length > 0 && (
                    <Link
                        href="/instructor/students"
                        className="text-muted-foreground hover:text-secondary-foreground"
                    >
                        View All
                    </Link>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                <DashboardCountBox
                    label="Total Students"
                    valueText={data.totalStudent}
                    icon={<Users />}
                />
                <DashboardCountBox
                    label="Students With Exam Access"
                    valueText={data.totalStudentWithExamAccess}
                    icon={<Users />}
                />
            </div>
        </>
    );
}
