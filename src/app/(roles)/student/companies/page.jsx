import CompanyCard from "@/components/ui/CompanyCard";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCompanies } from "@/lib/actions/company";
import { Building2 } from "lucide-react";

export default async function Page() {
    const { data, error } = await getCompanies();

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

            {/* Companies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.map((company) => (
                    <CompanyCard key={company?.id} company={company} />
                ))}
            </div>
        </div>
    );
}
