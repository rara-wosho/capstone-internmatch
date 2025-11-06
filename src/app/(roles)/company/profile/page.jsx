import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { getCompanyById } from "@/lib/actions/company";
import { Globe, Mail, MapPin, PenLine, Phone } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
    // Get the current user
    const { user: currentUser, error: authError } = await getCurrentUser();

    // --- Auth checks ---
    if (authError) return <ErrorUi message="Unable to verify user." />;

    if (!currentUser || !currentUser?.id) {
        redirect("/sign-in");
    }

    // Get the company's data
    const { data: companyData, error: companyError } = await getCompanyById(
        currentUser.id
    );

    // --- Company checks ---
    if (companyError)
        return <ErrorUi message="Failed to fetch company data." />;

    if (!companyData) notFound();

    return (
        <div>
            <Wrapper size="sm">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b dark:border-neutral-800/90 pb-5 mb-4">
                    <div className="flex items-center gap-3">
                        <Link
                            target={
                                companyData?.avatar_url ? "_blank" : "_self"
                            }
                            href={
                                companyData?.avatar_url
                                    ? companyData.avatar_url
                                    : "#"
                            }
                        >
                            <Avatar className="size-20">
                                <AvatarImage
                                    src={
                                        companyData.avatar_url ||
                                        "/images/default-avatar.jpg"
                                    }
                                />
                                <AvatarFallback>
                                    {companyData.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <div>
                            <SecondaryLabel>{companyData.name}</SecondaryLabel>
                            <p className="text-muted-foreground">
                                {companyData.barangay}, {companyData.city},{" "}
                                {companyData.province}{" "}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse sm:flex-row items-center gap-2">
                        <Button asChild variant="outline">
                            <Link href="/company/offers">Update Offers</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/company/profile/edit">
                                Edit Profile
                            </Link>
                        </Button>
                    </div>
                </div>
                {/* ABOUT COMPANY SECTION  */}
                <div className="space-y-2 mb-4">
                    <TitleText>About company</TitleText>
                    <p className="text-muted-foreground">
                        {companyData.details}
                    </p>
                </div>
                <TitleText className="mb-2">Get in touch</TitleText>
                {/* PHONE NUMBER  */}
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <div className="size-5 shrink-0 flex items-center">
                        <Phone size={16} />
                    </div>
                    <p>{companyData.phone}</p>
                </div>
                {/* EMAIL ADDRESS  */}
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <div className="size-5 shrink-0 flex items-center">
                        <Mail size={16} />
                    </div>
                    <p>{companyData.email}</p>
                </div>
                {/* WEBSITE, IF THERE IS  */}
                {companyData?.website && (
                    <Link
                        target="_blank"
                        href={companyData.website}
                        className="flex items-center gap-1 text-muted-foreground mb-1 hover:underline underline-offset-2"
                    >
                        <div className="size-5 shrink-0 flex items-center">
                            <Globe size={16} />
                        </div>
                        <p>{companyData.website}</p>
                    </Link>
                )}
                <div className="space-y-2 mb-4 mt-4">
                    <div className="flex items-center gap-2">
                        <TitleText>Company Offers</TitleText>
                        <Link
                            href="/company/offers"
                            className="text-muted-foreground hover:text-accent-foreground transition-colors"
                        >
                            <PenLine size={16} />
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-3">
                        {companyData.offers.map((o, index) => (
                            <div
                                key={index}
                                className="bg-secondary rounded-full px-3 h-9 flex items-center whitespace-nowrap text-sm text-muted-foreground"
                            >
                                {o}
                            </div>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
