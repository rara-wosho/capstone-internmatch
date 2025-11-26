import SearchField from "@/components/forms/SearchStudent";
import CompanyCard from "@/components/ui/CompanyCard";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCompanies } from "@/lib/actions/company";
import { Building2 } from "lucide-react";
import { Suspense } from "react";

export default async function Page({ searchParams }) {
    const search = (await searchParams)?.search_query || "";

    const { data, error } = await getCompanies(search);

    if (error) {
        return (
            <ErrorUi secondaryMessage="Please check your internet connection and try again." />
        );
    }

    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <Building2 size={17} />
                </IconWrapper>{" "}
                Companies
            </SecondaryLabel>

            <div className="mb-3">
                <Suspense fallback={null}>
                    <SearchField
                        actionPath="/student/companies"
                        placeholder="Search by company name, address, and details"
                    />
                </Suspense>
            </div>

            {data?.length === 0 ? (
                <EmptyUi
                    message={
                        search
                            ? `No result for "${search}"`
                            : "No Companies Yet."
                    }
                    secondaryMessage={
                        search
                            ? `Please try searching for another.`
                            : "Check back soon when companies are here."
                    }
                />
            ) : (
                // Companies grid
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {data.map((company) => (
                        <CompanyCard key={company?.id} company={company} />
                    ))}
                </div>
            )}
        </div>
    );
}
