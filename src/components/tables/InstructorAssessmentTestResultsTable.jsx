import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/utils/date-formatter";

export default function InstructorAssessmentTestResultsTable({
    assessmentResults,
}) {
    return (
        <Table>
            <TableCaption className="sr-only">
                A list of assessment results taken by your students.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Assessment Test</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date Completed</TableHead>
                    <TableHead>Violation</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assessmentResults?.map((result) => (
                    <TableRow key={result?.id}>
                        <TableCell className="font-medium">
                            {result?.lastname}, {result?.firstname}
                        </TableCell>
                        <TableCell>{result?.test_title}</TableCell>
                        <TableCell>
                            {result.score}/{result.total}
                        </TableCell>
                        <TableCell>
                            {dateFormatter(result.submitted_at)}
                        </TableCell>
                        <TableCell className="capitalize">
                            {result?.violation || "-"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
