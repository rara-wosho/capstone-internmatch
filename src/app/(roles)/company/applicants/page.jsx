import SearchField from "@/components/forms/SearchStudent";
import ApplicantsSettingsModal from "@/components/modals/ApplicantsSettingsModal";
import ApplicantsSection from "@/components/sections/ApplicantsSection";
import BorderBox from "@/components/ui/BorderBox";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { FileUser } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ApplicantsPage({ searchParams }) {
    const search = (await searchParams)?.search_query || "";

    const { user, error: userError } = await getCurrentUser();

    if (userError) {
        return <ErrorUi secondaryMessage="Error verifying user." />;
    }

    if (!user) {
        redirect("/sign-in");
    }

    const supabase = await createClient();

    // Build the query
    let baseQuery = supabase
        .from("applicants")
        .select(
            "id, applied_at, reviewed_at, student_id, resume_link, status, introduction, students!inner(firstname, lastname, avatar_url, id, email, school)"
        )
        .eq("company_id", user?.id)
        .neq("status", "cancelled");

    // Apply search filter if search query exists
    if (search && search.trim() !== "") {
        const searchTerm = `%${search}%`;
        baseQuery = baseQuery.or(
            `firstname.ilike.${searchTerm},lastname.ilike.${searchTerm},email.ilike.${searchTerm}`,
            { foreignTable: "students" }
        );
    }

    const { data: applicantsData, error } = await baseQuery.order(
        "applied_at",
        { ascending: false }
    );

    if (error) {
        return <ErrorUi secondaryMessage="Unable to fetch applicants data" />;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 mt-2 md:mt-0 flex-wrap gap-x-10 gap-y-2">
                <SecondaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileUser size={16} />
                    </IconWrapper>
                    <span>Applicants</span>
                </SecondaryLabel>

                <div className="ms-auto">
                    <ApplicantsSettingsModal />
                </div>
            </div>

            <BorderBox className="rounded-xl border bg-card shadow-xs mb-5">
                <Suspense fallback={<div>Loading search...</div>}>
                    <SearchField
                        actionPath="/company/applicants"
                        placeholder="Search applicant by firstname, lastname, or email"
                    />
                </Suspense>
            </BorderBox>

            {/* Body */}
            {applicantsData.length === 0 ? (
                <div>
                    <EmptyUi
                        message={
                            search
                                ? "No applicants found."
                                : "No applicants yet."
                        }
                        secondaryMessage={
                            search
                                ? `No results found for '${search}'. Try another.`
                                : "Once students start applying, their information will appear here."
                        }
                    />
                </div>
            ) : (
                <ApplicantsSection applicants={applicantsData} />
            )}
        </div>
    );
}
