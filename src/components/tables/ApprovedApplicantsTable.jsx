"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/utils/date-formatter";
import BorderBox from "../ui/BorderBox";
import { Suspense } from "react";
import SearchField from "../forms/SearchStudent";

export default function ApprovedApplicantsTable({ applicants }) {
    return (
        <BorderBox className="border rounded-xl bg-card">
            <Table>
                <TableCaption className="sr-only">
                    A list of your recent invoices.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Date Approved</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell className="font-medium">
                                {app.lastname}, {app.firstname}{" "}
                                <span className="uppercase">
                                    {app.middlename?.charAt(0)}
                                </span>
                            </TableCell>

                            <TableCell>{app.school}</TableCell>
                            <TableCell>{app.course}</TableCell>
                            <TableCell>
                                {dateFormatter(app.approved_at)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BorderBox>
    );
}
