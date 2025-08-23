import ExamSection from "@/components/blocks/ExamSection";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { Check, ChevronDown, FileText, Plus } from "lucide-react";

export default function Page() {
    return (
        <div className="lg:px-10">
            <div className="flex items-center pb-5 pt-5 border-b bg-background">
                <TertiaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileText size={16} />
                    </IconWrapper>
                    <span>Create Exam</span>
                </TertiaryLabel>

                <div className="ms-auto flex items-center gap-2">
                    <Button variant="secondary" asChild>
                        <p>
                            Add <ChevronDown />
                        </p>
                    </Button>
                    <Button
                        variant="white"
                        asChild
                        className="bg-neutral-800 text-white dark:bg-neutral-50 dark:text-neutral-900"
                    >
                        <p>Save Exam</p>
                    </Button>
                </div>
            </div>

            {/* exam sections */}
            <div className="main">
                <div className="py-6">
                    <ExamSection />
                </div>

                <div className="border-t pt-10 flex items-center justify-center">
                    <Button
                        variant="link"
                        className="text-secondary-foreground"
                    >
                        Add <Plus size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
