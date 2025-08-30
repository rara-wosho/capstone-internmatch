import AddGroupModal from "@/components/forms/AddGroupModal";
import SearchGroup from "@/components/forms/SearchGroup";
import { Button } from "@/components/ui/button";
import GroupCard from "@/components/ui/GroupCard";
import IconWrapper from "@/components/ui/IconWrapper";
import { Input } from "@/components/ui/input";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import SortData from "@/components/ui/SortData";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import {
    ArrowUpDown,
    Filter,
    Plus,
    Search,
    SortAsc,
    Users,
} from "lucide-react";
import { Suspense } from "react";

export default function Page() {
    return (
        <div>
            <SecondaryLabel className="mb-4 md:mb-5 space-x-2">
                <IconWrapper>
                    <Users size={17} />
                </IconWrapper>
                <p>Manage Groups</p>
            </SecondaryLabel>
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

                <AddGroupModal />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
            </div>
        </div>
    );
}
