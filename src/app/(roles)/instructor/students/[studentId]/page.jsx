import ChangeExamAccessModal from "@/components/modals/ChangeExamAccessModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BorderBox from "@/components/ui/BorderBox";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import { createClient } from "@/lib/supabase/server";
import { dateFormatter } from "@/utils/date-formatter";
import Image from "next/image";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/students", label: "Students" },
    { href: "", label: "Student Details" },
];

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
            exam_attempt(exam_title, completed_at)
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
                message="No student found with that ID."
                secondaryMessage="This is maybe because the student doesn't exist or there is no data to be shown."
            />
        );
    }

    return (
        <div>
            {/* Header */}
            <div>
                <BreadCrumbs links={links} />
                <div className="mt-2 flex items-center gap-4 mb-3">
                    <Avatar className="w-[100px] aspect-square">
                        <AvatarImage
                            src={
                                studentData?.avatar_url ||
                                "/images/default-avatar.jpg"
                            }
                        />
                        <AvatarFallback>
                            {studentData?.firstname.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <SecondaryLabel>
                            {studentData.firstname} {studentData.middlename}{" "}
                            {studentData.lastname}
                        </SecondaryLabel>
                        <p className="text-sm text-muted-foreground">
                            Joined at: {dateFormatter(studentData.created_at)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Member of:{" "}
                            {studentData.groups?.group_name || "No group"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Student Info Section */}
            <BorderBox className="border rounded-xl bg-card mb-2">
                <TitleText className="mb-2">Personal Information</TitleText>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-medium">Age:</p>
                        <p>{studentData.age || "N/A"}</p>
                    </div>
                    <div>
                        <p className="font-medium">Gender:</p>
                        <p>{studentData.gender || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="font-medium">Email:</p>
                        <p>{studentData.email}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="font-medium">Address:</p>
                        <p>
                            {studentData.barangay || "N/A"},{" "}
                            {studentData.city || "N/A"},{" "}
                            {studentData.province || "N/A"}
                        </p>
                    </div>
                </div>
            </BorderBox>

            <BorderBox className="border rounded-xl bg-card mb-2">
                <div className="flex items-center gap-2 justify-between mb-2">
                    <TitleText>Exam Access</TitleText>
                    <ChangeExamAccessModal
                        currentAccess={studentData?.exam_access}
                        studentId={studentId}
                    />
                </div>
                <p className="text-sm mt-1">
                    {studentData.exam_access
                        ? "Student currently has access to exams."
                        : "Exam access is currently disabled."}
                </p>
            </BorderBox>
            <BorderBox className="border rounded-xl bg-card mb-2">
                <TitleText className="mb-2">Exams Taken</TitleText>
                {studentData?.exam_attempt?.length === 0 ? (
                    <div>
                        <p className="text-sm text-muted-foreground">
                            No exams taken yet.
                        </p>
                    </div>
                ) : (
                    studentData?.exam_attempt?.map((exam) => (
                        <div
                            className="mb-1.5 text-muted-foreground"
                            key={exam.exam_title}
                        >
                            <p className="text-sm font-medium">
                                {exam?.exam_title}
                            </p>
                            <p className="text-sm">
                                {dateFormatter(exam.completed_at)}
                            </p>
                        </div>
                    ))
                )}
            </BorderBox>
        </div>
    );
}
