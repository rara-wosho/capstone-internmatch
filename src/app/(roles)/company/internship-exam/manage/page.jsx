import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { FileText, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="lg:px-10">
            <div className="flex items-center pb-5 pt-5 border-b">
                <TertiaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileText size={16} />
                    </IconWrapper>
                    <span>Manage Exams</span>
                </TertiaryLabel>

                <div className="ms-auto">
                    <Button variant="white" asChild>
                        <Link href="/company/internship-exam/create">
                            <PlusCircle />
                            Create New
                        </Link>
                    </Button>
                </div>
            </div>

            <BorderBox className="border bg-card rounded-xl"></BorderBox>
        </div>
    );
}
