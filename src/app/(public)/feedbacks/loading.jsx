import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "@/components/Wrapper";

export default function Loading() {
    return (
        <div className="min-h-svh flex flex-col">
            <div className="min-h-svh py-6 px-4 mb-12">
                <Wrapper>
                    {/* Header */}
                    <div className="mb-8 mt-12">
                        <h1 className="text-3xl font-bold mb-2">
                            User Feedbacks
                        </h1>
                        <p className="text-muted-foreground">
                            Loading total feedback submission...
                        </p>
                    </div>

                    {/* Feedback Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-6 bg-card"
                            >
                                {/* Header with rating and date */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-2">
                                        {/* Star rating skeleton */}
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Skeleton
                                                    key={star}
                                                    className="w-4 h-4 rounded-full"
                                                />
                                            ))}
                                        </div>
                                        {/* Rating text skeleton */}
                                        <Skeleton className="h-3 w-12" />
                                    </div>
                                    {/* Date skeleton */}
                                    <Skeleton className="h-4 w-24" />
                                </div>

                                {/* Category skeleton */}
                                <div className="mb-3">
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>

                                {/* Feedback Text skeletons */}
                                <div className="mb-4 space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-4/5" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>

                                {/* User ID skeleton */}
                                <div className="pt-3 border-t">
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </div>
        </div>
    );
}
