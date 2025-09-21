import RecentExamsTable from "@/components/tables/RecentExamsTable";
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
            "id, completed_at,started_at, status,exam_id, exam_title, score"
        )
        .eq("student_id", user.id)
        .order("started_at", { ascending: false });

    if (error) {
        return <ErrorUi />;
    }

    console.log(data);

    return (
        <div>
            <SecondaryLabel className="mb-3">Recent Exams</SecondaryLabel>

            {data.length > 0 ? (
                <RecentExamsTable data={data} />
            ) : (
                <div>
                    <p>No results found</p>
                </div>
            )}
        </div>
    );
}
