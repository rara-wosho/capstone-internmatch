import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import { FileText, PlusCircle } from "lucide-react";
import Link from "next/link";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
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
                    <Button disabled>
                        <p className="flex gap-1.5 items-center">
                            <PlusCircle />
                            New Exam
                        </p>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-card rounded-xl border">
                        <div className="p-3 md:p-4">
                            <div className="mb-2 mt-1.5">
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-2.5 w-20 mt-1" />
                        </div>
                        <div className="p-3 md:p-4 border-t">
                            <Skeleton className="h-3 w-20 my-[2px]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
