import AboutGroup from "@/components/blocks/AboutGroup";
import GroupInviteLink from "@/components/blocks/GroupInviteLink";
import GroupMembersTable from "@/components/tables/GroupMembersTable";
import BorderBox from "@/components/ui/BorderBox";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import { Search } from "lucide-react";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/manage-groups", label: "Manage groups" },
    { href: "", label: "Group details" },
];
export default async function Page({ params }) {
    await new Promise((res) => setTimeout(res, 5000));

    const { groupId } = await params;
    const db = await createClient();
    const { data } = await db
        .from("groups")
        .select()
        .eq("id", groupId)
        .single();
    return (
        <div>
            <div className="mb-3 md:mb-5">
                <SecondaryLabel>
                    {data?.group_name ?? "Unknown group"}
                </SecondaryLabel>
                <BreadCrumbs links={links} />
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <AboutGroup data={data} />
                    <GroupInviteLink />
                </div>

                <BorderBox className="border bg-card rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Input
                            type="search"
                            placeholder="Search student"
                            icon={<Search size={16} />}
                        />
                        <Button variant="white">
                            <span className="hidden md:inline-block">
                                Search
                            </span>{" "}
                            <Search />
                        </Button>
                    </div>
                    <GroupMembersTable />
                </BorderBox>
            </div>
        </div>
    );
}
