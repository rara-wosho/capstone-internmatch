import RecentExamsTable from "@/components/tables/RecentExamsTable";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        redirect("/sign-in");
    }

    const { data, error } = await supabase
        .from("exam_attempt")
        .select(
            "id, completed_at, started_at, exam_id, exam_title, score, company_id, companies(name), exams(is_deleted)"
        )
        .eq("student_id", user.id)
        .order("started_at", { ascending: false });

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    return (
        <div>
            <div className="mb-3">
                <SecondaryLabel>Recent Exams</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    View your recent exam results
                </p>
            </div>

            {data.length > 0 ? (
                <RecentExamsTable data={data} />
            ) : (
                <div>
                    <EmptyUi secondaryMessage="You haven't taken any exams yet." />
                </div>
            )}
        </div>
    );
}
