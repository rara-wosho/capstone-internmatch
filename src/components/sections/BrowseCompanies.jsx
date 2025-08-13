import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PrimaryLabel from "../ui/PrimaryLabel";
import SecondaryLabel from "../ui/SecondaryLabel";
import TertiaryLabel from "../ui/TertiaryLabel";
import Wrapper from "../Wrapper";
import CompanyCard from "../ui/CompanyCard";

export default function BrowseCompanies({ companies }) {
    return (
        <div>
            <Wrapper>
                <div className="flex flex-col py-[2rem]">
                    <SecondaryLabel className="mb-4">
                        EXPLORE THE BEST COMPANIES NOW
                    </SecondaryLabel>
                    <div className="flex items-center gap-2 max-w-lg">
                        <Input
                            icon={<Search size={16} />}
                            placeholder="Search company"
                        />{" "}
                        <Button variant="white">Search</Button>
                    </div>
                </div>

                <div className="mb-10">
                    <TertiaryLabel className="mb-2">
                        Recommended for you
                    </TertiaryLabel>

                    <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <CompanyCard />
                        <CompanyCard />
                        <CompanyCard />
                        <CompanyCard />
                    </div>
                </div>
                <TertiaryLabel className="mb-2">More for you</TertiaryLabel>

                <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                </div>
            </Wrapper>
        </div>
    );
}
