"use client";

import { dateFormatter } from "@/utils/date-formatter";
import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import { updateApplicationStatus } from "@/lib/actions/application";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader } from "lucide-react";

export default function ApplicantActions({ applicant }) {
    const [isPending, startTransition] = useTransition();

    const handleChangeStatus = async (newStatus) => {
        startTransition(async () => {
            const result = await updateApplicationStatus({
                newStatus,
                applicationId: applicant.id,
                receiver: applicant?.students?.email || "",
                studentName: `${applicant?.students?.firstname} ${applicant?.students?.lastname}`,
                companyName: applicant?.companies?.name,
                companyEmail: applicant?.companies?.email,
                instructorId: applicant?.students?.ojt_instructor_id,
            });

            if (!result.success) {
                toast.error(result?.error);
                return;
            }

            toast.success("Status updated successfully.");
        });
    };

    console.log("applicant", applicant);

    return (
        <div className="border rounded-xl bg-card shadow-xs mb-3">
            <div className="py-3 px-3 md:px-5 border-b flex items-center justify-between gap-2 flex-wrap">
                <p className="text-sm text-muted-foreground">
                    Applied at:{" "}
                    <span>{dateFormatter(applicant?.applied_at)}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                    Status:{" "}
                    <span className="text-secondary-foreground uppercase text-sm">
                        {applicant?.status}
                    </span>
                </p>
            </div>
            <BorderBox className="flex items-center justify-between gap-2 flex-wrap sm:flex-row-reverse relative">
                {isPending && (
                    <div className="absolute py-2 px-5 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-secondary rounded-sm z-10">
                        <p className="text-secondary-foreground text-sm flex items-center gap-2">
                            <Loader className="animate-spin" size={14} />
                            Please wait...
                        </p>
                    </div>
                )}
                <div className="flex items-center gap-2 grow sm:grow-0 sm:flex-row-reverse">
                    <Button
                        disabled={
                            isPending ||
                            applicant.status === "accepted" ||
                            applicant.status === "rejected"
                        }
                        onClick={() => handleChangeStatus("accepted")}
                        className="grow"
                        variant="success"
                    >
                        {applicant.status === "accepted"
                            ? "Accepted"
                            : "Accept"}
                    </Button>
                    <Button
                        disabled={
                            isPending ||
                            applicant.status === "rejected" ||
                            applicant.status === "accepted"
                        }
                        onClick={() => handleChangeStatus("rejected")}
                        className="grow"
                        variant="destructive"
                    >
                        {applicant.status === "rejected"
                            ? "Rejected"
                            : "Reject"}
                    </Button>
                </div>
                <Button
                    disabled={
                        isPending ||
                        applicant.status === "reviewed" ||
                        applicant.status === "rejected" ||
                        applicant.status === "accepted"
                    }
                    onClick={() => handleChangeStatus("reviewed")}
                    variant="outline"
                >
                    {applicant.status === "reviewed"
                        ? "Reviewed"
                        : "Mark as Reviewed"}
                </Button>
            </BorderBox>
        </div>
    );
}
