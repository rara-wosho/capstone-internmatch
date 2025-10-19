import BackButton from "@/components/ui/BackButton";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { dateFormatter } from "@/utils/date-formatter";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AssessmentResultPage({ params }) {
    const assessmentId = (await params)?.assessmentId || "";

    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        redirect("/sign-in");
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("assessment_attempt")
        .select(
            `
    submitted_at,
    student_id,
    assessment_test_id,
    assessment_score,
    assessment_total_item,
    violation,
    assessment_test(assessment_title),
    assessment_attempt_answers (
      assessment_questions ( id )
    )
  `
        )
        .eq("student_id", user.id)
        .eq("assessment_test_id", assessmentId)
        .maybeSingle(); // or .single()

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    console.log(data);

    if (!data) {
        return (
            <EmptyUi secondaryMessage="We couldn’t find the result you’re looking for. It may not exist or you might not have permission to view it." />
        );
    }

    const assessmentAnwers = data?.assessment_attempt_answers || [];

    return (
        <div>
            <Link
                href="/student/assessment-test"
                className="mb-3 flex items-center text-sm text-muted-foreground"
            >
                <ChevronLeft size={18} />
                <span>Back</span>
            </Link>
            <Wrapper size="sm" className="flex flex-col items-center pt-8">
                <div className="w-[150px] mb-6 aspect-square rounded-full flex items-center justify-center bg-violet-500/40">
                    <div className="w-[130px] aspect-square rounded-full bg-background flex items-center justify-center">
                        <p className="font-bold text-6xl text-primary-text">
                            {data?.assessment_score}
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-primary-text font-medium text-center">
                        You scored {data?.assessment_score} out of{" "}
                        {data?.assessment_total_item}
                    </p>
                </div>
                {/* heading  */}
                <div className="mb-4 md:mb-5">
                    <SecondaryLabel className="text-center">
                        {data?.assessment_test?.assessment_title}
                    </SecondaryLabel>

                    <p className="text-sm text-center text-muted-foreground">
                        Date Taken : {dateFormatter(data?.submitted_at)}
                    </p>
                </div>

                <p className="mb-1text-muted-foreground">Summary</p>
                <p className="text-sm text-muted-foreground mb-4">
                    These are the number of items you answered
                </p>
                <div className="flex items-center justify-center gap-2">
                    {assessmentAnwers.map((answer, i) => (
                        <div
                            key={i}
                            className="size-9 flex items-center justify-center bg-accent dark:bg-muted rounded-sm"
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>

                {data?.violation && (
                    <div className="text-sm text-destructive">
                        {data.violation}
                    </div>
                )}
            </Wrapper>
        </div>
    );
}
