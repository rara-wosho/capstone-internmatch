import BrowseCompanies from "@/components/sections/BrowseCompanies";
import CompanyCard from "@/components/ui/CompanyCard";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCompanies } from "@/lib/actions/company";

export default async function Page() {
    const { data, count, error } = await getCompanies();

    if (error) {
        return <ErrorUi />;
    }

    return (
        <div>
            <SecondaryLabel className="mb-4">Companies</SecondaryLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.map((company) => (
                    <CompanyCard key={company?.id} company={company} />
                ))}
            </div>
            {/* <BrowseCompanies companies={data} />  */}

            <div className="flex items-center mt-4">
                <p className="text-sm text-muted-foreground">
                    Showing 1-2 of {count} Page 1 of {totalPages}
                </p>
            </div>
        </div>
    );
}
