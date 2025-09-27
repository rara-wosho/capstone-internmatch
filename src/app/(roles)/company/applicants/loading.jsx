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

            <div className="flex flex-col gap-3">
                <BorderBox className="rounded-xl border bg-card shadow-xs">
                    <Skeleton className="h-10 w-full" />
                </BorderBox>

                <BorderBox className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-card shadow-xs border rounded-xl">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="rounded-lg shadow-xs bg-card p-3 md:p-4 lg:p-5 border flex flex-col items-start"
                        >
                            <div className="mb-4">
                                <Skeleton className="w-24 aspect-square rounded-full" />
                            </div>

                            <Skeleton className="h-4 mb-2 w-[60%]" />
                            <Skeleton className="h-3 w-[70%] mb-3" />

                            <div className="flex flex-col gap-4 items-start w-full py-2">
                                <Skeleton className="h-3 w-[50%]" />
                                <Skeleton className="h-3 w-[50%]" />
                            </div>
                            <div className="flex items-center flex-wrap gap-2 w-full mt-3">
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
