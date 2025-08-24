import BackButton from "@/components/ui/BackButton";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { ChevronLeft, FileText, PlusCircle } from "lucide-react";

export default function Page() {
    return (
        <div className="lg:px-10">
            {/* header  */}
            <div className="flex items-center pb-5 md:pb-7 pt-2 md:pt-5 border-b mb-5 md:mb-8 flex-wrap md:flex-nowrap gap-x-10 gap-y-4">
                <BackButton className="hover:bg-card rounded-sm pe-2 py-1 transition-colors">
                    <TertiaryLabel className="gap-2">
                        <ChevronLeft />
                        <span>Funcamentals of programming</span>
                    </TertiaryLabel>
                </BackButton>

                <div className="ms-auto grow md:grow-0 flex justify-end">
                    <Button variant="white" className="sm:grow-0 grow">
                        <PlusCircle />
                        Add question
                    </Button>
                </div>
            </div>

            {/* content  */}
            <BorderBox className="bg-card border rounded-xl">
                add question
            </BorderBox>
        </div>
    );
}
