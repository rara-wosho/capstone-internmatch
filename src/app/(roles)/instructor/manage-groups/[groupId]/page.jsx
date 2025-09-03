import AboutGroup from "@/components/blocks/AboutGroup";
import GroupInviteLink from "@/components/blocks/GroupInviteLink";
import GroupMembersTable from "@/components/tables/GroupMembersTable";
import BorderBox from "@/components/ui/BorderBox";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { createClient } from "@/lib/supabase/server";
import {
    BookOpen,
    Calendar,
    CircleAlert,
    Link,
    Pencil,
    Search,
    UserRoundX,
    Users2,
} from "lucide-react";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/manage-groups", label: "Manage groups" },
    { href: "", label: "Group details" },
];
export default async function Page({ params }) {
    // await new Promise((res) => setTimeout(res, 10000));
    const { groupId } = await params;

    const db = await createClient();
    const { data, error } = await db
        .from("groups")
        .select()
        .eq("id", groupId)
        .single();

    if (error) {
        return (
            <div className="flex items-center gap-4">
                <div className="rounded-sm p-2 border border-destructive text-destructive bg-red-500/10">
                    <CircleAlert />
                </div>
                <div>
                    <TertiaryLabel>Opps..</TertiaryLabel>
                    <p className="text-muted-foreground">
                        Something went wrong while we fetch the data.
                    </p>
                </div>
            </div>
        );
    }

    const { data: members, error: memberError } = await db
        .from("students")
        .select()
        .eq("group_id", groupId);

    if (memberError) {
        return (
            <div className="flex items-center gap-4">
                <div className="rounded-sm p-2 border border-destructive text-destructive bg-red-500/10">
                    <CircleAlert />
                </div>
                <div>
                    <TertiaryLabel>Opps..</TertiaryLabel>
                    <p className="text-muted-foreground">
                        Something went wrong while we fetch members data.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-20">
            <div className="mb-3 md:mb-5">
                <SecondaryLabel>
                    {data?.group_name ?? "Unknown group"}
                </SecondaryLabel>
                <BreadCrumbs links={links} />
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <AboutGroup data={data} />
                    <GroupInviteLink
                        groupId={groupId}
                        is_shareable={data?.is_shareable}
                    />
                </div>
                {members.length > 0 && (
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
                        <GroupMembersTable members={members} />
                    </BorderBox>
                )}

                {members.length === 0 && (
                    <div className="py-14 flex flex-col items-center justify-center">
                        <UserRoundX size={32} />
                        <p className="mt-4 mb-2 font-medium text-center text-xl px-5">
                            There are no members in this group yet
                        </p>
                        <p className="text-center text-muted-foreground px-8">
                            Try sharing the invitation link to let your students
                            join this group
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
