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
import Link from "next/link";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Suspense } from "react";
import SearchField from "../forms/SearchStudent";
import BorderBox from "../ui/BorderBox";

export default function ExamineesTable({ examinees, examId }) {
    return (
        <>
            <TertiaryLabel className="mb-2">
                {examinees.length} Examinee{examinees.length > 1 && "s"}
            </TertiaryLabel>
            {/* <BorderBox className="rounded-xl bg-card mb-3 border shadow-xs">
                <Suspense fallback={null}>
                    <SearchField
                        actionPath={`/company/examinees/${examId}`}
                        placeholder="Search examinees"
                    />
                </Suspense>
            </BorderBox> */}
            <BorderBox className="bg-card shadow-xs border rounded-xl mb-3">
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Complete Name</TableHead>
                            <TableHead>School</TableHead>
                            <TableHead>Started</TableHead>
                            <TableHead>Completed</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {examinees.map((examinee, index) => (
                            <TableRow key={examinee.id}>
                                <TableCell className="w-2">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Link
                                        href={`/company/examinees/${examinee.exam_id}/${examinee.student_id}`}
                                        className="hover:underline underline-offset-2 hover:text-accent-foreground transition-colors"
                                    >
                                        <p className="flex items-center truncate max-w-[220px]">
                                            {examinee?.students?.lastname},{" "}
                                            {examinee?.students?.firstname}
                                        </p>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {examinee?.students?.school ?? (
                                        <p className="text-xs text-muted-foreground">
                                            -
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {dateFormatter(
                                        examinee?.started_at,
                                        true,
                                        true
                                    )}
                                </TableCell>
                                <TableCell>
                                    {dateFormatter(
                                        examinee?.completed_at,
                                        true,
                                        true
                                    )}
                                </TableCell>
                                <TableCell>{examinee?.score}</TableCell>
                                <TableCell>{examinee?.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </BorderBox>
        </>
    );
}
