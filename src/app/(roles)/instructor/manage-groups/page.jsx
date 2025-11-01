import AddGroupModal from "@/components/forms/AddGroupModal";
import SearchGroup from "@/components/forms/SearchGroup";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import GroupCard from "@/components/ui/GroupCard";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import { Users } from "lucide-react";
import { Suspense } from "react";

export default async function Page({ searchParams }) {
    const supabase = await createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const search = (await searchParams)?.search_query?.trim() || "";

    let query = supabase
        .from("groups")
        .select("id, group_name, is_shareable, group_description, students(id)")
        .eq("ojt_instructor_id", session.user.id)
        .order("created_at", { ascending: false });

    // ✅ apply filter if search is provided, chain the additional condition
    if (search) {
        query = query.or(
            `group_name.ilike.%${search}%,group_description.ilike.%${search}%`
        );
    }

    const { data, error } = await query;

    if (error) {
        console.error(error.message);
        return <ErrorUi />;
    }

    return (
        <div>
            <SecondaryLabel className="mb-4 md:mb-5 space-x-2">
                <IconWrapper>
                    <Users size={17} />
                </IconWrapper>
                <p>Manage Groups</p>
            </SecondaryLabel>

            <BorderBox className="flex items-center gap-x-2 md:gap-x-3 gap-y-3 justify-between flex-wrap mb-4 bg-card border rounded-xl">
                <div className="flex items-center gap-2 md:gap-3 grow">
                    <Suspense fallback={null}>
                        <SearchGroup />
                    </Suspense>
                </div>

                <AddGroupModal />
            </BorderBox>

            <div className="mb-4 flex gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                    <p className="text-sm text-muted-foreground">
                        Indicator :{" "}
                    </p>
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <p className="text-sm text-muted-foreground">
                        Active group link
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                {data && data.length > 0 ? (
                    data.map((g) => <GroupCard key={g.id} data={g} />)
                ) : (
                    <p className="col-span-full text-center text-muted-foreground py-6">
                        No groups yet. Click 'New Group' to create one.
                    </p>
                )}
            </div>
        </div>
    );
}
