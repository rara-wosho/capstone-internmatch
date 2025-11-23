import { ChevronRight, Mail, MapPin } from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ApplicantCard({ applicant, type = "default" }) {
    const student = applicant?.students;
    return (
        <div className="rounded-xl shadow bg-card p-3 md:p-4 lg:p-5 border flex flex-col items-start">
            <div className="w-full flex items-start justify-between">
                <div className="mb-3 w-24 aspect-square rounded-full">
                    <Avatar className="w-24 aspect-square">
                        <AvatarImage
                            src={
                                student?.avatar_url ||
                                "/images/default-avatar.jpg"
                            }
                            alt="applicant-image"
                        />

                        <AvatarFallback>
                            {student?.firstname.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {applicant?.status && (
                    <div
                        className={cn(
                            "flex items-center gap-2 text-sm rounded-full border px-3 py-1 capitalize",
                            applicant?.status === "pending" &&
                                "border-neutral-500/40 text-neutral-700 dark:text-neutral-300 bg-secondary",
                            applicant?.status === "reviewed" &&
                                "border-sky-500/40 text-sky-600 dark:text-sky-500 bg-sky-500/10",
                            applicant?.status === "accepted" &&
                                "border-green-500/40 text-green-600 dark:text-green-500 bg-green-500/10",
                            applicant?.status === "rejected" &&
                                "border-red-400/40 text-red-600 dark:text-red-400 bg-red-500/10"
                        )}
                    >
                        {applicant?.status}
                    </div>
                )}
            </div>

            {applicant.approve_status === "rejected" && (
                <p className="font-medium text-destructive">Cannot Proceed</p>
            )}
            {applicant.approve_status === "approved" && (
                <p className="font-medium text-green-600">Approved</p>
            )}

            <p className="font-medium mb-1 text-start">
                {student?.firstname} {student?.lastname}
            </p>
            <p className="text-sm text-muted-foreground text-start">
                {student?.school || "School not set"}
            </p>

            <div className="flex flex-col gap-2 items-start w-full py-3">
                {student?.barangay && student?.city && student?.province && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin size={14} />
                        <p className="text-sm">
                            {student?.barangay}, {student?.city},{" "}
                            {student?.province}
                        </p>
                    </div>
                )}
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail size={14} />
                    <p className="text-sm">{student?.email}</p>
                </div>
            </div>
            <div className="w-full mt-auto pt-2">
                {type === "default" ? (
                    <Button
                        className="w-full"
                        size="sm"
                        variant="outlineWhite"
                        asChild
                    >
                        <Link href={`/company/applicants/${applicant?.id}`}>
                            View Application
                        </Link>
                    </Button>
                ) : (
                    <Button
                        className="w-full"
                        size="sm"
                        variant="outlineWhite"
                        asChild
                    >
                        <Link href={`/company/approved-applicants/next-steps`}>
                            Next Steps <ChevronRight />
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}
