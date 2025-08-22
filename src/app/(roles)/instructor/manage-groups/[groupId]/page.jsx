import AboutGroup from "@/components/blocks/AboutGroup";
import GroupInviteLink from "@/components/blocks/GroupInviteLink";
import GroupMembersTable from "@/components/tables/GroupMembersTable";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PrimaryLabel from "@/components/ui/PrimaryLabel";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Search } from "lucide-react";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/manage-groups", label: "Manage groups" },
    { href: "", label: "Group details" },
];
export default async function Page({ params }) {
    const { groupId } = await params;
    return (
        <div>
            <div className="flex items-end flex-wrap gap-y-2 gap-x-10 md:py-1">
                <div className="">
                    <SecondaryLabel>Sir amins group</SecondaryLabel>
                    <BreadCrumbs links={links} />
                </div>

                <div className="ms-auto grow lg:grow-0 flex items-center gap-2">
                    <Input type="search" placeholder="Search" />
                    <Button variant="white">
                        Search <Search />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] gap-3 mt-4">
                <div className="order-2 lg:order-1">
                    <GroupMembersTable />
                </div>

                <div className="flex flex-col gap-3 order-1 lg:order-2">
                    <AboutGroup />
                    <GroupInviteLink />
                </div>
            </div>
        </div>
    );
}
