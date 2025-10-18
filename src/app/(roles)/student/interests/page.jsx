import ChooseInterestsSection from "@/components/sections/ChooseInterestsSection";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
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

    const interests = data || [];

    return (
        <div>
            <SecondaryLabel>
                {isOnboarding === "yes" ? "Add Interests" : "Update Interests"}
            </SecondaryLabel>
            <p className="text-sm text-muted-foreground  mb-4 md:mb-5">
                This will let companies you applied to see what fields you are
                interested in
            </p>

            <ChooseInterestsSection interests={interests} />
        </div>
    );
}
