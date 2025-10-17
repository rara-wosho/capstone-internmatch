import SelectCompanyOffersSection from "@/components/sections/SelectCompanyOffersSection";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CompanyOffersPage({ searchParams }) {
    // true if there is value
    const isFromSignUp = (await searchParams)?.from || "";

    const { user } = await getCurrentUser();

    // no user, redirect to sign in page
    if (!user || !user?.id) {
        redirect("/sign-in");
    }

    const supabase = await createClient();

    const { data: offers, error: offersErr } = await supabase
        .from("company_offers")
        .select("offers")
        .eq("company_id", user.id)
        .maybeSingle();

    if (offersErr) {
        return <ErrorUi secondaryMessage={offersErr.message} />;
    }

    return (
        <div>
            {/* Header */}
            <Wrapper size="sm">
                <div className="flex flex-col mb-4 md:mb-5 gap-3">
                    <SecondaryLabel className="gap-2">
                        Company’s Internship Offers
                    </SecondaryLabel>

                    <p className="text-sm text-muted-foreground">
                        Define what kind of internship opportunities your
                        company provides. These details help students find the
                        most suitable placement and understand what skills your
                        company values.
                    </p>

                    {/* <div className="ms-auto">
                        <Button>Save </Button>
                    </div> */}
                </div>

                <SelectCompanyOffersSection
                    initialOffers={offers?.offers || []}
                    isFromSignUp={isFromSignUp !== ""}
                    companyId={user.id}
                />
            </Wrapper>
        </div>
    );
}
