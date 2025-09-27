import ApplicantsSettingsModal from "@/components/modals/ApplicantsSettingsModal";
import ApplicantsSection from "@/components/sections/ApplicantsSection";
import { Button } from "@/components/ui/button";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { FileUser, Settings } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ApplicantsPage() {
    const { user, error: userError } = await getCurrentUser();

    if (userError) {
        return <ErrorUi secondaryMessage="Error verifying user." />;
    }

    if (!user) {
        redirect("/sign-in");
    }

    const supabase = await createClient();

    const { data: applicantsData, error } = await supabase
        .from("applicants")
        .select("id, applied_at, student_id, resume_link,status, message")
        .eq("company_id", user?.id)
        .order("applied_at", { ascending: false });

    if (error) {
        return <ErrorUi secondaryMessage="Unable to fetch applicants data" />;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 mt-2 md:mt-0">
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

            <ApplicantsSection applicants={applicantsData} />
            {/* body  */}
            {applicantsData.length === 0 ? (
                <div>
                    <EmptyUi
                        message="No applicants yet."
                        secondaryMessage="Once students start applying, their information will appear here."
                    />
                </div>
            ) : (
                <ApplicantsSection applicants={applicantsData} />
            )}
        </div>
    );
}
