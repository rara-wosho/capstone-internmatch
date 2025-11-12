import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Building2, User } from "lucide-react";
import ErrorUi from "@/components/ui/ErrorUi";
import { getCurrentUser } from "@/lib/actions/auth";
import { dateFormatter } from "@/utils/date-formatter";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadAvatar from "@/components/UploadAvatar";
import InstructorEditProfileForm from "@/components/forms/InstructorEditProfileForm";

export default async function InstructorProfilePage() {
    const supabase = await createClient();

    // ✅ Get the current instructor (from session)
    const { user } = await getCurrentUser();

    if (!user) {
        notFound();
    }

    // ✅ Fetch instructor profile
    const { data: instructor, error } = await supabase
        .from("ojt_instructors")
        .select(
            "firstname, lastname, middlename, email, avatar_url, school, barangay, city, province, created_at, gender, age"
        )
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        return (
            <ErrorUi
                secondaryMessage={
                    error.message || "Failed to load instructor profile."
                }
            />
        );
    }

    if (!instructor) {
        return <ErrorUi message="Instructor profile not found." />;
    }

    return (
        <div>
            <Wrapper size="sm" className="space-y-2 md:space-y-3">
                <SecondaryLabel>Edit Profile</SecondaryLabel>

                {/* HEADER  */}
                <BorderBox className="flex flex-wrap items-center justify-between gap-3 border bg-card rounded-xl">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-[100px] aspect-square">
                            <AvatarImage
                                src={
                                    instructor.avatar_url ||
                                    "/images/default-avatar.jpg"
                                }
                            />
                            <AvatarFallback>
                                {instructor.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <SecondaryLabel>
                                {instructor.firstname} {instructor.lastname}
                            </SecondaryLabel>
                            <p className="text-sm text-muted-foreground">
                                {instructor.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <UploadAvatar
                                buttonVariant="outline"
                                currentAvatarUrl={instructor.avatar_url}
                            />
                        </div>
                    </div>
                </BorderBox>

                {/* Wrapper div */}
                <div className="bg-card border rounded-xl">
                    {/* BODY  */}
                    <Tabs defaultValue="account">
                        <div className="border-b px-3 md:px-5">
                            <TabsList className="h-[50px] space-x-3">
                                <TabsTrigger value="account">
                                    Account Info
                                </TabsTrigger>
                                <TabsTrigger value="change-password">
                                    Change Password
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="account">
                            <InstructorEditProfileForm
                                userId={user.id}
                                instructorData={instructor}
                            />
                        </TabsContent>
                        <TabsContent value="change-password"></TabsContent>
                    </Tabs>
                </div>
            </Wrapper>
        </div>
    );
}
