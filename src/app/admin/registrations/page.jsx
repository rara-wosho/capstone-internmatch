import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import RegistrantsTable from "@/components/tables/RegistrantsTable";

export default async function AdminRegistrationPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("registrations")
        .select(
            "firstname, lastname, registered_at, documents_link, school, email, barangay, city, province, status, id"
        )
        .order("registered_at", { ascending: false });

    if (error) {
        return (
            <ErrorUi secondaryMessage="We're not able to fetch registrations data. Please check your internet connection and try again." />
        );
    }
    return (
        <div>
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center px-3">
                    Registrations{" "}
                    <div className="bg-card size-7 flex items-center justify-center border ms-2 rounded-sm text-base">
                        {data?.length}
                    </div>
                </Wrapper>
            </SecondaryLabel>
            <Wrapper className="px-3">
                {data.length > 0 ? (
                    <RegistrantsTable registrants={data} />
                ) : (
                    <div>
                        <EmptyUi secondaryMessage="There are no pending registrations yet." />
                    </div>
                )}
            </Wrapper>
        </div>
    );
}
