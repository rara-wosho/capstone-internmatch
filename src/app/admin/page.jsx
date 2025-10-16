import AddInstructorForm from "@/components/add-instructor-form";
import AdminFeedbackGraph from "@/components/blocks/AdminFeedbackGraph";
import BarChart from "@/components/charts/BarChart";
import UserCountCard from "@/components/features/admin/UserCountCard";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import {
    Building2,
    CircleUserRound,
    Hourglass,
    SquareUserRound,
} from "lucide-react";

export default async function Page() {
    const supabase = await createClient();

    // ========= FETCH ALL USER DATA AT ONCE =========
    const [studentsRes, instructorsRes, companiesRes, registrationsRes] =
        await Promise.all([
            supabase.from("students").select("id, created_at"),
            supabase.from("ojt_instructors").select("id, created_at"),
            supabase.from("companies").select("id, created_at"),
            supabase.from("registrations").select("status"),
        ]);

    const students = studentsRes.data || [];
    const instructors = instructorsRes.data || [];
    const companies = companiesRes.data || [];
    const pending = registrationsRes.data || [];

    // ========= DERIVED COUNTS =========
    const studentCount = students.length;
    const instructorCount = instructors.length;
    const companyCount = companies.length;
    const pendingCount = pending.filter((i) => i.status === "pending").length;

    // ========= MONTHLY REGISTRATION PER ROLE =========
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

    // Helper to count per month for a dataset
    const getMonthlyCounts = (data) => {
        const monthlyCount = Array(12).fill(0);
        data.forEach((user) => {
            if (user.created_at) {
                const month = new Date(user.created_at).getMonth();
                monthlyCount[month]++;
            }
        });
        return monthlyCount;
    };

    const studentMonthly = getMonthlyCounts(students);
    const instructorMonthly = getMonthlyCounts(instructors);
    const companyMonthly = getMonthlyCounts(companies);

    // Format for grouped bar chart
    const groupedData = monthLabels.map((label, index) => ({
        label,
        values: [
            studentMonthly[index],
            instructorMonthly[index],
            companyMonthly[index],
        ],
    }));

    // ========= RENDER =========
    return (
        <div>
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center px-3 justify-between">
                    Dashboard
                    <Button>Refresh</Button>
                </Wrapper>
            </SecondaryLabel>

            <Wrapper className="px-3 mb-8">
                {/* COUNT CARDS */}
                <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-4">
                    <UserCountCard
                        className="text-white bg-linear-to-br from-violet-400 dark:from-violet-400  to-violet-500 dark:to-violet-900"
                        role="Pending Registrations"
                        count={pendingCount}
                        icon={<Hourglass size={22} />}
                    />
                    <UserCountCard
                        className="bg-card"
                        role="Students"
                        count={studentCount}
                        icon={<CircleUserRound size={22} />}
                    />
                    <UserCountCard
                        className="bg-card"
                        role="OJT Instructors"
                        count={instructorCount}
                        icon={<SquareUserRound size={22} />}
                    />
                    <UserCountCard
                        className="bg-card"
                        role="Companies"
                        count={companyCount}
                        icon={<Building2 size={22} />}
                    />
                </div>

                {/* GROUPED BAR CHART - ACCOUNT CREATION */}
                <BorderBox className="border bg-card rounded-xl shadow-sm mb-4">
                    <BarChart
                        data={groupedData}
                        title="Monthly Account Creations by Role"
                        xAxisLabel="Month"
                        height={300}
                        grouped={true}
                        groupLabels={["Students", "Instructors", "Companies"]}
                        groupColors={[
                            "bg-primary",
                            "bg-fuchsia-400 dark:bg-fuchsia-700",
                            "bg-accent-foreground",
                        ]}
                        showLegend={true}
                    />
                </BorderBox>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <AdminFeedbackGraph />
                </div>
            </Wrapper>

            {/* <AddInstructorForm /> */}
        </div>
    );
}
