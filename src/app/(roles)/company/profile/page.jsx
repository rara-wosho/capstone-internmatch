import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { getCompanyById } from "@/lib/actions/company";
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

    console.log("data: ", companyData);

    return (
        <div>
            <Wrapper size="sm">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b dark:border-neutral-800/90 pb-5 mb-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-20">
                            <AvatarImage src={companyData.avatar_url} />
                            <AvatarFallback>
                                {companyData.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <SecondaryLabel>{companyData.name}</SecondaryLabel>
                            <p className="text-muted-foreground">
                                {companyData.barangay}, {companyData.city},{" "}
                                {companyData.province}{" "}
                            </p>

                            {companyData.website && (
                                <Link href={companyData.website}>
                                    {companyData.website}
                                </Link>
                            )}
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

                <div className="space-y-3">
                    <TitleText>About company</TitleText>
                    <p className="text-muted-foreground">
                        {companyData.details}
                    </p>
                </div>
            </Wrapper>
        </div>
    );
}
