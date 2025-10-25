import EditStudentForm from "@/components/forms/EditStudentForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "@/components/ui/BackButton";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import ProfilePercentage from "@/components/ui/ProfilePercentage";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import UploadAvatar from "@/components/UploadAvatar";
import Wrapper from "@/components/Wrapper";
import { getStudentEditData } from "@/lib/actions/student";
import { ChevronLeft } from "lucide-react";

export default async function StudentEditAccountPage({ params }) {
    const isOnboarding = (await params)?.onboarding || "";

    const {
        success,
        percentage,
        data: studentData,
        error,
    } = await getStudentEditData();

    if (!success) {
        return <ErrorUi secondaryMessage={error} />;
    }

    return (
        <Wrapper size="sm">
            <BackButton className="flex items-center mb-2 text-muted-foreground">
                <ChevronLeft size={19} /> Back
            </BackButton>
            <SecondaryLabel className="mb-3 md:mb-4">
                Edit Profile Details
            </SecondaryLabel>

            {percentage !== 100 && (
                <div className="w-full mb-3">
                    <ProfilePercentage />
                </div>
            )}

            <BorderBox className="mb-3 bg-card shadow-xs flex flex-col items-center gap-3 rounded-xl">
                <Avatar className="w-[110px] aspect-square">
                    <AvatarImage
                        src={
                            studentData.avatar_url ||
                            "/images/default-avatar.jpg"
                        }
                    />

                    <AvatarFallback>
                        {studentData?.firstname?.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <div className="mx auto max-w-[300px]">
                    <UploadAvatar currentAvatarUrl={studentData.avatar_url} />
                </div>
            </BorderBox>

            <EditStudentForm studentData={studentData} />
        </Wrapper>
    );
}
