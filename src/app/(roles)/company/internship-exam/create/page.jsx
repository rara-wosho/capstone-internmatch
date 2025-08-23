import ExamSection from "@/components/blocks/ExamSection";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { CircleCheck, FileText } from "lucide-react";

export default function Page() {
    return (
        <div className="lg:px-10">
            <div className="flex items-center pb-5 pt-5 bg-background w-full border-b mx-auto">
                <TertiaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileText size={16} />
                    </IconWrapper>
                    <span>Create Exam</span>
                </TertiaryLabel>

                <div className="ms-auto flex items-center gap-2">
                    <Button
                        variant="white"
                        asChild
                        className="bg-neutral-800 text-white dark:bg-neutral-50 dark:text-neutral-900"
                    >
                        <p>
                            <CircleCheck /> Save Exam
                        </p>
                    </Button>
                </div>
            </div>

            {/* exam sections */}
            <div className="main mt-5">
                <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-3">
                    <BorderBox className="border bg-card rounded-xl">
                        <ExamSection />
                    </BorderBox>
                    <div>
                        <div className="border bg-card p-3 lg:p-4 rounded-xl">
                            helo
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
