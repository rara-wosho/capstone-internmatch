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

export default function RecentExamsTable({ data }) {
    return (
        <div className="rounded-xl border bg-card shadow-xs p-3 md:p-5">
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Started at</TableHead>
                        <TableHead>Completed at</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((exam) => (
                        <TableRow key={exam.id}>
                            <TableCell>
                                <p className="truncate max-w-[250px]">
                                    {exam.exam_title}
                                </p>
                            </TableCell>
                            <TableCell className="text-sm">
                                {dateFormatter(exam.started_at, true)}
                            </TableCell>
                            <TableCell className="text-sm">
                                {dateFormatter(exam.completed_at, true)}
                            </TableCell>
                            <TableCell>{exam.score}</TableCell>
                            <TableCell>
                                <div
                                    className={cn(
                                        "border rounded-full text-center py-[3px] px-2 md:px-0",
                                        exam.status === "accepted" &&
                                            "dark:border-green-600 text-white bg-green-500/90"
                                    )}
                                >
                                    <p className="text-xs">{exam.status}</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
