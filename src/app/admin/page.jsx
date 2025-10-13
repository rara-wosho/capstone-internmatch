import AddInstructorForm from "@/components/add-instructor-form";
import UserCountCard from "@/components/features/admin/UserCountCard";
import IconWrapper from "@/components/ui/IconWrapper";
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

    const getStudentCount = async () => {
        const { count } = await supabase
            .from("students")
            .select("id", { count: "exact", head: true });

        return count;
    };
    const getInstructorCount = async () => {
        const { count } = await supabase
            .from("ojt_instructors")
            .select("id", { count: "exact", head: true });

        return count;
    };
    const getPendingInstructorCount = async () => {
        const { count } = await supabase
            .from("ojt_instructors")
            .select("id", { count: "exact", head: true })
            .eq("status", "pending");

        return count;
    };
    const getCompanyCount = async () => {
        const { count } = await supabase
            .from("companies")
            .select("id", { count: "exact", head: true });

        return count;
    };

    const [studentCount, instructorCount, pendingCount, companyCount] =
        await Promise.all([
            getStudentCount(),
            getInstructorCount(),
            getPendingInstructorCount(),
            getCompanyCount(),
        ]);

    return (
        <div>
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center px-3">Dashboard</Wrapper>
            </SecondaryLabel>

            <Wrapper className="px-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    <UserCountCard
                        className="text-white bg-linear-to-br from-violet-400 dark:from-violet-400  to-violet-500 dark:to-violet-900"
                        role="Pending Registrations"
                        count={pendingCount || 0}
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
                        role="Ojt Instructors"
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
            </Wrapper>
            {/* <AddInstructorForm />  */}
        </div>
    );
}
