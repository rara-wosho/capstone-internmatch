import ManageExamCard from "@/components/exam/ManageExamCard";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import { FileText, PlusCircle } from "lucide-react";
import Link from "next/link";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import ErrorUi from "@/components/ui/ErrorUi";
import { getCurrentUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();
    const { user, error: userError } = await getCurrentUser();

    if (userError || !user) {
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
                        <FileText size={16} />
                    </IconWrapper>
                    <span>Manage Exams</span>
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

            {/* Exams grid */}
            {exams && exams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {exams.map((exam) => (
                        <ManageExamCard key={exam.id} examData={exam} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-10">
                    No exams yet. Create your first exam to get started.
                </p>
            )}
        </>
    );
}
