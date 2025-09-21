import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
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
        .select("id, title, created_at, questions(id)")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false });

    if (tableErr) {
        console.error("Error fetching exams:", tableErr.message);
        return <ErrorUi message="Unable to load exams." />;
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {exams?.map((exam) => (
                        <Link
                            href={`/company/examinees/${exam.id}`}
                            className="border p-3 rounded-xl bg-card shadow-xs"
                            key={exam.id}
                        >
                            <p className="mb-1">{exam.title}</p>
                            <p className="text-sm text-muted-foreground">
                                {dateFormatter(exam.created_at)}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div>No exams created yet.</div>
            )}
        </>
    );
}
