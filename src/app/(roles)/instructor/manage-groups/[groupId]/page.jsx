import AboutGroup from "@/components/blocks/AboutGroup";
import GroupInviteLink from "@/components/blocks/GroupInviteLink";
import SearchField from "@/components/forms/SearchStudent";
import GroupMembersTable from "@/components/tables/GroupMembersTable";
import BackButton from "@/components/ui/BackButton";
import BorderBox from "@/components/ui/BorderBox";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft, UserRoundX } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/manage-groups", label: "Manage groups" },
    { href: "", label: "Group details" },
];
export default async function Page({ params, searchParams }) {
    const { groupId } = await params;

    // get current signed in intructor
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        notFound();
    }

    const db = await createClient();

    const { data, error } = await db
        .from("groups")
        .select()
        .eq("id", groupId)
        .eq("ojt_instructor_id", user.id)
        .maybeSingle();

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    if (!data) {
        notFound();
    }

    // ✅ pull search from query params
    const search = (await searchParams)?.search_query || "";

    let memberQuery = db.from("students").select().eq("group_id", groupId);

    // ✅ apply filter if search is provided, chain the additional condition
    if (search) {
        memberQuery = memberQuery.or(
            `firstname.ilike.%${search}%, lastname.ilike.%${search}%, middlename.ilike.%${search}%, email.ilike.%${search}%, city.ilike.%${search}%`
        );
    }

    // additional chain, sort by lastname
    memberQuery = memberQuery.order("created_at", { ascending: false });

    const { data: members, error: memberError } = await memberQuery;

    if (memberError) {
        return (
            <ErrorUi message="Something went wrong while fetching member data." />
        );
    }

    return (
        <div className="mb-20">
            <div className="mb-3 md:mb-5">
                <BackButton className="flex items-center gap-1">
                    <ChevronLeft />
                    <SecondaryLabel className="text-left">
                        {data?.group_name ?? "Unknown group"}
                    </SecondaryLabel>
                </BackButton>
                <BreadCrumbs links={links} />
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <AboutGroup data={data} memberCount={members?.length} />
                    <GroupInviteLink
                        groupId={groupId}
                        is_shareable={data?.is_shareable}
                    />
                </div>
                <BorderBox className="border bg-card rounded-xl">
                    {/* there are members and user is searching  */}
                    {(members.length > 0 || search) && (
                        <Suspense fallback={null}>
                            <SearchField
                                className="mb-3"
                                actionPath={`/instructor/manage-groups/${groupId}`}
                                placeholder="Search student"
                            />
                        </Suspense>
                    )}

                    {members.length > 0 && (
                        <GroupMembersTable search={search} members={members} />
                    )}

                    {/* user is searching, empty result  */}
                    {members.length === 0 && search && (
                        <div className="py-8 flex flex-col items-center justify-center">
                            <p className="text-center text-muted-foreground px-8">
                                No result found for '{search}'
                            </p>
                        </div>
                    )}

                    {/* user is not searching and there is no member  */}
                    {members.length === 0 && !search && (
                        <div className="py-14 flex flex-col items-center justify-center">
                            <UserRoundX size={32} />
                            <p className="mt-4 mb-2 font-medium text-center text-xl px-5">
                                There are no members in this group yet
                            </p>
                            <p className="text-center text-muted-foreground px-8">
                                Try sharing the invitation link to let your
                                students join this group
                            </p>
                        </div>
                    )}
                </BorderBox>
            </div>
        </div>
    );
}
