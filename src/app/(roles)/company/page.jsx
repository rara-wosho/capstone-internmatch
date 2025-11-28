import ApplicantsBlock from "@/components/blocks/ApplicantsBlock";
import CompanyDashboardOverview from "@/components/blocks/CompanyDashboardOverview";
import CompanyScheduleOverview from "@/components/blocks/CompanyScheduleOverview";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import { getCurrentUser } from "@/lib/actions/auth";

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
            <BorderBox className="border rounded-xl bg-card mt-3 mb-2 sm:mb-3 md:mb-4">
                <CompanyScheduleOverview id={user.id} />
            </BorderBox>
            <ApplicantsBlock userId={user.id} />
        </div>
    );
}
