"use client";

import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import { dateFormatter } from "@/utils/date-formatter";
import UpdateRegistrationAction from "../features/registrations/UpdateRegistrationAction";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import EmptyUi from "../ui/EmptyUi";

const TABS = [
    { label: "all" },
    { label: "pending" },
    { label: "accepted" },
    { label: "rejected" },
];

export default function RegistrantsTable({ registrants }) {
    const [status, setStatus] = useState("all");
    const filteredData = useMemo(() => {
        if (status === "all") return registrants;

        // return filtered data if status is not all
        return registrants.filter((reg) => reg.status === status);
    }, [registrants, status]);
    return (
        <>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                {TABS.map((tab) => (
                    <button
                        onClick={() => setStatus(tab.label)}
                        key={tab.label}
                        className={cn(
                            "rounded-sm border px-3 py-1 cursor-pointer hover:text-accent-foreground text-sm text-muted-foreground capitalize transition-colors bg-card",
                            status === tab.label
                                ? "border-blue-500/60 dark:border-sky-400/60 text-accent-foreground bg-accent"
                                : "bg-card"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {filteredData.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Complete Name</TableHead>
                            <TableHead>Documents Link</TableHead>
                            <TableHead>Registration Date</TableHead>
                            <TableHead>School</TableHead>
                            <TableHead className="text-center">
                                Status
                            </TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((reg) => (
                            <TableRow
                                key={reg?.id}
                                className="text-neutral-700 dark:text-neutral-300/90"
                            >
                                <TableCell className="font-semibold">
                                    {reg?.firstname} {reg?.lastname}
                                </TableCell>
                                <TableCell className="max-w-[180px]">
                                    <Link
                                        target="_blank"
                                        href={reg?.documents_link}
                                        className="block max-w-[300px] truncate hover:text-accent-foreground hover:underline underline-offset-2"
                                    >
                                        {reg?.documents_link}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs">
                                        {dateFormatter(reg?.registered_at)}
                                    </p>
                                </TableCell>
                                <TableCell>{reg?.school}</TableCell>

                                <TableCell>
                                    <div
                                        className={cn(
                                            "rounded-full w-[85px] flex items-center justify-center py-0.5 border mx-auto",
                                            reg?.status === "accepted" &&
                                                "border-green-500/30 bg-green-600/70 dark:bg-green-700 text-white",
                                            reg?.status === "rejected" &&
                                                "border-red-500/10 bg-red-600/70 dark:bg-red-500/40 text-white"
                                        )}
                                    >
                                        <p className="capitalize text-xs">
                                            {reg?.status}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <UpdateRegistrationAction
                                        registrant={reg}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <EmptyUi
                    message="There's nothing here"
                    secondaryMessage={`No ${status} registrations found.`}
                />
            )}
        </>
    );
}
