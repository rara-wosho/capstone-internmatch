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

import { Button } from "../ui/button";
import { dateFormatter } from "@/utils/date-formatter";
import { useMemo, useState, useTransition } from "react";
import {
    approveStudentApplication,
    submitCannotProceedStatus,
} from "@/lib/actions/application";
import { toast } from "sonner";
import { Check, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "../ui/textarea";
import FormLabel from "../ui/FormLabel";
import StatusPill from "../ui/StatusPill";

export default function AcceptedStudentsTable({
    students,
    companyName,
    companyEmail,
    companyId,
}) {
    const [activeTab, setActiveTab] = useState("all");

    const [isPending, startTransition] = useTransition();

    // Message for cannot proceed status
    const [message, setMessage] = useState("");

    // Filter student applications base on active tab
    const filteredApplications = useMemo(() => {
        if (activeTab === "all") return students;

        if (activeTab === "approved") {
            return students.filter((s) => s.approved_at);
        }
        if (activeTab === "rejected") {
            return students.filter((s) => s.approve_status === "rejected");
        }
        return students;
    }, [activeTab, students]);

    const handleApproveApplication = (
        applicationId,
        studentEmail,
        studentName
    ) => {
        startTransition(async () => {
            const { success, error } = await approveStudentApplication({
                applicationId,
                companyEmail,
                companyId,
                companyName,
                studentEmail,
                studentName,
            });

            if (!success) {
                toast.error(error);
                return;
            }

            toast.success("Student application approved successfully.");
        });
    };

    const handleCannotProceedStatus = (applicationId, studentEmail) => {
        startTransition(async () => {
            const { success, error } = await submitCannotProceedStatus(
                applicationId,
                message,
                companyName,
                studentEmail
            );

            if (!success) {
                toast.error(error);
                return;
            }
            setMessage("");
            toast.success("Student marked as unable to proceed.");
        });
    };

    return (
        <>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                <button
                    className={cn(
                        "cursor-pointer whitespace-nowrap rounded-sm px-4 py-1.5 bg-secondary text-sm",
                        activeTab === "all"
                            ? "bg-primary text-white"
                            : "bg-secondary"
                    )}
                    onClick={() => setActiveTab("all")}
                >
                    All Applications
                </button>
                <button
                    className={cn(
                        "cursor-pointer whitespace-nowrap rounded-sm px-2 py-1.5 bg-secondary text-sm",
                        activeTab === "approved"
                            ? "bg-primary text-white"
                            : "bg-secondary"
                    )}
                    onClick={() => setActiveTab("approved")}
                >
                    Approved
                </button>
                <button
                    className={cn(
                        "cursor-pointer whitespace-nowrap rounded-sm px-2 py-1.5 bg-secondary text-sm",
                        activeTab === "rejected"
                            ? "bg-primary text-white"
                            : "bg-secondary"
                    )}
                    onClick={() => setActiveTab("rejected")}
                >
                    Cannot Proceed
                </button>
            </div>

            <Table>
                <TableCaption className="sr-only">
                    A list of accepted applications awaiting approval.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">
                            Student Name
                        </TableHead>
                        <TableHead className="font-bold">
                            Date Applied
                        </TableHead>
                        <TableHead className="font-bold">Group</TableHead>
                        <TableHead className="font-bold">Decision</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredApplications.length === 0 ? (
                        <TableRow>
                            <TableCell>
                                <p>Nothing is in the list</p>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredApplications?.map((student) => (
                            <TableRow key={student?.student_id}>
                                <TableCell className="font-medium">
                                    {student?.lastname}, {student?.firstname}
                                </TableCell>
                                <TableCell>
                                    {dateFormatter(student?.applied_at)}
                                </TableCell>
                                <TableCell>{student?.group_name}</TableCell>
                                <TableCell className="w-[300px]">
                                    <div className="flex items-center gap-2 relative">
                                        {/* Ispending indicator  */}
                                        {isPending && (
                                            <div className="absolute inset-0 bg-neutral-200/70 z-10 flex items-center justify-center gap-2">
                                                <Loader
                                                    className="animate-spin"
                                                    size={14}
                                                />
                                                <p>Please wait</p>
                                            </div>
                                        )}

                                        {student.approve_status !==
                                            "approved" && (
                                            // Show only if approve status is not yet approved
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        disabled={
                                                            student.approve_status ===
                                                            "rejected"
                                                        }
                                                    >
                                                        {student.approve_status ===
                                                        "rejected"
                                                            ? "Cannot Proceed"
                                                            : "Mark as cannot proceed"}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Confirm Decision
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            If the student
                                                            cannot proceed with
                                                            this internship,
                                                            please provide a
                                                            short reason below.
                                                            Note that this
                                                            action cannot be
                                                            undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <div>
                                                        <FormLabel>
                                                            Reason
                                                        </FormLabel>
                                                        <Textarea
                                                            value={message}
                                                            onChange={(e) =>
                                                                setMessage(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Explain briefly why the student cannot proceed..."
                                                        />
                                                    </div>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            asChild
                                                        >
                                                            <Button
                                                                disabled={
                                                                    student.approve_status ===
                                                                    "rejected"
                                                                }
                                                                onClick={() =>
                                                                    handleCannotProceedStatus(
                                                                        student.id,
                                                                        student?.student_email
                                                                    )
                                                                }
                                                                size="sm"
                                                                variant="destructive"
                                                            >
                                                                Submit Decision
                                                            </Button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}
                                        {student?.approve_status !==
                                            "rejected" && (
                                            <Button
                                                disabled={
                                                    student?.approve_status ===
                                                        "approved" ||
                                                    student?.isAlreadyApproved
                                                }
                                                onClick={() =>
                                                    handleApproveApplication(
                                                        student.id, // This is the student's application id
                                                        student?.student_email,
                                                        `${student.firstname} ${student.lastname}`
                                                    )
                                                }
                                                size="sm"
                                            >
                                                {student?.approve_status ===
                                                "approved"
                                                    ? "Approved"
                                                    : student?.isAlreadyApproved
                                                      ? "Already approved elsewhere"
                                                      : "Approve"}
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {student?.approve_status === "approved" ? (
                                        <div className="flex">
                                            <StatusPill
                                                size="sm"
                                                variant="success"
                                                label="Student Intern"
                                            />
                                        </div>
                                    ) : !student.approve_status ? (
                                        "Waiting for approval"
                                    ) : (
                                        ""
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    );
}
