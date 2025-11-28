import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SearchField from "@/components/forms/SearchStudent";
import BorderBox from "@/components/ui/BorderBox";
import InstructorApplicationsSection from "@/components/sections/InstructorApplicationsSection";

export default async function StudentApplicationsPage({ searchParams }) {
    const search = (await searchParams)?.search_query?.trim() || "";
    const sort = (await searchParams)?.sort || "desc"; // default: newest first

    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        notFound();
    }

    const supabase = await createClient();

    let baseQuery = supabase
        .from("students")
        .select(
            `
            id,
            firstname,
            lastname,
            avatar_url,
            group_id,
            groups!inner(ojt_instructor_id, group_name),
            applicants!inner(
              id,
              student_id,
              applied_at,
              status,
              companies(name, id)
            )
        `
        )
        .eq("groups.ojt_instructor_id", user.id)
        .eq("is_active", true)
        .order("applied_at", {
            ascending: sort === "asc",
            referencedTable: "applicants",
        });

    //  Apply search filter
    if (search) {
        baseQuery = baseQuery.or(
            `firstname.ilike.%${search}%,lastname.ilike.%${search}`
        );
    }

    const { data: applications, error: applicationError } = await baseQuery;

    if (applicationError) {
        return <ErrorUi secondaryMessage={applicationError.message} />;
    }

    return (
        <div>
            <div className="mb-4 md:mb-5">
                <SecondaryLabel>Student Applications Overview</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    Track your student application updates with ease. Note: Only
                    active students will be shown here.
                </p>
            </div>

            <BorderBox className="border rounded-xl bg-card shadow-xs mb-4">
                <Suspense fallback={<p>Loading...</p>}>
                    <SearchField
                        className="grow"
                        actionPath="/instructor/student-applications"
                        placeholder="Search student"
                    />
                </Suspense>
            </BorderBox>

            {applications?.length > 0 ? (
                <InstructorApplicationsSection applications={applications} />
            ) : (
                <div className="flex justify-center py-3 text-muted-foreground">
                    {search
                        ? `No result found for "${search}"`
                        : "No data available yet."}
                </div>
            )}
        </div>
    );
}
