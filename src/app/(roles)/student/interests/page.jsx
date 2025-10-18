import ChooseInterestsSection from "@/components/sections/ChooseInterestsSection";
import BackButton from "@/components/ui/BackButton";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {
    const isOnboarding = (await searchParams)?.onboarding || "";

    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        redirect("/sign-in");
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("interests")
        .select("interest")
        .eq("student_id", user.id)
        .maybeSingle();

    if (error) {
        return <ErrorUi />;
    }

    const interests = data?.interest || [];

    return (
        <div>
            {isOnboarding !== "yes" && (
                <BackButton className="flex items-center mb-2 text-muted-foreground">
                    <ChevronLeft size={19} /> Back
                </BackButton>
            )}
            <SecondaryLabel>
                {isOnboarding === "yes" ? "Add Interests" : "Update Interests"}
            </SecondaryLabel>
            <p className="text-sm text-muted-foreground mb-4 md:mb-5">
                Your selected interests will help companies understand your
                preferred fields and match you with suitable opportunities.
            </p>

            <ChooseInterestsSection
                studentId={user.id}
                interests={interests}
                isOnboarding={isOnboarding === "yes"}
            />
        </div>
    );
}
