import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { FileUser } from "lucide-react";
import { notFound } from "next/navigation";
import EmptyUi from "@/components/ui/EmptyUi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import SearchField from "@/components/forms/SearchStudent";
import BorderBox from "@/components/ui/BorderBox";
import SortDate from "@/components/SortDate";
import InstructorApplicationsSection from "@/components/sections/InstructorApplicationsSection";

export default async function StudentApplicationsPage({ searchParams }) {
    const search = searchParams?.search_query?.trim() || "";
    const sort = searchParams?.sort || "desc"; // default: newest first

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
            groups!inner(ojt_instructor_id),
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
            <SecondaryLabel className="mb-4 md:mb-5 space-x-2">
                <IconWrapper>
                    <FileUser size={17} />
                </IconWrapper>
                <p>Student Applications</p>
            </SecondaryLabel>

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
                <EmptyUi
                    secondaryMessage={
                        search
                            ? `We found no result matching '${search}'`
                            : "No student submits an application yet."
                    }
                />
            )}
        </div>
    );
}
