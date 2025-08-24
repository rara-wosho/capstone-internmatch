import ManageExamCard from "@/components/exam/ManageExamCard";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { FileText, PlusCircle } from "lucide-react";
import ExamDetailsForm from "@/components/blocks/ExamDetailsForm";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

export default function Page() {
    return (
        <div className="lg:px-10">
            <div className="flex items-center pb-5 md:pb-7 pt-2 md:pt-5 border-b mb-5 md:mb-8">
                <TertiaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileText size={16} />
                    </IconWrapper>
                    <span>Manage Exams</span>
                </TertiaryLabel>

                <div className="ms-auto">
                    <Button variant="white" asChild>
                        <Link href="/company/internship-exam/create">
                            <p className="flex gap-1.5 items-center">
                                <PlusCircle />
                                Create New
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
