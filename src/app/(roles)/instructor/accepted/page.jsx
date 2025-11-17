import SearchField from "@/components/forms/SearchStudent";
import AcceptedStudentsTable from "@/components/tables/AcceptedStudentsTable";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Separator } from "@/components/ui/separator";
import TitleText from "@/components/ui/TitleText";
import { getCurrentUser } from "@/lib/actions/auth";
import { getAcceptedApplicationsByInstructor } from "@/lib/actions/instructor";
import { Building2 } from "lucide-react";
import { Suspense } from "react";

export default async function AcceptedApplicationsPage({ searchParams }) {
    const search = (await searchParams)?.search_query || "";
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return <ErrorUi secondaryMessage="Authentication failed." />;
    }

    const { success, error, data } = await getAcceptedApplicationsByInstructor(
        user.id,
        search
    );

    if (!success || error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    console.log("data ", data);
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

            <div className="mb-2 md:mb-3">
                <Suspense fallback={<p>Loading search field</p>}>
                    <SearchField
                        placeholder="Search student here"
                        actionPath="/instructor/accepted"
                    />
                </Suspense>
            </div>

            {data?.length === 0 ? (
                <div className="flex justify-center py-3 text-muted-foreground">
                    {search
                        ? `No result found for "${search}"`
                        : "No data available yet."}
                </div>
            ) : (
                data.map((company) => (
                    <BorderBox
                        key={company.company_id}
                        className="border rounded-xl bg-card mb-2 md:mb-3"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="size-4 flex items-center shrink-0">
                                <Building2 size={16} />
                            </div>
                            <TitleText>{company.company_name}</TitleText>
                        </div>

                        <AcceptedStudentsTable
                            companyEmail={company?.company_email || ""}
                            students={company?.students}
                            companyName={company?.company_name || ""}
                        />
                    </BorderBox>
                ))
            )}
        </div>
    );
}
