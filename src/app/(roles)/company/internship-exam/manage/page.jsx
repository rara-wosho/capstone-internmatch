import ManageExamCard from "@/components/exam/ManageExamCard";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import { FileText, PlusCircle } from "lucide-react";
import Link from "next/link";
import SecondaryLabel from "@/components/ui/SecondaryLabel";

export default function Page() {
    return (
        <div className="lg:px-10">
            <div className="flex items-center pb-5 md:pb-7 pt-2 md:pt-5 border-b mb-5 md:mb-8">
                <SecondaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileText size={16} />
                    </IconWrapper>
                    <span>Manage Exams</span>
                </SecondaryLabel>

                <div className="ms-auto">
                    <Button variant="white" asChild>
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
                <ManageExamCard />
                <ManageExamCard />
                <ManageExamCard />
            </div>
        </div>
    );
}
