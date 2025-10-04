import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "@/components/ui/BackButton";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { studentId } = await params;

    if (!studentId) {
        notFound();
    }

    const supabase = await createClient();
    const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select(
            "id, firstname, lastname, middlename, school, course, age,  gender, email, avatar_url, exam_attempt!inner(score, exam_title)"
        )
        .eq("id", studentId)
        .single();

    if (studentError) {
        return <ErrorUi secondaryMessage={studentError.message} />;
    }

    console.log(studentData);
    return (
        <div>
            <Wrapper size="sm">
                {/* Header */}
                <BackButton className="flex items-center mb-5 text-muted-foreground">
                    <ChevronLeft size={18} /> Back
                </BackButton>
                <div className="flex items-center mb-3 md:mb-5 flex-wrap gap-4">
                    <Avatar className="w-24 aspect-square">
                        <AvatarImage
                            src={
                                studentData?.avatar_url
                                    ? studentData?.avatar_url
                                    : "/images/default-avatar.jpg"
                            }
                            alt="student-img"
                        />

                        <AvatarFallback>
                            {studentData?.firstname.charAt(0) || "?"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="details">
                        <h1 className="font-medium mb-1">
                            {studentData?.firstname}{" "}
                            {studentData?.middlename &&
                                studentData?.middlename.charAt(0)}{" "}
                            {studentData?.lastname}
                        </h1>
                        <p className="text-sm text-muted-foreground mb-1">
                            {studentData?.school}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {studentData?.email}
                        </p>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
