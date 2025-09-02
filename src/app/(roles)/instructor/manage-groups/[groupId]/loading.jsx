import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className="mb-7">
                <div className="inline-block">
                    <Skeleton className="h-8 w-44" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
}
