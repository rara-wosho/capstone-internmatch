import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleText from "@/components/ui/TitleText";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import {
    getRecentAssessmentTest,
    getStudentProfileData,
    getStudentRecentExams,
} from "@/lib/actions/student";
import { dateFormatter } from "@/utils/date-formatter";
import {
    FileText,
    GraduationCap,
    Mail,
    MapPin,
    NotepadText,
    PencilLine,
    Settings,
    ShieldCheck,
    User,
    Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Page metadata
export const metadata = {
    title: "Profile | InternMatch",
};

export default async function StudentProfilePage() {
    const { user, error } = await getCurrentUser();

    if (error) {
        return <ErrorUi />;
    }

    // ✅ If not logged in or user mismatch, go 404
    if (!user || !user?.id) {
        notFound();
    }

    const {
        success,
        data: studentData,
        error: studentErr,
    } = await getStudentProfileData(user.id);

    if (!success) {
        return <ErrorUi secondaryMessage={studentErr} />;
    }

    console.log("student data: ", studentData);
    if (!studentData) {
        notFound();
    }

    const ojt_instructor = studentData?.groups?.ojt_instructors;

    return (
        <Wrapper size="sm">
            {/* ======= HEADER ========  */}
            <div className="flex items-center flex-wrap justify-between gap-5 mb-5">
                <div className="flex items-center gap-3 flex-wrap">
                    <Avatar className="w-[130px] aspect-square">
                        <AvatarImage
                            src={
                                studentData?.avatar_url ||
                                "/images/default-avatar.jpg"
                            }
                        />
                        <AvatarFallback>
                            {studentData?.firstname?.[0] || "?"}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <SecondaryLabel>
                            {studentData?.firstname} {studentData?.lastname}
                        </SecondaryLabel>

                        <p className="text-muted-foreground mt-1">
                            {studentData?.school}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                            <Button asChild>
                                <Link href="/student/account/edit">
                                    <PencilLine /> Edit Profile
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/student/profile/activities">
                                    Activity Logs
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ======= PROFILE TABS ========  */}
            <div className="rounded-xl bg-card shadow-xs border px-4 pb-4">
                <Tabs defaultValue="profile" className="w-full">
                    <div className="border-b overflow-x-auto overflow-y-hidden mb-4">
                        <TabsList className="h-[55px] gap-4 pt-[2px]">
                            <TabsTrigger value="profile">
                                <User /> Profile
                            </TabsTrigger>
                            <TabsTrigger value="group">
                                <Users />
                                Group
                            </TabsTrigger>
                            <TabsTrigger value="credentials">
                                <ShieldCheck />
                                Credentials
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* ===== PROFILE TAB ===== */}
                    <TabsContent value="profile">
                        <TitleText className="mb-2">Intro</TitleText>

                        <div className="flex flex-col gap-1 mb-5">
                            <div className="flex items-center gap-2">
                                <div className="size-5 flex items-center justify-center shrink-0">
                                    <Mail size={16} />
                                </div>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    {studentData?.email}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-5 flex items-center justify-center shrink-0">
                                    <GraduationCap size={18} />
                                </div>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    {studentData?.school}
                                </p>
                            </div>

                            {studentData?.city && (
                                <div className="flex items-center gap-2">
                                    <div className="size-5 flex items-center justify-center shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <p className="text-muted-foreground text-sm sm:text-base">
                                        {studentData?.barangay},{" "}
                                        {studentData?.city},{" "}
                                        {studentData?.province}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ===== INTERESTS ===== */}
                        <div className="flex items-center mb-2 justify-between">
                            <TitleText>Interests</TitleText>
                            <Link
                                href="/student/interests"
                                className="p-2 hover:text-accent-foreground"
                            >
                                <Settings size={16} />
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            {!studentData?.interests?.interest?.length ? (
                                <div className="text-muted-foreground">
                                    You did not put any interests yet.{" "}
                                    <Link
                                        className="underline"
                                        href="/student/interests"
                                    >
                                        Add now
                                    </Link>
                                </div>
                            ) : (
                                studentData.interests.interest.map((inter) => (
                                    <div
                                        key={inter}
                                        className="rounded-full bg-muted px-3 h-8 flex items-center text-sm whitespace-nowrap"
                                    >
                                        {inter}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* ===== RECENT EXAMS ===== */}
                        <Suspense fallback={null}>
                            <ExamsTaken studentId={user.id} />
                        </Suspense>
                        {/* ===== RECENT ASSESSMENT TEST ===== */}
                        <Suspense fallback={null}>
                            <AssessmentTaken studentId={user.id} />
                        </Suspense>
                    </TabsContent>

                    {/* ===== CREDENTIALS TAB ===== */}
                    <TabsContent value="credentials">
                        <p className="text-muted-foreground">
                            Change your password here.
                        </p>
                    </TabsContent>

                    {/* ===== GROUP TAB ===== */}
                    <TabsContent value="group">
                        <div className="mb-2">
                            <TitleText>
                                {studentData?.groups?.group_name || "—"}
                            </TitleText>
                            <p className="text-muted-foreground text-sm">
                                Your group's name
                            </p>
                        </div>
                        {ojt_instructor && (
                            <div className="mb-2">
                                <TitleText>
                                    {ojt_instructor?.firstname}{" "}
                                    {ojt_instructor?.lastname}
                                </TitleText>
                                <p className="text-muted-foreground text-sm">
                                    OJT Instructor / Group Creator
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </Wrapper>
    );
}

// ======== RECENT EXAMS COMPONENT ========
async function ExamsTaken({ studentId }) {
    const { success, error, data } = await getStudentRecentExams(studentId);

    if (!success || error) {
        return (
            <div className="text-red-500 text-sm">
                Something went wrong while fetching your recent exams.
            </div>
        );
    }

    if (!data?.length) return null;

    return (
        <div className="border-t pt-4 mt-6">
            <TitleText className="mb-3">Exams Taken</TitleText>
            <div className="space-y-3">
                {data.map((exam) => (
                    <div key={exam.id} className="flex items-center gap-2">
                        <div className="text-green-500 bg-green-500/10 p-2 rounded-sm border-green-500/10">
                            <NotepadText size={18} />
                        </div>
                        <div className="w-full">
                            <p className="text-sm">
                                {exam.exams?.is_deleted && (
                                    <span className="text-destructive">
                                        Deleted exam -{" "}
                                    </span>
                                )}
                                {exam.exam_title}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <p>
                                    Score: {exam.score ?? 0}/
                                    {exam.total_questions ?? "—"}
                                </p>
                                <p>{dateFormatter(exam.completed_at)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
// ======== RECENT ASSESSMENT TEST COMPONENT ========
async function AssessmentTaken({ studentId }) {
    const { success, error, data } = await getRecentAssessmentTest(studentId);

    if (!success || error) {
        return (
            <div className="text-red-500 text-sm">
                Something went wrong while fetching your recent assessment
                tests.
            </div>
        );
    }

    if (!data?.length) return null;

    return (
        <div className="border-t pt-4 mt-6">
            <TitleText className="mb-3">Assessment Tests Taken</TitleText>
            <div className="space-y-3">
                {data.map((test) => (
                    <div key={test.id} className="flex items-center gap-2">
                        <div className="text-blue-500 bg-blue-500/10 p-2 rounded-sm border-blue-500/10">
                            <FileText size={18} />
                        </div>
                        <div className="w-full">
                            <p className="text-sm">
                                <span className="text-destructive">
                                    {test.is_deleted && "Deleted test - "}
                                </span>
                                {test.assessment_title}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <p>
                                    Score: {test.score}/{test.total_questions}
                                </p>
                                <p>{dateFormatter(test.completed_at)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
