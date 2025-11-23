import ExamDetailsForm from "@/components/blocks/ExamDetailsForm";
import BorderBox from "@/components/ui/BorderBox";
import IconWrapper from "@/components/ui/IconWrapper";
import InfoPopover from "@/components/ui/info-popover";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { FileText, Info } from "lucide-react";
export default function Page() {
    return (
        <div className="mx-auto max-w-xl">
            <div className="bg-card rounded-xl shadow-xs">
                <BorderBox className="border-b flex items-center justify-between">
                    <TertiaryLabel className="gap-2">
                        <IconWrapper className="hidden md:inline-block">
                            <FileText size={17} />
                        </IconWrapper>
                        <span>Create New Exam</span>
                    </TertiaryLabel>
                    <InfoPopover
                        trigger={<Info />}
                        textContent="This exam feature is optional and designed to help your company assess applicants more thoroughly.
You can use exam results to compare student performance, verify their competencies, and identify the most suitable candidates for your internship program."
                    />
                </BorderBox>

                <BorderBox>
                    <ExamDetailsForm />
                </BorderBox>
            </div>
        </div>
    );
}
