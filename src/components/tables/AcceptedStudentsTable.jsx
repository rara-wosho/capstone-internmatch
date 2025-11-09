import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { dateFormatter } from "@/utils/date-formatter";

export default function AcceptedStudentsTable({ students }) {
    return (
        <Table>
            <TableCaption>
                A list of accepted applications awaiting for approval.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Complete Name</TableHead>
                    <TableHead>Applied At</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students?.map((student) => (
                    <TableRow key={student?.student_id}>
                        <TableCell className="font-medium">
                            {student?.lastname}, {student?.firstname}
                        </TableCell>
                        <TableCell>
                            {dateFormatter(student?.applied_at)}
                        </TableCell>
                        <TableCell>{student?.group_name}</TableCell>
                        <TableCell>
                            <Button size="sm">Approve</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
