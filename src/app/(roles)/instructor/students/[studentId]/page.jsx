import ChangeExamAccessModal from "@/components/modals/ChangeExamAccessModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BorderBox from "@/components/ui/BorderBox";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import TitleText from "@/components/ui/TitleText";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import {
    ArrowUpRight,
    Check,
    ChevronRight,
    X,
    Calendar,
    MapPin,
    User,
    Mail,
    Building,
    BookOpen,
    FileText,
    Award,
    Briefcase,
    Home,
    GraduationCap,
} from "lucide-react";
import Link from "next/link";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/students", label: "Students" },
    { href: "", label: "Student Details" },
];

/**
 * Info Item Component
 */
function InfoItem({ icon: Icon, label, value, className = "" }) {
    return (
        <div className={`flex items-start gap-3 ${className}`}>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                    {label}
                </p>
                <p className="text-base font-semibold mt-0.5 truncate">
                    {value || "N/A"}
                </p>
            </div>
        </div>
    );
}

export default async function Page({ params }) {
    const { studentId } = await params;

    const supabase = await createClient();

    const { data: studentData, error } = await supabase
        .from("students")
        .select(
            `
            id,
            created_at,
            firstname,
            lastname,
            middlename,
            barangay,
            city,
            province,
            age,
            gender,
            email,
            exam_access,
            avatar_url,
            groups(id, group_name),
            assessment_attempt(submitted_at, assessment_score, assessment_total_item, assessment_test(assessment_title)),
            exam_attempt(exam_title, completed_at, score, total_questions),
            applicants(id,approve_status, cover_letter_url, resume_link, applied_at, introduction, companies(name))
            `
        )
        .eq("id", studentId)
        .maybeSingle();

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    if (!studentData) {
        return (
            <ErrorUi
                message="Student Not Found"
                secondaryMessage="The requested student doesn't exist or there is no data to display."
            />
        );
    }

    console.log("studentdata", studentData);

    const applications = studentData?.applicants?.map((app) => {
        if (app?.approve_status === "approved") {
            return { is_intern: true, company: app?.companies?.name };
        }
        return { is_intern: false };
    });

    const isIntern = applications?.some((app) => app.is_intern);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="space-y-2">
                <BreadCrumbs links={links} />
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Avatar className="w-24 h-24 border-4">
                        <AvatarImage
                            src={
                                studentData?.avatar_url ||
                                "/images/default-avatar.jpg"
                            }
                            alt={`${studentData.firstname} ${studentData.lastname}`}
                        />
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                            {studentData?.firstname?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {studentData.firstname} {studentData.middlename}{" "}
                            {studentData.lastname}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                Joined {dateFormatter(studentData.created_at)}
                            </div>
                            {studentData.groups?.group_name && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Building className="h-4 w-4" />
                                    {studentData.groups.group_name}
                                </div>
                            )}
                            {isIntern && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                                    <Briefcase className="h-3.5 w-3.5" />
                                    Intern
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Student Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Personal Information */}
                <BorderBox className="border rounded-xl bg-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold">
                                Personal Information
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InfoItem
                                icon={User}
                                label="Age"
                                value={studentData.age}
                            />
                            <InfoItem
                                icon={User}
                                label="Gender"
                                value={studentData.gender}
                            />
                        </div>

                        <InfoItem
                            icon={Mail}
                            label="Email"
                            value={studentData.email}
                        />

                        <InfoItem
                            icon={MapPin}
                            label="Address"
                            value={
                                <span>
                                    {studentData.barangay &&
                                        `${studentData.barangay}, `}
                                    {studentData.city &&
                                        `${studentData.city}, `}
                                    {studentData.province}
                                </span>
                            }
                        />
                    </div>
                </BorderBox>

                {/* Exam Access Status */}
                <BorderBox className="border rounded-xl bg-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold">
                                Exam Access
                            </h2>
                        </div>
                        <ChangeExamAccessModal
                            currentAccess={studentData?.exam_access}
                            studentId={studentId}
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center py-4">
                        <div
                            className={cn(
                                "rounded-full w-20 h-20 flex items-center justify-center mb-4 border-8",
                                studentData?.exam_access
                                    ? "border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                                    : "border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-500/20 dark:bg-slate-500/10"
                            )}
                        >
                            {studentData?.exam_access ? (
                                <Check size={32} />
                            ) : (
                                <X size={32} />
                            )}
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-lg font-semibold">
                                {studentData.exam_access
                                    ? "Access Granted"
                                    : "Access Restricted"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {studentData.exam_access
                                    ? "Student can take exams"
                                    : "Student cannot take exams"}
                            </p>
                        </div>
                    </div>
                </BorderBox>

                {/* Applications Submitted */}
                <BorderBox className="border rounded-xl bg-card p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <Briefcase className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">
                                Applications
                            </h2>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {studentData?.applicants?.length || 0} total
                                submissions
                            </p>
                        </div>
                    </div>

                    {studentData?.applicants?.length > 0 ? (
                        <div className="space-y-3">
                            {studentData.applicants.slice(0, 3).map((app) => (
                                <div
                                    key={app.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">
                                            {app?.companies?.name ||
                                                "Unknown Company"}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {dateFormatter(app?.applied_at)}
                                        </p>
                                    </div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={`/instructor/student-applications/${studentData?.id}`}
                                                className="p-2 rounded-lg bg-background border hover:bg-accent transition-colors"
                                            >
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            View Details
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            ))}

                            {studentData.applicants.length > 3 && (
                                <div className="pt-2 border-t">
                                    <Link
                                        href={`/instructor/student-applications/${studentData?.id}`}
                                        className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
                                    >
                                        View all {studentData.applicants.length}{" "}
                                        applications
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="p-3 rounded-full bg-muted inline-flex mb-3">
                                <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                No applications submitted yet
                            </p>
                        </div>
                    )}
                </BorderBox>
            </div>

            {/* Assessment test History */}
            <BorderBox className="border rounded-xl bg-card">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                        <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">
                            Assessment Test Taken
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {studentData?.assessment_attempt?.length || 0}{" "}
                            Assessment tests completed
                        </p>
                    </div>
                </div>

                {studentData?.exam_attempt?.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="p-3 rounded-full bg-muted inline-flex mb-3">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            No assessment test taken yet
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {studentData?.assessment_attempt?.map((test) => (
                            <div
                                key={test.assessment_test?.assessment_title}
                                className="p-4 rounded-lg border bg-background hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold truncate">
                                        {
                                            test?.assessment_test
                                                ?.assessment_title
                                        }
                                    </h3>
                                    {test.assessment_score !== undefined &&
                                        test.assessment_total_item && (
                                            <div className="flex-shrink-0 ml-2">
                                                <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                                    {test.assessment_score}/
                                                    {test.assessment_total_item}
                                                </div>
                                            </div>
                                        )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {dateFormatter(test?.submitted_at)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </BorderBox>
            {/* Exam History */}
            <BorderBox className="border rounded-xl bg-card">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                        <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">Exams Taken</h2>
                        <p className="text-sm text-muted-foreground">
                            {studentData?.exam_attempt?.length || 0} exams
                            completed
                        </p>
                    </div>
                </div>

                {studentData?.exam_attempt?.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="p-3 rounded-full bg-muted inline-flex mb-3">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            No exams taken yet
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {studentData?.exam_attempt?.map((exam) => (
                            <div
                                key={exam.exam_title}
                                className="p-4 rounded-lg border bg-background hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold truncate">
                                        {exam?.exam_title}
                                    </h3>
                                    {exam.score !== undefined &&
                                        exam.total_questions && (
                                            <div className="flex-shrink-0 ml-2">
                                                <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                                    {exam.score}/
                                                    {exam.total_questions}
                                                </div>
                                            </div>
                                        )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {dateFormatter(exam.completed_at)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </BorderBox>

            {/* Intern Status Banner */}
            {isIntern && (
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-emerald-500/20">
                            <Briefcase className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                                Current Intern
                            </h3>
                            <p className="text-emerald-700 dark:text-emerald-400">
                                {
                                    applications.find((app) => app.is_intern)
                                        ?.company
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
