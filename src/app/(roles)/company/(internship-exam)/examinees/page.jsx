import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/date-formatter";
import { PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();
    const { user, error: userError } = await getCurrentUser();

    if (userError) {
        return <ErrorUi secondaryMessage={userError} />;
    }

    if (!user) {
        redirect("/sign-in");
    }

    // Get company id from user object
    const companyId = user.id;

    const { data: exams, error: tableErr } = await supabase
        .from("exams")
        .select("id, title, is_published, exam_attempt(id)")
        .eq("company_id", companyId)
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

    if (tableErr) {
        console.error("Error fetching exams:", tableErr.message);
        return (
            <ErrorUi
                message="Unable to load exams."
                secondaryMessage="Something went wrong while we try to load exams."
            />
        );
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 mt-2 md:mt-0">
                <SecondaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <Users size={16} />
                    </IconWrapper>
                    <span>Pick an exam</span>
                </SecondaryLabel>

                <div className="ms-auto">
                    <Button asChild>
                        <Link href="/company/create-exam">
                            <span className="flex gap-1.5 items-center">
                                <PlusCircle />
                                New Exam
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* body content  */}
            {exams?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {exams?.map((exam) => (
                        <div
                            key={exam?.id}
                            className="bg-card rounded-xl border"
                        >
                            <Link href={`/company/examinees/${exam?.id}`}>
                                <div className="p-3 md:p-4">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <p>{exam?.title}</p>
                                    </div>
                                    <p
                                        className={cn(
                                            "text-xs border rounded-full px-2.5 py-0.5 inline-flex",
                                            exam?.is_published &&
                                                "bg-accent text-accent-foreground border-accent"
                                        )}
                                    >
                                        {exam?.is_published
                                            ? "Published"
                                            : "Not Published"}
                                    </p>
                                </div>
                            </Link>
                            <div className="p-3 md:p-4 border-t flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {exam?.exam_attempt?.length} Examinee
                                    {exam?.exam_attempt?.length > 1 && "s"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                    No exams yet. Create your first exam to get started.
                </div>
            )}
        </>
    );
}
