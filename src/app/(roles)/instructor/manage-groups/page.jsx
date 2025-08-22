import SearchGroup from "@/components/forms/SearchGroup";
import { Button } from "@/components/ui/button";
import GroupCard from "@/components/ui/GroupCard";
import { Input } from "@/components/ui/input";
import SortData from "@/components/ui/SortData";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { ArrowUpDown, Filter, Plus, Search, SortAsc } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
    return (
        <div>
            <div className="flex items-center gap-x-2 md:gap-x-3 gap-y-3 justify-between flex-wrap mb-5">
                <div className="flex items-center gap-2 md:gap-3 grow">
                    <Suspense fallback={null}>
                        <SearchGroup />
                    </Suspense>
                    <SortData>
                        <Button
                            variant="secondary"
                            className="bg-white dark:bg-secondary border border-input"
                            asChild
                            size="lg"
                        >
                            <span>
                                <ArrowUpDown />
                            </span>
                        </Button>
                    </SortData>
                </div>

                <Button className="grow md:grow-0">
                    New Group <Plus />
                </Button>
            </div>

            <TertiaryLabel className="mb-3">Group List</TertiaryLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
            </div>
        </div>
    );
}
