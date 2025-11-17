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
import { useMemo, useState, useTransition } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ChevronDown, Loader, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { allowExamAccess, revokeExamAccess } from "@/lib/actions/student";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { dateFormatter } from "@/utils/date-formatter";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function GroupMembersTable({ members, search }) {
    const [markedIds, setMarkedIds] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const router = useRouter();

    // ✅ Compute filtered members
    const filteredMembers = useMemo(() => {
        if (statusFilter === "all") return members;
        if (statusFilter === "active")
            return members.filter((m) => m.is_active);
        if (statusFilter === "inactive")
            return members.filter((m) => !m.is_active);
        return members;
    }, [members, statusFilter]);

    const handleMarkAll = () => {
        if (markedIds.length === filteredMembers.length)
            return setMarkedIds([]);
        setMarkedIds(filteredMembers.map((m) => m.id));
    };

    const handleMarkId = (id) => {
        setMarkedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleAllowAccess = () => {
        if (markedIds.length === 0) return;

        startTransition(async () => {
            const { success } = await allowExamAccess(markedIds);
            if (!success) return toast.error("Unable to grant exam access.");

            toast.success("Exam access granted successfully.");
            setMarkedIds([]);
            router.refresh();
        });
    };

    const handleRevokeExam = () => {
        if (markedIds.length === 0) return;
        startTransition(async () => {
            const { success } = await revokeExamAccess(markedIds);
            if (!success) return toast.error("Unable to revoke exam access.");

            toast.success("Exam access revoked successfully.");
            setMarkedIds([]);
            router.refresh();
        });
    };

    const handleChangeStatusFilter = (status) => {
        setStatusFilter(status);
        setMarkedIds([]);
        setOpen(false);
    };

    return (
        <>
            {/* ACTION BAR */}
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
                                className="text-sm cursor-pointer hover:text-accent-foreground flex items-end gap-1"
                                onClick={() => setMarkedIds([])}
                            >
                                Cancel <X size={18} />
                            </button>
                        )}
                    </div>

                    <div className="sm:rounded-b-xl overflow-x-auto">
                        <div className="flex items-center gap-2 min-w-max p-3 sm:flex-row-reverse">
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

                            {/* Temporary comment out, no actions yet  */}
                            {/* <Button variant="outline">
                                <Trash />
                            </Button> */}
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex items-center mb-2 justify-between py-2">
                <TertiaryLabel>
                    {search
                        ? `Showing results for '${search}'`
                        : "Group members"}{" "}
                </TertiaryLabel>

                <div
                    onClick={handleMarkAll}
                    className="text-sm hover:text-accent-foreground flex items-center gap-2 cursor-pointer"
                >
                    <Checkbox
                        onCheckedChange={() => handleMarkAll()}
                        checked={
                            filteredMembers.length > 0 &&
                            markedIds.length === filteredMembers.length
                        }
                    />
                    {markedIds.length === filteredMembers.length
                        ? "Deselect all"
                        : "Select all"}
                </div>
            </div>

            {/* TABLE */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                checked={
                                    filteredMembers.length > 0 &&
                                    markedIds.length === filteredMembers.length
                                }
                                onCheckedChange={() => handleMarkAll()}
                            />
                        </TableHead>
                        <TableHead className="font-bold">
                            Complete Name
                        </TableHead>
                        <TableHead className="font-bold">Email</TableHead>
                        <TableHead className="font-bold">Gender</TableHead>
                        <TableHead className="font-bold">Age</TableHead>
                        <TableHead className="font-bold">Joined On</TableHead>
                        <TableHead className="font-bold text-center">
                            Exam Access
                        </TableHead>

                        {/* STATUS FILTER */}
                        <TableHead className="font-bold">
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
                                            handleChangeStatusFilter("active")
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
                                            handleChangeStatusFilter("inactive")
                                        }
                                    >
                                        Inactive
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredMembers?.map((member) => (
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
                                    className="hover:underline underline-offset-2 flex items-center gap-2"
                                >
                                    <Avatar className="size-6">
                                        <AvatarImage
                                            src={
                                                member?.avatar_url ||
                                                "/images/default-avatar.jpg"
                                            }
                                            alt="student-image"
                                        />
                                        <AvatarFallback>
                                            {member?.lastname?.charAt(0) ?? "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                    {member?.lastname}, {member?.firstname}
                                </Link>
                            </TableCell>

                            <TableCell>{member?.email ?? "-"}</TableCell>
                            <TableCell>{member?.gender ?? "-"}</TableCell>
                            <TableCell>{member?.age ?? "-"}</TableCell>

                            <TableCell>
                                {dateFormatter(member?.created_at, true, true)}
                            </TableCell>

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

                            <TableCell className="font-bold">
                                {member.is_active ? (
                                    <p className="text-green-600">Active</p>
                                ) : (
                                    <p>Inactive</p>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
