import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, Globe, ArrowUpRight, Star, Info } from "lucide-react";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import BorderBox from "@/components/ui/BorderBox";

export default function LoadingCompanyProfile() {
    return (
        <>
            <div className="mb-5 mt-2 flex items-center gap-3">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-6 gap-y-8">
                <section className="bg-card border rounded-xl mb-3 animate-in fade-in">
                    {/* Header */}
                    <BorderBox className="border-b flex items-center justify-between">
                        <BackButton className="flex items-center text-sm text-muted-foreground hover:text-secondary-foreground">
                            <ChevronLeft size={17} />
                            Back
                        </BackButton>

                        <div className="flex items-center text-muted-foreground">
                            <Globe size={17} />
                        </div>
                    </BorderBox>

                    {/* Company Info */}
                    <BorderBox className="flex gap-x-10 gap-y-4 border-b flex-wrap items-center">
                        <div className="flex gap-3">
                            {/* Company picture */}
                            <Skeleton className="size-24 shrink-0 rounded-sm" />

                            {/* Company name + info */}
                            <div className="w-full flex flex-col justify-center">
                                <Skeleton className="h-5 w-40 mb-2" />
                                <Skeleton className="h-4 w-32 mb-2" />

                                {/* Rating */}
                                <div className="flex items-center gap-2">
                                    <Star
                                        size={15}
                                        className="text-yellow-500/30"
                                    />
                                    <Star
                                        size={15}
                                        className="text-yellow-500/30"
                                    />
                                    <Star
                                        size={15}
                                        className="text-yellow-500/30"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Visit button */}
                        <Button
                            variant="white"
                            disabled
                            className="grow sm:grow-0 basis-[120px] ms-auto opacity-50"
                        >
                            Visit <ArrowUpRight />
                        </Button>
                    </BorderBox>

                    {/* Details Section */}
                    <BorderBox>
                        <TertiaryLabel className="mb-2">Details</TertiaryLabel>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-6" />

                        <TertiaryLabel className="mb-2">
                            About Our Company
                        </TertiaryLabel>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-6" />

                        <TertiaryLabel className="mb-2">
                            About Our Company
                        </TertiaryLabel>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-4/6 mb-6" />
                    </BorderBox>
                </section>

                <section className="px-2">
                    <div className="border-b mb-6 pb-3 flex items-center  justify-between">
                        <TertiaryLabel>Examination</TertiaryLabel>
                        <Info size={18} />
                    </div>

                    <Skeleton className="h-4 mb-3.5 w-36" />
                    <Skeleton className="h-3 w-56" />
                </section>
            </div>
        </>
    );
}
