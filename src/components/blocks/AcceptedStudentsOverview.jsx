import { createClient } from "@/lib/supabase/server";
import TitleText from "../ui/TitleText";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import ErrorUi from "../ui/ErrorUi";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";

export default async function AcceptedStudentsOverview({ instructorId }) {
    console.log("ins id ", instructorId);
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("students")
        .select(
            `
        id,
        firstname,
        lastname,
        applicants!inner(
            applied_at,
            status,
            companies(id, name)
        ),
        groups!inner(
            id,
            group_name,
            ojt_instructor_id
        )
    `
        )
        .eq("groups.ojt_instructor_id", instructorId)
        .eq("applicants.status", "accepted")
        .order("applied_at", {
            ascending: false,
            referencedTable: "applicants",
        })
        .limit(5);

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    // Format & extract correct application data
    const formattedData = (data ?? []).map((student) => {
        const app = student.applicants?.[0]; // applicants!inner always returns an array

        return {
            id: student.id,
            student_name: `${student.firstname} ${student.lastname}`,
            company_name: app?.companies?.name || "Unknown company",
            company_id: app?.companies?.id,
            applied_at: app?.applied_at,
        };
    });

    return (
        <>
            <div className="mb-2 flex items-center gap-2 justify-between">
                <TitleText>Recently accepted student applications</TitleText>
                {data?.length > 0 && (
                    <Link
                        className="text-muted-foreground hover:text-secondary-foreground"
                        href="/instructor/accepted"
                    >
                        View All
                    </Link>
                )}
            </div>

            <Table>
                <TableCaption className="sr-only">
                    A list of accepted student applications.
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applied At</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {formattedData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-4">
                                No recently accepted applications.
                            </TableCell>
                        </TableRow>
                    ) : (
                        formattedData.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">
                                    <Link
                                        className="hover:underline underline-offset-2"
                                        href={`/instructor/students/${student.id}`}
                                    >
                                        {student.student_name}
                                    </Link>
                                </TableCell>

                                <TableCell>
                                    <Link
                                        className="hover:underline underline-offset-2"
                                        href={`/instructor/companies/${student.company_id}`}
                                    >
                                        {student.company_name}
                                    </Link>
                                </TableCell>

                                <TableCell>
                                    {student.applied_at
                                        ? dateFormatter(student.applied_at)
                                        : "—"}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    );
}
