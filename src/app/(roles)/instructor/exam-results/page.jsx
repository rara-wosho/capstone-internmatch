import SearchField from "@/components/forms/SearchStudent";
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
                    View your students’ exam performance by batch and company.
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

            {/* Grouped Results */}
            {examData?.map((group, groupIndex) => (
                <div
                    key={groupIndex}
                    className="border rounded-xl bg-card mb-6"
                >
                    {/* Group Header */}
                    <div className="px-3 md:px-5 py-3 border-b">
                        <TitleText>{group.group_name}</TitleText>
                    </div>

                    <BorderBox className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[25%]">
                                        Student
                                    </TableHead>
                                    <TableHead className="w-[25%]">
                                        Exam Title
                                    </TableHead>
                                    <TableHead className="w-[20%]">
                                        Company
                                    </TableHead>
                                    <TableHead className="w-[15%] text-center">
                                        Score
                                    </TableHead>
                                    <TableHead className="w-[15%] text-right">
                                        Completed At
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {group.students.map((student) => {
                                    if (!student.exams?.length) {
                                        return (
                                            <TableRow key={student.id}>
                                                <TableCell>
                                                    <Link
                                                        href={`/instructor/students/${student.id}`}
                                                        className="font-medium hover:underline underline-offset-2"
                                                    >
                                                        {student.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell
                                                    colSpan={4}
                                                    className="text-muted-foreground text-sm italic"
                                                >
                                                    No exams taken yet
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }

                                    return student.exams.map(
                                        (exam, examIndex) => (
                                            <TableRow
                                                key={`${student.id}-${examIndex}`}
                                            >
                                                <TableCell>
                                                    <Link
                                                        href={`/instructor/students/${student.id}`}
                                                        className="font-medium hover:underline"
                                                    >
                                                        {student.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {exam.title}
                                                </TableCell>
                                                <TableCell>
                                                    {exam.company}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {exam.score !== null
                                                        ? `${exam.score}${
                                                              exam.total_questions
                                                                  ? ` / ${exam.total_questions}`
                                                                  : ""
                                                          }`
                                                        : "—"}
                                                </TableCell>
                                                <TableCell className="text-right text-sm text-muted-foreground">
                                                    {exam.completed_at
                                                        ? dateFormatter(
                                                              exam.completed_at
                                                          )
                                                        : "—"}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </BorderBox>
                </div>
            ))}
        </div>
    );
}
