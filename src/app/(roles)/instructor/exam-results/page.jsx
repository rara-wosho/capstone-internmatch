import SearchField from "@/components/forms/SearchStudent";
import InstructorExamResultsTable from "@/components/tables/InstructorExamResultsTable";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getCurrentUser } from "@/lib/actions/auth";
import { getStudentExamResults } from "@/lib/actions/instructor";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";
import { Suspense } from "react";

export default async function InstructorExamResultsPage({ searchParams }) {
    const search = (await searchParams)?.search_query || "";

    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return (
            <ErrorUi secondaryMessage="Unable to verify user. Make sure that your session is still valid." />
        );
    }

    const {
        success,
        data: examData,
        error,
    } = await getStudentExamResults(user.id, search);

    if (!success || error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    return (
        <div>
            <div className="mb-4">
                <SecondaryLabel>Exam Results</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    View your students’ exam performance by group.
                </p>
            </div>

            {/* Search Field */}
            <div className="mb-3 bg-card rounded-xl border">
                <BorderBox>
                    <Suspense>
                        <SearchField
                            placeholder="Search student"
                            actionPath="/instructor/exam-results"
                        />
                    </Suspense>
                </BorderBox>
            </div>

            {examData?.length === 0 ? (
                <div>
                    {search
                        ? `No result found for "${search}"`
                        : "No data available yet."}
                </div>
            ) : (
                //  Grouped Results
                examData?.map((group, groupIndex) => (
                    <div
                        key={groupIndex}
                        className="border rounded-xl bg-card mb-6"
                    >
                        {/* Group Header */}
                        <div className="px-3 md:px-5 py-3 border-b">
                            <TitleText>{group.group_name}</TitleText>
                        </div>

                        <BorderBox>
                            <InstructorExamResultsTable
                                studentData={group.students}
                            />
                        </BorderBox>
                    </div>
                ))
            )}
        </div>
    );
}
