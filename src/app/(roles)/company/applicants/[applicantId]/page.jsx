import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ErrorUi from "@/components/ui/ErrorUi";
import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

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
            "id, applied_at, resume_link, portfolio_link, status, introduction, students!inner(id, firstname, lastname, gender, school, email, avatar_url)"
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
                <Avatar className="w-28 aspect-square mb-4">
                    <AvatarImage alt="avatar" src={student?.avatar_url} />
                    <AvatarFallback>
                        {student?.firstname?.charAt(0) || "?"}
                    </AvatarFallback>
                </Avatar>

                <div className="flex items-end mb-1">
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
                    {student?.school ?? "School not set"}
                </p>

                <Suspense fallback={<Skeleton className="h-3 w-36" />}>
                    <StudentExamResults
                        studentId={student?.id}
                        companyId={user?.id}
                    />
                </Suspense>
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
