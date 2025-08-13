import BrowseCompanies from "@/components/sections/BrowseCompanies";

export default function Page() {
    const companies = [];
    return (
        <div className="min-h-screen pt-[4.5rem]">
            <BrowseCompanies companies={companies} />
        </div>
    );
}
