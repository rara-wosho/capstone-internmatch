import SearchField from "@/components/forms/SearchStudent";
import InstructorAssessmentTestResultsTable from "@/components/tables/InstructorAssessmentTestResultsTable";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { getInstructorAssessmentResults } from "@/lib/actions/instructor";
import { Suspense } from "react";

export default async function Page({ searchParams }) {
    const search = (await searchParams)?.search_query || "";
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return <ErrorUi secondaryMessage="Unauthorized user." />;
    }

    const { success, error, data } = await getInstructorAssessmentResults(
        user.id,
        search
    );

    if (!success || error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    return (
        <div>
            <div className="mb-4">
                <SecondaryLabel>Assessment Test Results</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    See your students' assessment test results here.
                </p>
            </div>

            <BorderBox className="border rounded-xl bg-card mb-3">
                <Suspense fallback={<p>Loading search field</p>}>
                    <SearchField
                        actionPath="/instructor/assessment-test"
                        placeholder="Search student here"
                    />
                </Suspense>
            </BorderBox>

            {data?.length === 0 ? (
                <div className="flex justify-center py-3 text-muted-foreground">
                    {search
                        ? `No result found for "${search}"`
                        : "No data available yet."}
                </div>
            ) : (
                <BorderBox className="border rounded-xl bg-card">
                    <InstructorAssessmentTestResultsTable
                        assessmentResults={data}
                    />
                </BorderBox>
            )}
        </div>
    );
}
