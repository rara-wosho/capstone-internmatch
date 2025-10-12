import AddInstructorForm from "@/components/add-instructor-form";
import UserCountCard from "@/components/features/admin/UserCountCard";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { Building2, CircleUserRound, SquareUserRound } from "lucide-react";

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
    const getCompanyCount = async () => {
        const { count } = await supabase
            .from("companies")
            .select("id", { count: "exact", head: true });

        return count;
    };

    const [studentCount, instructorCount, companyCount] = await Promise.all([
        getStudentCount(),
        getInstructorCount(),
        getCompanyCount(),
    ]);

    return (
        <div>
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center px-3">Dashboard</Wrapper>
            </SecondaryLabel>

            <Wrapper className="px-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    <UserCountCard
                        className="text-green-500 border border-green-500/10 bg-linear-to-br from-transparent to-green-500/10 "
                        role="Students"
                        count={studentCount}
                        icon={<CircleUserRound />}
                    />
                    <UserCountCard
                        className="text-pink-500 border border-pink-500/10 bg-linear-to-br from-transparent to-pink-500/10 "
                        role="Ojt Instructors"
                        count={instructorCount}
                        icon={<SquareUserRound />}
                    />
                    <UserCountCard
                        className="text-blue-500 border border-blue-500/10 bg-linear-to-br from-transparent to-blue-500/10 "
                        role="Companies"
                        count={companyCount}
                        icon={<Building2 />}
                    />
                </div>
            </Wrapper>
            {/* <AddInstructorForm />  */}
        </div>
    );
}
