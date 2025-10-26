import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import { formatTimespan } from "@/utils/format-timespan";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function RecentExamsTable({ data }) {
    return (
        <div className="rounded-xl border bg-card shadow-xs p-3 md:p-5">
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Exam Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Started at</TableHead>
                        <TableHead>Completed at</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((exam) => (
                        <TableRow key={exam.id}>
                            <TableCell>
                                <p
                                    className={`truncate max-w-[250px] ${exam.exams.is_deleted && "line-through opacity-60"}`}
                                >
                                    {exam.exam_title}
                                </p>
                                {exam.exams.is_deleted && (
                                    <div className="text-xs text-muted-foreground">
                                        Deleted exam
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`/student/companies/${exam.company_id}`}
                                >
                                    <p className="truncate max-w-[250px] hover:underline underline-offset-2">
                                        {exam.companies.name}
                                    </p>
                                </Link>
                            </TableCell>
                            <TableCell className="text-sm">
                                {dateFormatter(exam.started_at, true, true)}
                            </TableCell>
                            <TableCell className="text-sm">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="text-accent-foreground">
                                            {formatTimespan(
                                                exam.started_at,
                                                exam.completed_at
                                            )}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-sm text-muted-foreground">
                                            Duration
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                                {dateFormatter(
                                    exam.completed_at,
                                    true,
                                    true,
                                    true
                                )}
                            </TableCell>
                            <TableCell>{exam.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
