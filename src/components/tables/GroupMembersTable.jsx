"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TertiaryLabel from "../ui/TertiaryLabel";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { BanIcon, Loader, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { allowExamAccess, revokeExamAccess } from "@/lib/actions/student";
import { toast } from "sonner";

export default function GroupMembersTable({ members }) {
    const [markedIds, setMarkedIds] = useState([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleMarkAll = () => {
        if (markedIds.length === members.length) {
            setMarkedIds([]);
        } else {
            setMarkedIds(members.map((m) => m.id));
        }
    };

    const handleMarkId = (id) => {
        setMarkedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleAllowAccess = () => {
        startTransition(async () => {
            const { success } = await allowExamAccess(markedIds);

            if (!success) {
                toast.error("Unable to grant them exam access.", {
                    position: "top-right",
                });
                return;
            }

            toast.success("Exam access granted successfully.", {
                position: "top-right",
            });
            setMarkedIds([]);
            router.refresh(); // ✅ refresh data
        });
    };

    const handleRevokeExam = () => {
        startTransition(async () => {
            const { success } = await revokeExamAccess(markedIds);

            if (!success) {
                toast.error("Unable to revoke exam access.", {
                    position: "top-right",
                });
                return;
            }

            toast.success("Exam access revoked successfully.", {
                position: "top-right",
            });
            setMarkedIds([]);
            router.refresh();
        });
    };

    return (
        <>
            {markedIds.length > 0 && (
                <div className="border border-t sm:border sm:rounded-xl fixed bottom-0 sm:bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 w-full sm:max-w-max z-50 sm:shadow-md bg-card flex flex-col">
                    <div className="flex items-center justify-between sm:rounded-t-xl border-b p-3">
                        <p className="text-sm text-muted-foreground">
                            {markedIds.length} selected
                        </p>

                        {isPending ? (
                            <Loader size={16} className="animate-spin" />
                        ) : (
                            <button
                                className="text-sm cursor-pointer hover:text-accent-foreground transition-colors flex items-end gap-1"
                                onClick={() => setMarkedIds([])}
                            >
                                Cancel <X size={18} />
                            </button>
                        )}
                    </div>
                    <div className="sm:rounded-b-xl overflow-x-auto">
                        <div className="flex items-center gap-2 shrink-0 min-w-max p-3 sm:flex-row-reverse">
                            <Button
                                variant="success"
                                disabled={isPending}
                                onClick={handleAllowAccess}
                            >
                                Allow exam access
                            </Button>
                            <Button
                                variant="destructive"
                                disabled={isPending}
                                onClick={handleRevokeExam}
                            >
                                Revoke exam access
                            </Button>
                            {/* <Button variant="outline">
                                <BanIcon />
                            </Button> */}
                            <Button variant="outline">
                                <Trash />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center mb-2">
                <TertiaryLabel>Group members</TertiaryLabel>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                onCheckedChange={handleMarkAll}
                                checked={markedIds.length === members.length}
                            />
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
                    {members?.map((member) => (
                        <TableRow
                            key={member?.id}
                            className="text-muted-foreground"
                        >
                            <TableCell>
                                <Checkbox
                                    checked={markedIds.includes(member?.id)}
                                    onCheckedChange={() =>
                                        handleMarkId(member?.id)
                                    }
                                />
                            </TableCell>
                            <TableCell className="font-medium text-secondary-foreground">
                                <Link
                                    href={`/instructor/students/${member?.id}`}
                                    className="hover:underline underline-offset-2"
                                >
                                    {member?.lastname} {member?.firstname}
                                </Link>
                            </TableCell>
                            <TableCell>{member?.email ?? "-"}</TableCell>
                            <TableCell>{member?.course ?? "-"}</TableCell>
                            <TableCell>{member?.gender ?? "-"}</TableCell>
                            <TableCell>{member?.age ?? "-"}</TableCell>
                            <TableCell className="text-center">
                                {member?.exam_access ? (
                                    <div className="border rounded-full inline-flex items-center px-2 py-[1px] border-green-500 text-green-600">
                                        <span className="text-xs">Allowed</span>
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
        </>
    );
}
