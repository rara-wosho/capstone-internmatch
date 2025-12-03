import BreadCrumbs from "@/components/ui/BreadCrumbs";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import ErrorUi from "@/components/ui/ErrorUi";
import EmptyUi from "@/components/ui/EmptyUi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Building2,
    FileText,
    Link as LinkIcon,
    Mail,
    CheckCircle,
    XCircle,
    Clock,
    ExternalLink,
    User,
    Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";
import BorderBox from "@/components/ui/BorderBox";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/student-applications", label: "Student Applications" },
    { href: "", label: "Full Details" },
];

/**
 * Get status badge styling
 */
function getStatusConfig(status) {
    const configs = {
        pending: {
            label: "Pending Review",
            icon: Clock,
            className:
                "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20",
        },
        reviewed: {
            label: "Reviewed",
            icon: Check,
            className:
                "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20",
        },
        accepted: {
            label: "Accepted",
            icon: CheckCircle,
            className:
                "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20",
        },
        rejected: {
            label: "Rejected",
            icon: XCircle,
            className:
                "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/20",
        },
    };
    return configs[status] || configs.pending;
}

/**
 * Info Item Component
 */
function InfoItem({ icon: Icon, label, value, className = "" }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium truncate">{value}</p>
            </div>
        </div>
    );
}

/**
 * Application card component
 */
function ApplicationCard({ application }) {
    const statusConfig = getStatusConfig(application.status);
    const StatusIcon = statusConfig.icon;

    return (
        <BorderBox className="border rounded-xl bg-card hover:shadow-sm transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage
                            src={
                                application.companies?.avatar_url ||
                                "/images/default-company.jpg"
                            }
                            alt={application.companies?.name}
                        />
                        <AvatarFallback>
                            <Building2 className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-base truncate">
                            {application.companies?.name || "Unknown Company"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Applied {dateFormatter(application.applied_at)}
                        </p>
                    </div>
                </div>
                <Badge
                    variant="outline"
                    className={`${statusConfig.className} font-medium px-2.5 py-1`}
                >
                    <StatusIcon className="h-3.5 w-3.5 mr-1.5" />
                    {statusConfig.label}
                </Badge>
            </div>

            {/* Documents Grid */}
            {(application.resume_link ||
                application.cover_letter_url ||
                application.portfolio_link) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {application.resume_link && (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="justify-start h-auto py-2 px-3"
                        >
                            <Link
                                href={application.resume_link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-500/10">
                                        <FileText className="h-3.5 w-3.5 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-medium">
                                            Resume
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            View document
                                        </p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                                </div>
                            </Link>
                        </Button>
                    )}

                    {application.cover_letter_url && (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="justify-start h-auto py-2 px-3"
                        >
                            <Link
                                href={application.cover_letter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-purple-50 dark:bg-purple-500/10">
                                        <FileText className="h-3.5 w-3.5 text-purple-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-medium">
                                            Cover Letter
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            View document
                                        </p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                                </div>
                            </Link>
                        </Button>
                    )}

                    {application.portfolio_link && (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="justify-start h-auto py-2 px-3"
                        >
                            <a
                                href={application.portfolio_link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10">
                                        <LinkIcon className="h-3.5 w-3.5 text-emerald-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-medium">
                                            Portfolio
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            View link
                                        </p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                                </div>
                            </a>
                        </Button>
                    )}
                </div>
            )}

            {/* Introduction */}
            {application.introduction && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Introduction</h4>
                    <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {application.introduction}
                        </p>
                    </div>
                </div>
            )}

            {/* Approval Status */}

            <div className="flex items-center justify-between pt-3 border-t">
                {application?.approve_status && (
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                            Internship Approval:
                        </p>
                        <Badge variant="secondary" className="font-normal">
                            {application.approve_status
                                .charAt(0)
                                .toUpperCase() +
                                application.approve_status.slice(1) ??
                                "Awaiting"}
                        </Badge>
                    </div>
                )}
                <div className="text-xs text-muted-foreground">
                    Student ID: {application.id.slice(0, 8)}
                </div>
            </div>
        </BorderBox>
    );
}

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
