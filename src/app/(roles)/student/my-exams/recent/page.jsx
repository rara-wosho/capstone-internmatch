import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();
    const { user } = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const { data, error } = await supabase
        .from("exam_attempt")
        .select()
        .eq("student_id", user.id)
        .order("started_at", { ascending: false });

    if (error) {
        return <ErrorUi />;
    }

    return (
        <div>
            <SecondaryLabel className="mb-3">Recent Exams</SecondaryLabel>

            {data.map((d) => (
                <div key={d.id}>
                    <p>{d.exam_title}</p>
                    <p>{d.score}</p>
                </div>
            ))}
        </div>
    );
}
