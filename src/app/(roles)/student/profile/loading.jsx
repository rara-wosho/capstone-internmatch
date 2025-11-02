import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "@/components/Wrapper";

export default function ProfileLoadingPage() {
    return (
        <Wrapper size="sm">
            {/* ======= HEADER ========  */}
            <div className="flex items-center flex-wrap justify-between gap-5 mb-5">
                <div className="flex items-center gap-3 flex-wrap">
                    <Skeleton className="w-[130px] aspect-square rounded-full" />

                    <div className="space-y-3">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />

                        <div className="flex items-center gap-2 mt-3">
                            <Skeleton className="h-9 w-32" />
                            <Skeleton className="h-9 w-32" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-card shadow-xs border px-4 pb-4">
                {/* Tabs Header */}
                <div className="border-b overflow-x-auto overflow-y-hidden mb-7">
                    <div className="h-[55px] gap-4 pt-[2px] flex items-center">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>

                {/* Tab Content */}
                <div>
                    <Skeleton className="h-3 w-20 mb-3" />

                    <div className="flex flex-col gap-3 mb-5">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>

                    <div className="flex items-center mb-2 justify-between">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="size-5" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <Skeleton className="h-8 w-20 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-28 rounded-full" />
                        <Skeleton className="h-8 w-32 rounded-full" />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
