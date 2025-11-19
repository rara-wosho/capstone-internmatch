"use client";

import { useState, useMemo } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown, Info } from "lucide-react";
import { Button } from "../ui/button";
import InfoPopover from "../ui/info-popover";

export default function StudentsTable({ students, initialFilter }) {
    // Validate status from url params
    const allowedFilters = ["all", "active", "inactive"];
    const [statusFilter, setStatusFilter] = useState(
        allowedFilters.includes(initialFilter) ? initialFilter : "all"
    );

    const [open, setOpen] = useState(false);

    // Filter students based on status
    const filteredStudents = useMemo(() => {
        if (statusFilter === "all") {
            return students;
        }

        if (statusFilter === "active") {
            return students.filter((student) => student.is_active === true);
        }

        if (statusFilter === "inactive") {
            return students.filter((student) => student.is_active === false);
        }

        return students;
    }, [students, statusFilter]);

    const handleChangeStatusFilter = (filter) => {
        setStatusFilter(filter);
        setOpen(false); // Close popover after selection
    };

    return (
        <BorderBox className="border rounded-xl bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Complete Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Exam Access</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>
                            <div className="flex items-center gap-2">
                                <InfoPopover
                                    textContent="This indicates whether the student is currently enrolled under your supervision. This is not an online/offline indicator"
                                    trigger={<Info size={16} />}
                                />
                                {/* Buttons for filtering inactive active students  */}
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <button className="flex items-center gap-1 cursor-pointer uppercase">
                                            {statusFilter === "all"
                                                ? "Status"
                                                : statusFilter}{" "}
                                            <ChevronDown size={18} />
                                        </button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-40 p-2 space-y-1">
                                        <Button
                                            variant={
                                                statusFilter === "all"
                                                    ? "secondary"
                                                    : "ghost"
                                            }
                                            className="w-full justify-start"
                                            onClick={() =>
                                                handleChangeStatusFilter("all")
                                            }
                                        >
                                            All
                                        </Button>

                                        <Button
                                            variant={
                                                statusFilter === "active"
                                                    ? "secondary"
                                                    : "ghost"
                                            }
                                            className="w-full justify-start"
                                            onClick={() =>
                                                handleChangeStatusFilter(
                                                    "active"
                                                )
                                            }
                                        >
                                            Active
                                        </Button>

                                        <Button
                                            variant={
                                                statusFilter === "inactive"
                                                    ? "secondary"
                                                    : "ghost"
                                            }
                                            className="w-full justify-start"
                                            onClick={() =>
                                                handleChangeStatusFilter(
                                                    "inactive"
                                                )
                                            }
                                        >
                                            Inactive
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStudents?.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="text-center text-muted-foreground"
                            >
                                No {statusFilter !== "all" && statusFilter}{" "}
                                students found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredStudents?.map((student, index) => (
                            <TableRow
                                key={student?.id}
                                className="text-muted-foreground"
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium text-secondary-foreground flex items-center">
                                    <Link
                                        href={`/instructor/students/${student?.id}`}
                                        className="hover:underline underline-offset-2 w-full flex items-center gap-2"
                                    >
                                        <Avatar className="size-6">
                                            <AvatarImage
                                                src={
                                                    student?.avatar_url ||
                                                    "/images/default-avatar.jpg"
                                                }
                                            />
                                            <AvatarFallback>
                                                {student?.lastname?.charAt(0) ??
                                                    "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        {student?.lastname},{" "}
                                        {student?.firstname}
                                    </Link>
                                </TableCell>
                                <TableCell>{student?.email}</TableCell>

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
                                    {student?.exam_access ? (
                                        <div className="border rounded-full inline-flex items-center px-2 py-[1px] border-green-500 text-green-600">
                                            <span className="text-xs">
                                                Allowed
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="border rounded-full inline-flex items-center px-2 py-[1px]">
                                            <span className="text-xs">
                                                Not allowed
                                            </span>
                                        </div>
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
                                <TableCell className="font-bold">
                                    {student.is_active ? (
                                        <p className="text-green-600">Active</p>
                                    ) : (
                                        <p>Inactive</p>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </BorderBox>
    );
}
