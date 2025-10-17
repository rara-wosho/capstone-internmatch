import ProfileTabSection from "@/components/sections/ProfileTabSection";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { getCompanyById } from "@/lib/actions/company";
import { Mail, MapPin, User } from "lucide-react";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }) {
    const { userId } = await params;

    // Run auth + company query in parallel (no dependency between them)
    const [
        { user: currentUser, error: authError },
        { data: companyData, error: companyError },
    ] = await Promise.all([getCurrentUser(), getCompanyById(userId)]);

    // --- Auth checks ---
    if (authError) return <ErrorUi message="Unable to verify user." />;

    if (!currentUser?.id) redirect("/sign-in");

    const isOwner = currentUser.id === userId;

    // --- Company checks ---
    if (companyError)
        return <ErrorUi message="Failed to fetch company data." />;

    if (!companyData) notFound();

    return (
        <div>
            <SecondaryLabel className="mb-4 md:mb-5 gap-2.5">
                <IconWrapper>
                    <User size={20} />
                </IconWrapper>
                Edit Profile
            </SecondaryLabel>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-3 md:gap-4">
                <div className="rounded-t-xl border bg-card shadow-xs">
                    <BorderBox>
                        <div className="w-full aspect-video border rounded-md mb-4"></div>
                        <TertiaryLabel>{companyData.name}</TertiaryLabel>

                        <p className="text-muted-foreground mt-2 text-sm flex items-center gap-2">
                            <Mail size={15} />
                            {companyData?.email}
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm flex items-center gap-2">
                            <MapPin size={15} />
                            {companyData?.barangay}, {companyData?.city},{" "}
                            {companyData?.province}
                        </p>
                    </BorderBox>
                </div>
                <div className="border rounded-xl bg-card shadow-xs">
                    <ProfileTabSection companyData={companyData} />
                </div>
            </div>

            {isOwner ? "owner" : "not owner"}
            <p>{companyData.name}</p>
        </div>
    );
}
