import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUser, Settings } from "lucide-react";

export default function Loading() {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 mt-2 md:mt-0">
                <SecondaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileUser size={16} />
                    </IconWrapper>
                    <span>Applicants</span>
                </SecondaryLabel>

                <div className="ms-auto">
                    <Button disabled>
                        <Settings /> Settings
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border shadow-xs bg-card">
                <BorderBox className="border-b">Applicants Data</BorderBox>

                <BorderBox className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="rounded-lg shadow-xs bg-card p-3 md:p-4 lg:p-5 border flex flex-col items-center justify-center"
                        >
                            <div className="mb-3">
                                <Skeleton className="w-24 aspect-square rounded-full" />
                            </div>

                            <div className="flex items-center flex-wrap gap-2 w-full mt-6">
                                <Skeleton className="grow h-8" />
                                <Skeleton className="grow h-8" />
                            </div>
                        </div>
                    ))}
                </BorderBox>
            </div>
        </div>
    );
}
