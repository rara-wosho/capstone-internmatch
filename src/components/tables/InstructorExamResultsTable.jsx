import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { dateFormatter } from "@/utils/date-formatter";

export default function InstructorExamResultsTable({ studentData }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold">Student</TableHead>
                    <TableHead className="font-bold">Exam Title</TableHead>
                    <TableHead className="font-bold">Company</TableHead>
                    <TableHead className="font-bold text-center">
                        Score
                    </TableHead>
                    <TableHead className="font-bold text-left">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {studentData.map((student) => {
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

                    return student.exams.map((exam, examIndex) => (
                        <TableRow key={`${student.id}-${examIndex}`}>
                            <TableCell>
                                <Link
                                    href={`/instructor/students/${student.id}`}
                                    className="font-medium hover:underline"
                                >
                                    {student.name}
                                </Link>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {exam.title}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                <Link
                                    className="hover:underline underline-offset-2"
                                    href={`/instructor/companies/${exam.company_id}`}
                                >
                                    {exam.company}{" "}
                                </Link>
                            </TableCell>
                            <TableCell className="text-center text-muted-foreground">
                                {exam.score !== null
                                    ? `${exam.score}${
                                          exam.total_questions
                                              ? ` / ${exam.total_questions}`
                                              : ""
                                      }`
                                    : "—"}
                            </TableCell>
                            <TableCell className="text-left text-sm text-muted-foreground">
                                {exam.completed_at
                                    ? dateFormatter(exam.completed_at)
                                    : "—"}
                            </TableCell>
                        </TableRow>
                    ));
                })}
            </TableBody>
        </Table>
    );
}
