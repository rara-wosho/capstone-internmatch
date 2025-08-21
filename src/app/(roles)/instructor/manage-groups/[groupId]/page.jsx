import AboutGroup from "@/components/blocks/AboutGroup";
import GroupInviteLink from "@/components/blocks/GroupInviteLink";
import GroupMembersTable from "@/components/tables/GroupMembersTable";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import PrimaryLabel from "@/components/ui/PrimaryLabel";
import SecondaryLabel from "@/components/ui/SecondaryLabel";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/manage-groups", label: "Manage groups" },
    { href: "", label: "Group details" },
];
export default async function Page({ params }) {
    const { groupId } = await params;
    return (
        <div>
            <div className="md:py-1">
                <SecondaryLabel>Sir amins group</SecondaryLabel>
                <BreadCrumbs links={links} />
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
