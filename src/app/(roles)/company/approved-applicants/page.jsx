import SearchField from "@/components/forms/SearchStudent";
import ApplicantCard from "@/components/ui/ApplicantCard";
import BorderBox from "@/components/ui/BorderBox";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getApprovedApplicantsByCompany } from "@/lib/actions/application";
import { getCurrentUser } from "@/lib/actions/auth";
import { Suspense } from "react";

export default async function ApprovedApplicantsPage({ searchParams }) {
    const search = (await searchParams)?.search_query || "";
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return <ErrorUi secondaryMessage="Unable to verify user." />;
    }

    const {
        error,
        success,
        data: approvedApplicants,
    } = await getApprovedApplicantsByCompany(user.id, search);

    if (!success || error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    console.log("approved", approvedApplicants);

    return (
        <div>
            <div className="mb-3">
                <SecondaryLabel>Approved Applicants</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    These are the list of students approved by their ojt
                    instructor to be part of your company interns.
                </p>
            </div>
            <BorderBox className="border rounded-xl bg-card mb-3">
                <Suspense fallback={<p>Loading search field...</p>}>
                    <SearchField
                        actionPath="/company/approved-applicants"
                        placeholder="Search applicant"
                    />
                </Suspense>
            </BorderBox>
            {approvedApplicants?.length === 0 ? (
                <EmptyUi
                    message={
                        search
                            ? `No result found`
                            : "No approved applicants yet."
                    }
                    secondaryMessage={
                        search
                            ? `We found no result for "${search}". Please try searching for another.`
                            : "Please wait until OJT instructors approve their students for your company."
                    }
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* <ApprovedApplicantsTable applicants={approvedApplicants} />  */}

                    {approvedApplicants?.map((applicant) => (
                        <ApplicantCard
                            type="approved"
                            key={applicant.id}
                            applicant={applicant}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
