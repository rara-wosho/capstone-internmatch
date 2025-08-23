import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function ExamineesList() {
    return (
        <div>
            <h1 className="font-semibold mb-4">
                Fundamentals of Web Development
            </h1>

            <div className="border rounded-xl bg-card p-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Complete Name</TableHead>
                            <TableHead>School</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="text-sm text-muted-foreground">
                            <TableCell className="font-medium">
                                <Link
                                    href="/company/internship-exam/examinees/23kdskf223"
                                    className="text-secondary-foreground hover:underline underline-offset-2"
                                >
                                    Israel De Vera
                                </Link>
                            </TableCell>
                            <TableCell>USTP</TableCell>
                            <TableCell>
                                Bachelor of Science in Information Technology
                            </TableCell>
                            <TableCell>Jan 16 2025</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
