import { Skeleton } from "@/components/ui/skeleton";
import {
    ChevronLeft,
    Globe,
    ArrowUpRight,
    Star,
    Info,
    Clock,
    Hash,
    LayoutList,
    Calendar,
    Loader,
} from "lucide-react";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import BorderBox from "@/components/ui/BorderBox";

export default function LoadingCompanyProfile() {
    return (
        <div className="w-full mx-auto max-w-[900px]">
            <div className="mb-5 mt-2 flex items-center gap-3">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                <section className="bg-card border rounded-xl mb-3">
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
                    <BorderBox className="flex gap-x-10 gap-y-4 border-b flex-wrap items-center justify-between">
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

                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                className="order-2 sm:order-1"
                                variant="outline"
                                disabled
                            >
                                View Exams
                            </Button>
                            <Button className="order-1 sm:order-2" disabled>
                                <Loader className="animate-spin" /> Apply
                            </Button>
                        </div>
                    </BorderBox>

                    {/* Details Section */}
                    <BorderBox>
                        <TertiaryLabel className="mb-3">Details</TertiaryLabel>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                    </BorderBox>
                </section>

                <section className="px-2">
                    <div className="flex items-center justify-between mb-6 pb-3 border-b">
                        <TertiaryLabel>Examination</TertiaryLabel>
                        <Info size={18} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="mb-7 flex flex-col">
                            <Skeleton className="h-4 mb-3.5 w-36" />
                            <Skeleton className="h-3 w-56 mb-4" />
                            <div className="text-muted-foreground flex items-center gap-2 text-sm mb-3">
                                <Clock size={12} />
                                <Skeleton className="h-3 w-44" />
                            </div>
                            <div className="text-muted-foreground flex items-center gap-2 text-sm mb-3">
                                <Hash size={12} />
                                <Skeleton className="h-3 w-40" />
                            </div>
                            <div className="text-muted-foreground flex items-center gap-2 text-sm mb-3">
                                <LayoutList size={12} />
                                <Skeleton className="h-3 w-48" />
                            </div>
                            <div className="text-muted-foreground flex items-center gap-2 text-sm mb-6">
                                <Calendar size={12} />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <Skeleton className="h-9 w-full" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
