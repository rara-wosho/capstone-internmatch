import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import UploadAvatar from "@/components/UploadAvatar";
import { getCurrentUser } from "@/lib/actions/auth";
import { getStudentProfileData } from "@/lib/actions/student";
import { Mail, MapPin, SquareArrowOutUpRight, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Set page  title
export const metadata = {
    title: "Profile | InternMatch",
};

export default async function Page({ params }) {
    const { userId } = await params;

    const { user, error } = await getCurrentUser();

    if (error) {
        return <ErrorUi />;
    }

    if (!user || user?.id !== userId) {
        notFound();
    }

    const {
        success,
        data: studentData,
        error: studentErr,
    } = await getStudentProfileData(userId);

    if (!success) {
        return <ErrorUi secondaryMessage={studentErr} />;
    }

    if (!studentData) {
        notFound();
    }

    return (
        <div>
            <SecondaryLabel className="mb-3 gap-2.5">
                <IconWrapper>
                    <User size={20} />
                </IconWrapper>
                Edit Profile
            </SecondaryLabel>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-3 md:gap-4">
                <div className="rounded-xl border bg-card shadow-xs">
                    <BorderBox>
                        <div className="border-b mb-5 pb-5 flex flex-col items-center justify-center gap-y-5">
                            <Link
                                href={studentData?.avatar_url || "#"}
                                target={
                                    studentData?.avatar_url ? "_blank" : "_self"
                                }
                                className="pt-4"
                            >
                                <Avatar className="w-[150px] aspect-square">
                                    <AvatarImage
                                        src={
                                            studentData.avatar_url ||
                                            "/images/default-avatar.jpg"
                                        }
                                        alt={`${studentData.firstname}'s avatar`}
                                    />
                                    <AvatarFallback>
                                        {studentData.firstname?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                            <p className="text-xs">Change your avatar</p>
                            <UploadAvatar
                                currentAvatarUrl={studentData.avatar_url}
                            />
                        </div>
                        <TertiaryLabel>
                            {studentData?.firstname} {studentData?.lastname}
                        </TertiaryLabel>

                        <p className="text-muted-foreground mt-2 text-sm flex items-center gap-2">
                            <Mail size={15} />
                            {studentData?.email}
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm flex items-center gap-2">
                            <MapPin size={15} />
                            Iligan City, Lanao del norte
                        </p>
                    </BorderBox>
                </div>
                <BorderBox className="border rounded-xl bg-card shadow-xs">
                    <Button asChild variant="outline">
                        <Link href="/student/profile/activities">
                            Activity Logs
                        </Link>
                    </Button>
                </BorderBox>
            </div>
        </div>
    );
}
