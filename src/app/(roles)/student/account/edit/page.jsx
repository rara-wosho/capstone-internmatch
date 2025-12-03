import EditStudentForm from "@/components/forms/EditStudentForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "@/components/ui/BackButton";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import ProfilePercentage from "@/components/ui/ProfilePercentage";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import UploadAvatar from "@/components/UploadAvatar";
import Wrapper from "@/components/Wrapper";
import { getStudentEditData } from "@/lib/actions/student";
import { ChevronLeft } from "lucide-react";

export default async function StudentEditAccountPage({ searchParams }) {
    const onboarding = (await searchParams)?.onboarding || "";
    const isOnboarding = onboarding === "yes";

    const { success, data: studentData, error } = await getStudentEditData();

    if (!success) {
        return <ErrorUi secondaryMessage={error} />;
    }

    console.log("edit student data:", studentData);

    return (
        <Wrapper size="sm">
            {!isOnboarding && (
                <BackButton className="flex items-center mb-2 text-muted-foreground">
                    <ChevronLeft size={19} /> Back
                </BackButton>
            )}
            <SecondaryLabel className="mb-3 md:mb-4">
                <div>
                    <p>
                        {isOnboarding
                            ? "🚀 Let’s Get Your Account Ready"
                            : "Edit Profile Details"}
                    </p>
                    {isOnboarding && (
                        <p className="text-muted-foreground text-sm font-normal">
                            You’re almost there! Just a few more steps to
                            personalize your experience and start exploring
                            opportunities.
                        </p>
                    )}
                </div>
            </SecondaryLabel>

            {studentData?.percentage !== 100 && (
                <div className="w-full mb-3">
                    <ProfilePercentage />
                </div>
            )}

            <BorderBox className="mb-3 bg-card shadow-xs flex items-center gap-5 rounded-xl">
                <Avatar className="w-[120px] aspect-square">
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

                <div>
                    <UploadAvatar currentAvatarUrl={studentData.avatar_url} />
                </div>
            </BorderBox>

            <EditStudentForm
                isOnboarding={isOnboarding}
                studentData={studentData}
            />
        </Wrapper>
    );
}
