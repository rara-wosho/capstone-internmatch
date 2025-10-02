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
import { Album, Hourglass, Link2, Mail, MapPin, School } from "lucide-react";
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
            "id, applied_at, resume_link, portfolio_link, status, introduction, students!inner(id, firstname, lastname, gender, school, email, avatar_url, barangay, city, province)"
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
                            <button className="text-muted-foreground flex items-center justify-center rounded-sm hover:opacity-80 shadow-xs border size-9">
                                <Hourglass size={18} />
                            </button>
                            <Button variant="secondary">
                                <Mail />{" "}
                                <span className="hidden md:inline-block">
                                    Send Email
                                </span>
                            </Button>
                            <Button>Download CV</Button>
                        </div>
                    </div>

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

                        {applicant?.portfolio_link && (
                            <Link
                                target="_blank"
                                href={`${applicant?.portfolio_link}`}
                                className="flex items-center text-muted-foreground gap-2"
                            >
                                <Link2 size={15} />
                                <p className="text-sm">
                                    {applicant?.portfolio_link}
                                </p>
                            </Link>
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <FormLabel>Introduction</FormLabel>
                        <p className="text-sm text-muted-foreground dark:text-neutral-400">
                            {applicant?.introduction}
                        </p>
                    </div>
                </BorderBox>

                <BorderBox className="border rounded-xl bg-card shadow-xs flex items-center justify-between gap-2 mb-4 flex-wrap sm:flex-row-reverse">
                    <div className="flex items-center gap-2 grow sm:grow-0 sm:flex-row-reverse">
                        <Button className="grow" variant="success">
                            Accept
                        </Button>
                        <Button className="grow" variant="destructive">
                            Reject
                        </Button>
                    </div>
                    <Button variant="outline">Mark as Reviewed</Button>
                </BorderBox>
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
