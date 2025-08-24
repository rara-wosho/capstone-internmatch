import ExamSection from "@/components/blocks/ExamSection";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { ArrowRight, CircleCheck, FileText } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="lg:px-10">
            <div className="flex items-center pb-5 md:pb-7 pt-2 md:pt-5 bg-background w-full border-b mx-auto">
                <TertiaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileText size={16} />
                    </IconWrapper>
                    <span>Create Exam</span>
                </TertiaryLabel>

                <div className="ms-auto flex items-center gap-2">
                    <Button variant="white" asChild>
                        <Link href="/company/internship-exam/manage/sdasdsa">
                            <p className="flex items-center gap-1">
                                Next step <ArrowRight />
                            </p>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* exam sections */}
            <div className="main mt-5 md:mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-3">
                    <BorderBox className="border bg-card rounded-xl lg:order-1 order-2">
                        <p className="font-semibold mb-1">Exam details</p>
                        <ExamSection />
                    </BorderBox>
                    <div className="lg:order-2 order-1">
                        <div className="border bg-card p-3 lg:p-4 rounded-xl">
                            <p className="font-semibold mb-1">Steps</p>
                            <p className="text-muted-foreground text-sm py-1.5">
                                1. Enter examination title and other details.
                            </p>
                            <p className="text-muted-foreground text-sm py-1.5">
                                2. Click 'Next step' button and proceed to add
                                examination questions.
                            </p>
                            <p className="text-muted-foreground text-sm py-1.5">
                                3. Finish and save.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
