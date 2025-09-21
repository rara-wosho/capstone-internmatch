import ExamDetailsForm from "@/components/blocks/ExamDetailsForm";
import BorderBox from "@/components/ui/BorderBox";
import IconWrapper from "@/components/ui/IconWrapper";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { FileText } from "lucide-react";
export default function Page() {
    return (
        <div className="mx-auto max-w-xl">
            <div className="bg-card rounded-xl shadow-xs">
                <BorderBox className="border-b">
                    <TertiaryLabel className="gap-2">
                        <IconWrapper className="hidden md:inline-block">
                            <FileText size={17} />
                        </IconWrapper>
                        <span>Create New Exam</span>
                    </TertiaryLabel>
                </BorderBox>

                <BorderBox>
                    <ExamDetailsForm />
                </BorderBox>
            </div>
        </div>
    );
}
