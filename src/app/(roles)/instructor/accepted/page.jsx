import AcceptedStudentsTable from "@/components/tables/AcceptedStudentsTable";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import { getCurrentUser } from "@/lib/actions/auth";
import { getAcceptedApplicationsByInstructor } from "@/lib/actions/instructor";
import { Building, Building2 } from "lucide-react";

export default async function AcceptedApplicationsPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return <ErrorUi secondaryMessage="Authentication failed." />;
    }

    const { success, error, data } = await getAcceptedApplicationsByInstructor(
        user.id
    );

    if (!success || error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    return (
        <div>
            <div className="mb-4 md:mb-5">
                <SecondaryLabel>Accepted Applications</SecondaryLabel>
                <p className="text-muted-foreground text-sm">
                    These are applications that have been accepted by companies
                    and are now awaiting your review and approval. Approving an
                    application finalizes the student’s internship placement.
                </p>
            </div>

            {data.map((company) => (
                <BorderBox
                    key={company.company_id}
                    className="border rounded-xl bg-card"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="size-4 flex items-center shrink-0">
                            <Building2 size={16} />
                        </div>
                        <TitleText>{company.company_name}</TitleText>
                    </div>

                    <AcceptedStudentsTable students={company?.students} />
                </BorderBox>
            ))}
        </div>
    );
}
