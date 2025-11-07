import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getApprovedApplicantsByCompany } from "@/lib/actions/application";
import { getCurrentUser } from "@/lib/actions/auth";

export default async function ApprovedApplicantsPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return <ErrorUi secondaryMessage="Unable to verify user." />;
    }

    const {
        error,
        success,
        data: approvedApplicants,
    } = await getApprovedApplicantsByCompany(user.id);

    if (!success || error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    return (
        <div>
            {approvedApplicants?.length === 0 ? (
                <EmptyUi
                    message="No approved applicants yet."
                    secondaryMessage="Please wait until OJT instructors approve their students for your company."
                />
            ) : (
                <>
                    <div className="mb-3">
                        <SecondaryLabel>Approved Applicants</SecondaryLabel>
                        <p className="text-sm text-muted-foreground">
                            These are the list of students approved by their ojt
                            instructor to be part of your company interns.
                        </p>
                    </div>

                    <div>
                        {approvedApplicants.map((aa) => (
                            <div key={aa.id}></div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
