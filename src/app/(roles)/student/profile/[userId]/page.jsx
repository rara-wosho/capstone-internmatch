import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import FormLabel from "@/components/ui/FormLabel";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleText from "@/components/ui/TitleText";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { getStudentProfileData } from "@/lib/actions/student";
import { createClient } from "@/lib/supabase/server";

import {
    GraduationCap,
    Mail,
    MapPin,
    PencilLine,
    Settings,
    ShieldCheck,
    User,
    Users,
} from "lucide-react";

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
                            {studentData?.firstname?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <SecondaryLabel>
                            {studentData?.firstname} {studentData?.lastname}
                        </SecondaryLabel>

                        <p className="text-muted-foreground mt-1">
                            {studentData?.school}
                        </p>
                        {/* <p className="text-muted-foreground">
                            {studentData?.email}
                        </p> */}

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

                    <TabsContent value="profile">
                        <TitleText className="mb-2">Intro</TitleText>

                        <div className="flex flex-col gap-1 mb-5">
                            <div className="flex items-center gap-2">
                                <div>
                                    <Mail size={16} />
                                </div>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    {studentData?.email}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <GraduationCap size={18} />
                                </div>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    {studentData?.school}
                                </p>
                            </div>

                            {studentData?.city && (
                                <div className="flex items-center gap-2">
                                    <div>
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
                            {(studentData?.interests?.interest.length === 0 ||
                                !studentData?.interests) && (
                                <div className="text-muted-foreground">
                                    You did not put any interests yet.{" "}
                                    <Link
                                        className="underline"
                                        href="/student/interests"
                                    >
                                        Add now
                                    </Link>
                                </div>
                            )}

                            {studentData?.interests?.interest?.map((inter) => (
                                <div
                                    className="rounded-full bg-muted px-3 h-8 flex items-center text-sm whitespace-nowrap"
                                    key={inter}
                                >
                                    {inter}
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="credentials">
                        Change your password here.
                    </TabsContent>
                    <TabsContent value="group">
                        <div className="mb-2">
                            <TitleText>
                                {studentData?.groups?.group_name}
                            </TitleText>
                            <p className="text-muted-foreground text-sm">
                                Your group's name
                            </p>
                        </div>
                        <div className="mb-2">
                            <TitleText>
                                {ojt_instructor?.firstname}{" "}
                                {ojt_instructor?.lastname}
                            </TitleText>
                            <p className="text-muted-foreground text-sm">
                                Ojt Instructor/Group creator
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Wrapper>
    );
}
