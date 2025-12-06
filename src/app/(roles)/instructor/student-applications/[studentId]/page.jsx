import BreadCrumbs from "@/components/ui/BreadCrumbs";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import ErrorUi from "@/components/ui/ErrorUi";
import EmptyUi from "@/components/ui/EmptyUi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link as LinkIcon, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BorderBox from "@/components/ui/BorderBox";
import ApplicationCard from "@/components/cards/ApplicationCard";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/student-applications", label: "Student Applications" },
    { href: "", label: "Full Details" },
];

export default async function StudentApplicationsPage({ params }) {
    const studentId = (await params)?.studentId || "";

    if (!studentId) {
        return <ErrorUi secondaryMessage="Student ID is required." />;
    }

    const supabase = await createClient();

    // Fetch student info and applications
    const [studentResult, applicationsResult] = await Promise.all([
        supabase
            .from("students")
            .select(
                "id, firstname, lastname, email, school, avatar_url, course"
            )
            .eq("id", studentId)
            .single(),
        supabase
            .from("applicants")
            .select(
                `
                id,
                status,
                approve_status,
                applied_at,
                resume_link,
                cover_letter_url,
                portfolio_link,
                introduction,
                companies!inner(
                    id,
                    name,
                    avatar_url,
                    email
                )
            `
            )
            .eq("student_id", studentId)
            .order("applied_at", { ascending: false }),
    ]);

    // Handle errors
    if (studentResult.error) {
        return <ErrorUi secondaryMessage={studentResult.error.message} />;
    }

    if (applicationsResult.error) {
        return <ErrorUi secondaryMessage={applicationsResult.error.message} />;
    }

    const student = studentResult.data;
    const applications = applicationsResult.data || [];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="space-y-1">
                <BreadCrumbs links={links} />
                <div>
                    <SecondaryLabel>Student Applications</SecondaryLabel>
                </div>
            </div>

            {/* Student Profile */}
            <BorderBox className="border rounded-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                        <AvatarImage
                            src={
                                student.avatar_url ||
                                "/images/default-avatar.jpg"
                            }
                            alt={`${student.firstname} ${student.lastname}`}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            <User className="h-8 w-8" />
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {student.firstname} {student.lastname}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {student?.email}
                                </p>
                            </div>

                            <Button asChild>
                                <Link
                                    href={`/instructor/students/${studentId}`}
                                >
                                    View Profile
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </BorderBox>

            {/* Applications Section */}
            <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Applications History
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Review all applications submitted by this student
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className="self-start sm:self-center"
                    >
                        {applications.length} application
                        {applications.length !== 1 ? "s" : ""}
                    </Badge>
                </div>

                {applications.length === 0 ? (
                    <EmptyUi
                        message="No Applications Yet"
                        secondaryMessage="This student hasn't submitted any applications yet."
                        className="py-12"
                    />
                ) : (
                    <div className="space-y-5">
                        {applications.map((application) => (
                            <ApplicationCard
                                key={application.id}
                                application={application}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
