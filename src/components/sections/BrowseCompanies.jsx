import { LayoutGrid, List, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SecondaryLabel from "../ui/SecondaryLabel";
import TertiaryLabel from "../ui/TertiaryLabel";
import Wrapper from "../Wrapper";
import CompanyCard from "../ui/CompanyCard";

export default function BrowseCompanies({ companies }) {
    return (
        <Wrapper>
            <div className="flex flex-col mb-8 md:mt-4">
                <SecondaryLabel className="mb-4">
                    EXPLORE THE BEST COMPANIES NOW
                </SecondaryLabel>
                <div className="flex items-center gap-2.5 overflow-x-auto">
                    <div className="flex items-center gap-2 shrink-0 w-full max-w-lg">
                        <Input
                            icon={<Search size={16} />}
                            placeholder="Search company"
                        />{" "}
                        <Button className="h-10" variant="white">
                            Search
                        </Button>
                    </div>

                    <div className="shrink-0 ms-auto">
                        <div className="h-10 border border-input bg-white dark:bg-transparent rounded flex items-center px-1 text-muted-foreground">
                            <button className="px-2 rounded-xs py-1">
                                <LayoutGrid />
                            </button>
                            <button className="bg-muted px-2 rounded-xs py-1">
                                <List />
                            </button>
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
        </Wrapper>
    );
}
