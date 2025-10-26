import ApplicantsBlock from "@/components/blocks/ApplicantsBlock";
import CompanyDashboardOverview from "@/components/blocks/CompanyDashboardOverview";
import DashboardCountBox from "@/components/ui/DashboardCountBox";
import ErrorUi from "@/components/ui/ErrorUi";
import { getCurrentUser } from "@/lib/actions/auth";
import { User } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return (
            <ErrorUi secondaryMessage="You are not authorize to visit this page." />
        );
    }

    return (
        <div>
            <CompanyDashboardOverview userId={user.id} />
            <ApplicantsBlock userId={user.id} />
        </div>
    );
}
