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
                    <TableHead>Student</TableHead>
                    <TableHead>Exam Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-right">Date</TableHead>
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
                            <TableCell>{exam.title}</TableCell>
                            <TableCell>{exam.company}</TableCell>
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
