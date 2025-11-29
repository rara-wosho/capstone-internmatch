import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { FileUser } from "lucide-react";
import { notFound } from "next/navigation";

import ApplicationsSection from "@/components/sections/ApplicationsSection";

// Set page  title
export const metadata = {
    title: "Applications",
};

export default async function ApplicationsPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        notFound();
    }

    const supabase = await createClient();
    const { data: applicationsData, error: applicationErr } = await supabase
        .from("applicants")
        .select(
            "id, applied_at, status, cover_letter_url, reviewed_at, resume_link, portfolio_link, introduction , companies(name,id)"
        )
        .eq("student_id", user?.id)
        .order("applied_at", { ascending: false });

    if (applicationErr) {
        return <ErrorUi secondaryMessage={applicationErr.message} />;
    }

    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <FileUser size={17} />
                </IconWrapper>
                Applications
            </SecondaryLabel>

            {applicationsData.length === 0 ? (
                <EmptyUi
                    message="No Applications"
                    secondaryMessage="You don't have any submitted applications yet."
                />
            ) : (
                <ApplicationsSection applications={applicationsData} />
            )}
        </div>
    );
}
