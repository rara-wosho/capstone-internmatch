import ErrorUi from "@/components/ui/ErrorUi";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function StudentApplicationsPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        notFound();
    }

    const supabase = await createClient();

    const { data: applications, error: applicationError } = await supabase
        .from("students")
        .select(
            `
    id, firstname, lastname, 
    group_id,
    groups!inner(ojt_instructor_id),
    applicants!inner(
      id,
      student_id,
      applied_at,
      status
    )
  `
        )
        .eq("groups.ojt_instructor_id", user.id);

    if (applicationError) {
        return <ErrorUi secondaryMessage={applicationError.message} />;
    }

    console.log(applications);

    return <div></div>;
}
