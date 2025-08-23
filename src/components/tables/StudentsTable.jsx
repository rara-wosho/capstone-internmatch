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

export default function StudentsTable() {
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
                    <TableRow className="text-muted-foreground">
                        <TableCell>1</TableCell>
                        <TableCell className="font-medium text-secondary-foreground flex items-center">
                            <Link
                                href="/instructor/students/hasldhskdh"
                                className="hover:underline underline-offset-2 w-full"
                            >
                                Israel De Vera
                            </Link>
                        </TableCell>
                        <TableCell>raeldevprojects@gmail.com</TableCell>
                        <TableCell>BSIT</TableCell>
                        <TableCell>Male</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>Sir amin's group</TableCell>
                    </TableRow>
                    <TableRow className="text-muted-foreground">
                        <TableCell>2</TableCell>
                        <TableCell className="font-medium text-secondary-foreground flex items-center">
                            <Link
                                href="/instructor/students/hasldhskdh"
                                className="hover:underline underline-offset-2 w-full"
                            >
                                Israel De Vera
                            </Link>
                        </TableCell>
                        <TableCell>raeldevprojects@gmail.com</TableCell>
                        <TableCell>BSIT</TableCell>
                        <TableCell>Male</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>Sir amin's group</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </BorderBox>
    );
}
