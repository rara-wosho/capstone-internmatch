import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import { FileText, PlusCircle, Trash, Users } from "lucide-react";
import Link from "next/link";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8">
                <SecondaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <Users size={16} />
                    </IconWrapper>
                    <span>Pick an exam</span>
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
                    <div key={index} className="border p-3 rounded-xl bg-card">
                        <Skeleton className="w-[80%] h-4 mb-3.5" />
                        <Skeleton className="w-24 h-3" />
                    </div>
                ))}
            </div>
        </div>
    );
}
