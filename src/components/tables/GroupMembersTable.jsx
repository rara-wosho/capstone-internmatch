import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TertiaryLabel from "../ui/TertiaryLabel";
import BackButton from "../ui/BackButton";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import BorderBox from "../ui/BorderBox";
import Link from "next/link";

export default function GroupMembersTable() {
    return (
        <BorderBox className="border rounded-lg bg-card">
            <div className="flex items-center mb-2">
                <BackButton className="me-2">
                    <div className="rounded-full p-1 bg-secondary text-muted-foreground">
                        <ChevronLeft size={20} />
                    </div>
                </BackButton>
                <TertiaryLabel>Group members</TertiaryLabel>
            </div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
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
                    </TableRow>
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
                    </TableRow>
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
                    </TableRow>
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
                    </TableRow>
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
                    </TableRow>
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
                    </TableRow>
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
                    </TableRow>
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
                    </TableRow>
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
                    </TableRow>
                </TableBody>
            </Table>
        </BorderBox>
    );
}
