"use client";

import { useSession } from "@/context/SessionContext";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Loader, UserPlus, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AddParticipantModal({ scheduleId }) {
    const { userData } = useSession();

    const [open, setOpen] = useState(false);
    const [approvedApplicants, setApprovedApplicants] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [existingParticipants, setExistingParticipants] = useState([]);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    // Fetch approved applicants
    const fetchApprovedApplicants = async () => {
        setLoading(true);
        setError("");

        try {
            const supabase = createClient();

            // Fetch approved applicants
            const { data: applicants, error: applicantsError } = await supabase
                .from("applicants")
                .select(
                    "id, students(id, firstname, lastname, school, avatar_url)"
                )
                .eq("company_id", userData?.id)
                .eq("approve_status", "approved")
                .eq("status", "accepted")
                .order("approved_at", { ascending: false });

            if (applicantsError) throw applicantsError;

            // Fetch existing participants for this schedule
            const { data: existing, error: existingError } = await supabase
                .from("schedule_student_ids")
                .select("student_id")
                .eq("schedule_id", scheduleId);

            if (existingError) throw existingError;

            setApprovedApplicants(applicants || []);
            setExistingParticipants(existing?.map((p) => p.student_id) || []);
        } catch (err) {
            console.error("Error fetching applicants:", err);
            setError(err.message || "Failed to load applicants.");
            toast.error("Failed to load applicants.");
        } finally {
            setLoading(false);
        }
    };

    const toggleSelection = (studentId) => {
        setSelectedIds((prev) => {
            if (prev.includes(studentId)) {
                return prev.filter((id) => id !== studentId);
            } else {
                return [...prev, studentId];
            }
        });
    };

    // Save the selected new participants
    const handleSave = async () => {
        if (selectedIds.length === 0) {
            toast.error("Please select at least one participant.");
            return;
        }

        setSaving(true);

        try {
            const supabase = createClient();

            // Prepare data for insertion
            const insertData = selectedIds.map((studentId) => ({
                schedule_id: scheduleId,
                student_id: studentId,
            }));

            const { error: insertError } = await supabase
                .from("schedule_student_ids")
                .insert(insertData);

            if (insertError) throw insertError;

            const notificationData = selectedIds?.map((id) => ({
                title: "New Schedule",
                message:
                    "You are added to a new company schedule. View schedule page for more details.",
                link_url: "/student/schedules",
                recipient_id: id,
                type: "schedule",
            }));

            // Insert data to notifications table to notify students
            await supabase.from("notifications").insert(notificationData);

            toast.success(
                `${selectedIds.length} participant(s) added successfully!`,
                {
                    description:
                        "Please wait a moment if this page doesn't refresh  quickly.",
                }
            );

            // Reset and close
            setSelectedIds([]);
            setOpen(false);
            router.refresh();
        } catch (err) {
            console.error("Error saving participants:", err);

            if (err.code === "23505") {
                toast.error(
                    "Some participants are already added to this schedule."
                );
            } else {
                toast.error("Failed to add participants. Please try again.");
            }
        } finally {
            setSaving(false);
        }
    };

    const isAlreadyParticipant = (studentId) => {
        return existingParticipants.includes(studentId);
    };

    const isSelected = (studentId) => {
        return selectedIds.includes(studentId);
    };

    // Fetch applicants when dialog opens
    useEffect(() => {
        if (open) {
            fetchApprovedApplicants();
            setSelectedIds([]); // Reset selections
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <UserPlus />
                    <span className="hidden sm:inline-block">
                        Add Participants
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Participants to Schedule</DialogTitle>
                    <DialogDescription>
                        Select approved applicants to add as participants to
                        this schedule.
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader className="animate-spin mr-2" size={20} />
                        <span className="text-sm text-muted-foreground">
                            Loading applicants...
                        </span>
                    </div>
                ) : error ? (
                    <div className="py-8 text-center">
                        <p className="text-sm text-destructive">{error}</p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchApprovedApplicants}
                            className="mt-3"
                        >
                            Try Again
                        </Button>
                    </div>
                ) : approvedApplicants.length === 0 ? (
                    <div className="py-12 text-center">
                        <Users
                            className="mx-auto mb-3 text-muted-foreground"
                            size={48}
                        />
                        <h3 className="text-lg font-semibold mb-2">
                            No Approved Applicants
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            There are no approved applicants available to add.
                        </p>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="max-h-[400px]">
                            <div className="space-y-2">
                                {approvedApplicants.map((applicant) => {
                                    const student = applicant.students;
                                    const alreadyAdded = isAlreadyParticipant(
                                        student.id
                                    );
                                    const selected = isSelected(student.id);

                                    return (
                                        <button
                                            key={applicant.id}
                                            type="button"
                                            onClick={() =>
                                                !alreadyAdded &&
                                                toggleSelection(student.id)
                                            }
                                            disabled={alreadyAdded}
                                            className={cn(
                                                "w-full flex items-center gap-3 p-2 rounded-lg border transition-all text-left",
                                                alreadyAdded &&
                                                    "opacity-50 cursor-not-allowed bg-muted",
                                                !alreadyAdded &&
                                                    "hover:bg-accent cursor-pointer",
                                                selected &&
                                                    !alreadyAdded &&
                                                    "bg-primary/10 border-primary"
                                            )}
                                        >
                                            <Avatar className="h-8 aspect-square">
                                                <AvatarImage
                                                    src={
                                                        student.avatar_url ||
                                                        "/images/default-avatar.jpg"
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {student.firstname?.charAt(
                                                        0
                                                    )}
                                                    {student.lastname?.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium">
                                                    {student.firstname}{" "}
                                                    {student.lastname}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {student.school}
                                                </p>
                                            </div>

                                            <div className="shrink-0">
                                                {alreadyAdded ? (
                                                    <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                                                        Already Added
                                                    </span>
                                                ) : selected ? (
                                                    <div className="size-4 rounded-full bg-primary flex items-center justify-center">
                                                        <Check
                                                            className="text-primary-foreground"
                                                            size={12}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="size-4 rounded-full border-2 border-muted-foreground/30" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </>
                )}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={saving}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSave}
                        disabled={saving || selectedIds.length === 0 || loading}
                    >
                        {saving && (
                            <Loader className="animate-spin mr-2" size={18} />
                        )}
                        Add Selected ({selectedIds.length})
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
