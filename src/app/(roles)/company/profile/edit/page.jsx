import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { getCompanyById } from "@/lib/actions/company";
import { redirect } from "next/navigation";
import ErrorUi from "@/components/ui/ErrorUi";
import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import IconWrapper from "@/components/ui/IconWrapper";
import { ChevronLeft, PenLine } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import UpdateCompanyDetailsForm from "@/components/forms/UpdateCompanyDetailsForm";
import UploadAvatar from "@/components/UploadAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";

export const metadata = {
    title: "Edit Company Details",
};

export default async function EditCompanyPage() {
    const { user } = await getCurrentUser();

    // If no user → redirect to sign in
    if (!user || !user?.id) {
        redirect("/sign-in");
    }

    // Get company data
    const { data: company, error } = await getCompanyById(user.id);

    if (error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    if (!company) {
        return <ErrorUi secondaryMessage="Company data not found." />;
    }

    return (
        <>
            <Wrapper size="sm">
                <BackButton className="inline-flex items-center mb-3 text-muted-foreground text-sm">
                    <ChevronLeft size={16} /> <span>Back</span>
                </BackButton>
                <div className="mb-3 flex items-center gap-2 sm:gap-3">
                    <IconWrapper>
                        <PenLine size={18} />
                    </IconWrapper>
                    <SecondaryLabel>Edit Company Details</SecondaryLabel>
                </div>
                <BorderBox className="mb-3 bg-card rounded-xl border">
                    <div className="mx-auto max-w-[300px]">
                        <Avatar className="w-24 mx-auto aspect-square mb-3">
                            <AvatarImage src={company.avatar_url} />
                            <AvatarFallback>
                                {company.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <UploadAvatar currentAvatarUrl={company.avatar_url} />
                    </div>
                </BorderBox>

                <Tabs defaultValue="account" className="w-full">
                    <div className="border rounded-xl bg-card">
                        <div className="border-b">
                            <TabsList className="h-[50px] px-3 md:px-5 space-x-3">
                                <TabsTrigger value="account">
                                    Account Info
                                </TabsTrigger>
                                <TabsTrigger value="password">
                                    Change Password
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <BorderBox>
                            <TabsContent value="account">
                                <UpdateCompanyDetailsForm
                                    defaultFormData={{
                                        ...company,
                                        id: user.id,
                                    }}
                                />
                            </TabsContent>
                            <TabsContent value="password">
                                <ChangePasswordForm email={user.email} />
                            </TabsContent>
                        </BorderBox>
                    </div>
                </Tabs>
            </Wrapper>
        </>
    );
}
