import ApplicationSectionCard from "@/components/ui/ApplicationSectionCard";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { FileUser } from "lucide-react";
import { notFound } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BorderBox from "@/components/ui/BorderBox";
import ApplicationsSection from "@/components/sections/ApplicationsSection";

export default async function Page() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        notFound();
    }

    const supabase = await createClient();
    const { data: applicationsData, error: applicationErr } = await supabase
        .from("applicants")
        .select(
            "id, applied_at, status, reviewed_at, resume_link, portfolio_link , companies(name,id)"
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
                <EmptyUi message="No Applications" />
            ) : (
                <ApplicationsSection applications={applicationsData} />
            )}
        </div>
    );
}
