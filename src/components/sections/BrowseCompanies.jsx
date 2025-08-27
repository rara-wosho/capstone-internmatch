import { Building, Building2, LayoutGrid, List, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SecondaryLabel from "../ui/SecondaryLabel";
import TertiaryLabel from "../ui/TertiaryLabel";
import Wrapper from "../Wrapper";
import CompanyCard from "../ui/CompanyCard";
import IconWrapper from "../ui/IconWrapper";

export default function BrowseCompanies({ companies }) {
    return (
        <>
            <div className="flex flex-col mb-2 md:mb-5">
                <div className="flex items-center flex-wrap justify-between mb-4 gap-3">
                    <SecondaryLabel>
                        <IconWrapper className="me-2">
                            <Building2 size={17} />
                        </IconWrapper>
                        Explore companies now
                    </SecondaryLabel>
                    <div className="flex items-center gap-2.5 grow justify-end">
                        {/* <div className="flex items-center gap-2 w-full max-w-lg">
                            <Input
                                icon={<Search size={16} />}
                                placeholder="Search company"
                            />
                            <Button className="h-10" variant="white">
                                Search
                            </Button>
                        </div> */}

                        <div className="flex items-center gap-3 grow">
                            <div className="flex items-center h-9 rounded-sm border bg-secondary grow sm:grow-0">
                                <button className="px-3 flex text-sm items-center gap-2 border-e border-neutral-500">
                                    <LayoutGrid size={15} /> Cards
                                </button>
                                <button className="px-3 flex text-sm items-center gap-2">
                                    <List size={16} /> List
                                </button>
                            </div>
                            <Button variant="secondary">
                                <Search />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-10">
                <TertiaryLabel className="mb-2">
                    Recommended for you
                </TertiaryLabel>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                </div>
            </div>
            <TertiaryLabel className="mb-2">More to explore</TertiaryLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
            </div>
        </>
    );
}
