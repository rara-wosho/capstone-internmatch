import CompanyCard from "@/components/ui/CompanyCard";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";

export default async function InstructorCompaniesPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("companies")
        .select("id, name, barangay, city, province")
        .order("created_at", { ascending: false });

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }
    return (
        <div>
            <SecondaryLabel className="mb-4 md:mb-5">Companies</SecondaryLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>
        </div>
    );
}
