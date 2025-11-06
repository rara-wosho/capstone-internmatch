import BorderBox from "@/components/ui/BorderBox";
import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "@/components/Wrapper";

export default function Loading() {
    return (
        <Wrapper size="sm">
            {/* --- Header Section --- */}
            <div className="space-y-4 mb-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-7 w-64" />
            </div>

            <BorderBox className="border rounded-xl bg-card mb-3 gap-5 flex items-center">
                <Skeleton className="w-24 rounded-full aspect-square" />
                <Skeleton className="h-9 w-28" />
            </BorderBox>
            <div className="border rounded-xl bg-card">
                <div className="flex items-center gap-3 px-3 md:px-5 h-[52px] border-b">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-28" />
                </div>
                <BorderBox>
                    {/* --- Company Info Section --- */}
                    <div className="space-y-5 mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2 space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                            <div className="sm:col-span-2 space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-24 w-full" />
                            </div>

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>

                        {/* --- Address Section --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Save Button --- */}
                    <div className="flex justify-end">
                        <Skeleton className="h-9 w-32 rounded-md" />
                    </div>
                </BorderBox>
            </div>
        </Wrapper>
    );
}
