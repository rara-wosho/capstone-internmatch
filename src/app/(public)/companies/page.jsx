import BrowseCompanies from "@/components/sections/BrowseCompanies";
import Wrapper from "@/components/Wrapper";

export default function Page() {
    const companies = [];
    return (
        <div className="min-h-screen pt-[4.5rem] pb-12 px-3 flex flex-col">
            <Wrapper>
                <BrowseCompanies companies={companies} />
            </Wrapper>
        </div>
    );
}
