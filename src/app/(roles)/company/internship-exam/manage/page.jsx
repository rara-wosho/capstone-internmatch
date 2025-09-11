import ManageExamCard from "@/components/exam/ManageExamCard";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import { FileText, PlusCircle } from "lucide-react";
import Link from "next/link";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import ErrorUi from "@/components/ui/ErrorUi";

export default async function Page() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("exams")
        .select("id, title, created_at");

    if (error) {
        console.log("error", error.message);
        return <ErrorUi />;
    }

    return (
        <div>
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8">
                <SecondaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileText size={16} />
                    </IconWrapper>
                    <span>Manage Exams</span>
                </SecondaryLabel>

                <div className="ms-auto">
                    <Button asChild>
                        <Link href="/company/internship-exam/create">
                            <p className="flex gap-1.5 items-center">
                                <PlusCircle />
                                New Exam
                            </p>
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data?.map((exam) => (
                    <ManageExamCard key={exam?.id} examData={exam} />
                ))}
            </div>
        </div>
    );
}
