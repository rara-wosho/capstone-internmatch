"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TertiaryLabel from "../ui/TertiaryLabel";
import BackButton from "../ui/BackButton";
import { Ban, BanIcon, ChevronLeft, Trash } from "lucide-react";
import { Button } from "../ui/button";
import BorderBox from "../ui/BorderBox";
import Link from "next/link";
import { useState } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

export default function GroupMembersTable({ members }) {
    const [markedIds, setMarkedIds] = useState([]);

    return (
        <>
            <div className="flex items-center mb-2">
                <BackButton className="me-2">
                    <div className="rounded-full p-1 hover:bg-secondary text-muted-foreground">
                        <ChevronLeft size={20} />
                    </div>
                </BackButton>
                <TertiaryLabel>Group members</TertiaryLabel>
            </div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox />
                        </TableHead>
                        <TableHead className="font-bold">
                            Complete Name
                        </TableHead>
                        <TableHead className="font-bold">Email</TableHead>
                        <TableHead className="font-bold">Course</TableHead>
                        <TableHead className="font-bold">Gender</TableHead>
                        <TableHead className="font-bold">Age</TableHead>
                        <TableHead className="font-bold text-center">
                            Exam Access
                        </TableHead>
                        <TableHead className="font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => (
                        <TableRow
                            key={member.id}
                            className="text-muted-foreground"
                        >
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell className="font-medium text-secondary-foreground">
                                <Link
                                    href="/instructor/students/hasldhskdh"
                                    className="hover:underline underline-offset-2"
                                >
                                    Israel De Vera
                                </Link>
                            </TableCell>
                            <TableCell>raeldevprojects@gmail.com</TableCell>
                            <TableCell>BSIT</TableCell>
                            <TableCell>Male</TableCell>
                            <TableCell>20</TableCell>
                            <TableCell className="text-center">
                                <div className="border rounded-full inline-flex items-center px-2 py-[1px]">
                                    <span className="text-xs">Not allowed</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <button>
                                        <BanIcon size={18} />
                                    </button>
                                    <button className="text-destructive">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="border-t pt-3 mt-8 px-2">
                <h2 className="font-semibold text-secondary-foreground/70">
                    Banned Students
                </h2>
            </div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox />
                        </TableHead>
                        <TableHead className="font-bold">
                            Complete Name
                        </TableHead>
                        <TableHead className="font-bold">Email</TableHead>
                        <TableHead className="font-bold">Course</TableHead>
                        <TableHead className="font-bold">Gender</TableHead>
                        <TableHead className="font-bold">Age</TableHead>
                        <TableHead className="font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-muted-foreground">
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium text-secondary-foreground">
                            <Link
                                href="/instructor/students/hasldhskdh"
                                className="hover:underline underline-offset-2"
                            >
                                Israel De Vera
                            </Link>
                        </TableCell>
                        <TableCell>raeldevprojects@gmail.com</TableCell>
                        <TableCell>BSIT</TableCell>
                        <TableCell>Male</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <button>
                                    <BanIcon size={18} />
                                </button>
                                <button className="text-destructive">
                                    <Trash size={18} />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}
