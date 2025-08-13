import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PrimaryLabel from "../ui/PrimaryLabel";
import SecondaryLabel from "../ui/SecondaryLabel";
import TertiaryLabel from "../ui/TertiaryLabel";
import Wrapper from "../Wrapper";

export default function BrowseCompanies({ companies }) {
    return (
        <div>
            <Wrapper>
                <div className="flex flex-col py-[2rem]">
                    <SecondaryLabel className="mb-4">
                        EXPLORE THE BEST COMPANIES NOW
                    </SecondaryLabel>
                    <div className="flex items-center gap-2 max-w-lg">
                        <Input placeholder="Search company" />{" "}
                        <Button>Search</Button>
                    </div>
                </div>

                <div className="mb-10">
                    <TertiaryLabel className="mb-2">
                        Recommended for you
                    </TertiaryLabel>

                    <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <div className="card p-8 bg-card border rounded-md"></div>
                        <div className="card p-8 bg-card border rounded-md"></div>
                        <div className="card p-8 bg-card border rounded-md"></div>
                        <div className="card p-8 bg-card border rounded-md"></div>
                    </div>
                </div>
                <TertiaryLabel className="mb-2">More for you</TertiaryLabel>

                <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <div className="card p-8 bg-card border rounded-md"></div>
                    <div className="card p-8 bg-card border rounded-md"></div>
                    <div className="card p-8 bg-card border rounded-md"></div>
                    <div className="card p-8 bg-card border rounded-md"></div>
                </div>
            </Wrapper>
        </div>
    );
}
