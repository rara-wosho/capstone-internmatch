import ApplicantActions from "@/components/blocks/ApplicantActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BorderBox from "@/components/ui/BorderBox";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import FormLabel from "@/components/ui/FormLabel";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import { Check, File, Link2, Mail, MapPin, School, X } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

const links = [
    { href: "", label: "Home" },
    { href: "/company/applicants", label: "Applicants" },
    { href: "", label: "Details" },
];

export default async function Page({ params }) {
    const { applicantId } = await params;

    const { user } = await getCurrentUser();

    if (!user?.id) {
        redirect("/sign-in");
    }

    const supabase = await createClient();

    const { data: applicant, error } = await supabase
        .from("applicants")
        .select(
            "id, applied_at, resume_link, portfolio_link, status, introduction, students!inner(id, firstname, lastname, gender, school, email, avatar_url, barangay, city, province), companies!inner(name, email)"
        )
        .eq("id", applicantId)
        .eq("company_id", user?.id)
        .single();

    // Handle errors - notFound for missing data, ErrorUi for other errors
    if (error) {
        if (error.code === "PGRST116") {
            // No rows returned
            notFound();
        }
        return <ErrorUi secondaryMessage={error.message} />;
    }

    const student = applicant?.students;

    return (
        <div>
            <Wrapper size="sm">
                {/* Header */}
                <div className="flex items-center mb-3 md:mb-5">
                    <div className="flex flex-col">
                        <SecondaryLabel>Applicant Details</SecondaryLabel>
                        <BreadCrumbs links={links} />
                    </div>
                </div>

                <BorderBox className="rounded-xl border bg-card shadow-xs mb-4">
                    <div className="flex items-center justify-between flex-wrap">
                        <Avatar className="w-28 aspect-square mb-4">
                            <AvatarImage
                                alt="avatar"
                                src={student?.avatar_url}
                            />
                            <AvatarFallback>
                                {student?.firstname?.charAt(0) || "?"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex items-center gap-2 mb-4 flex-row-reverse sm:flex-row">
                            <Button variant="secondary" asChild>
                                <Link href={`mailto:${student?.email}`}>
                                    <Mail />{" "}
                                    <span className="hidden md:inline-block">
                                        Send Email
                                    </span>
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link
                                    target="_blank"
                                    href={`${applicant?.resume_link}`}
                                >
                                    View Resume
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-y-3 gap-x-10 justify-between flex-wrap">
                        <div>
                            <div className="flex items-end">
                                <h1 className="font-medium">
                                    {student?.firstname} {student?.lastname}
                                </h1>

                                {student?.gender && (
                                    <p className="text-muted-foreground ms-2">
                                        - {student?.gender}
                                    </p>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {student?.email ?? "No email"}
                            </p>
                        </div>

                        <div
                            className={cn(
                                "px-6 py-2 rounded-full text-center text-sm flex gap-2 justify-center items-center grow sm:grow-0",
                                applicant?.status === "pending" &&
                                    "bg-neutral-500/15 text-neutral-700 dark:text-neutral-200 border-neutral-500/50",
                                applicant?.status === "accepted" &&
                                    "bg-green-500/15 text-green-600 dark:text-green-500 border-green-500/50",
                                applicant?.status === "rejected" &&
                                    "bg-red-500/10 text-red-600 dark:text-red-400 border-red-400/50",
                                applicant?.status === "reviewed" &&
                                    "bg-sky-500/15 text-sky-600 dark:text-sky-500 border-sky-500/50"
                            )}
                        >
                            <p className="capitalize">{applicant?.status}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 mb-5">
                        <div className="flex items-center text-muted-foreground gap-2">
                            <School size={14} />
                            <p className="text-sm">{student?.school}</p>
                        </div>
                        <div className="flex items-center text-muted-foreground gap-2">
                            <MapPin size={14} />
                            <p className="text-sm">
                                {student?.barangay}, {student?.city},{" "}
                                {student?.province}
                            </p>
                        </div>

                        {applicant?.resume_link && (
                            <Link
                                target="_blank"
                                href={`${applicant?.resume_link}`}
                                className="flex items-center text-muted-foreground gap-2 transition-colors hover:text-accent-foreground"
                            >
                                <File size={14} />

                                <p className="text-sm truncate max-w-[300px] hover:max-w-[700px]">
                                    Resume Link: {applicant?.resume_link}
                                </p>
                            </Link>
                        )}
                        {applicant?.portfolio_link && (
                            <Link
                                target="_blank"
                                href={`${applicant?.portfolio_link}`}
                                className="flex items-center text-muted-foreground gap-2 transition-colors hover:text-accent-foreground"
                            >
                                <Link2 size={15} />
                                <p className="text-sm">
                                    Portfolio: {applicant?.portfolio_link}
                                </p>
                            </Link>
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <FormLabel>Introduction</FormLabel>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                            {applicant?.introduction}
                        </p>
                    </div>
                </BorderBox>

                <ApplicantActions applicant={applicant} />

                <BorderBox className="border rounded-xl bg-card shadow-xs">
                    <p>Exam Results</p>
                    <Suspense fallback={<Skeleton className="h-3 w-36" />}>
                        <StudentExamResults
                            studentId={student?.id}
                            companyId={user?.id}
                        />
                    </Suspense>
                </BorderBox>
            </Wrapper>
        </div>
    );
}

async function StudentExamResults({ studentId, companyId }) {
    if (!studentId || !companyId) {
        return (
            <p className="text-sm text-muted-foreground mt-4">
                Unable to load exam results
            </p>
        );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("exam_attempt")
        .select("id, score, exam_title")
        .eq("student_id", studentId)
        .eq("company_id", companyId);

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }
    return (
        <div>
            {data.length > 0 ? (
                data.map((attempt) => (
                    <div key={attempt.id}>
                        {attempt.exam_title} - Score: {attempt.score}
                    </div>
                ))
            ) : (
                <p>No exam attempts found</p>
            )}
        </div>
    );
}
