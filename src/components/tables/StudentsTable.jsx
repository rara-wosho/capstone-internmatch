import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BorderBox from "../ui/BorderBox";
import Link from "next/link";

export default function StudentsTable({ students }) {
    return (
        <BorderBox className="border rounded-xl bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">#</TableHead>
                        <TableHead className="font-bold">
                            Complete Name
                        </TableHead>
                        <TableHead className="font-bold">Email</TableHead>
                        <TableHead className="font-bold">Course</TableHead>
                        <TableHead className="font-bold">Gender</TableHead>
                        <TableHead className="font-bold">Age</TableHead>
                        <TableHead className="font-bold">Group</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students?.map((student, index) => (
                        <TableRow
                            key={student?.id}
                            className="text-muted-foreground"
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium text-secondary-foreground flex items-center">
                                <Link
                                    href={`/instructor/students/${student?.id}`}
                                    className="hover:underline underline-offset-2 w-full"
                                >
                                    {student?.lastname}, {student?.firstname}
                                </Link>
                            </TableCell>
                            <TableCell>{student?.email}</TableCell>
                            <TableCell>
                                {student?.course ?? (
                                    <p className="text-sm text-muted-foreground opacity-60 pointer-events-none">
                                        -
                                    </p>
                                )}
                            </TableCell>
                            <TableCell>
                                {student?.gender ?? (
                                    <p className="text-sm text-muted-foreground opacity-60 pointer-events-none">
                                        -
                                    </p>
                                )}
                            </TableCell>
                            <TableCell>
                                {student?.age ?? (
                                    <p className="text-sm text-muted-foreground opacity-60 pointer-events-none">
                                        -
                                    </p>
                                )}
                            </TableCell>
                            <TableCell>
                                <Link
                                    className="hover:underline underline-offset-2 w-full"
                                    href={`/instructor/manage-groups/${student?.groups?.id}`}
                                >
                                    {student?.groups?.group_name}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BorderBox>
    );
}
