import BorderBox from "@/components/ui/BorderBox";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className="mb-4">
                <Skeleton className="h-6 mb-2  w-[220px]" />
                <Skeleton className="h-4 w-[280px]" />
            </div>

            <div className="border rounded-xl bg-card mb-3">
                <BorderBox className="border-b">
                    <Skeleton className="h-5 mb-2  w-[220px]" />
                    <Skeleton className="h-4 w-[280px]" />
                </BorderBox>
                <BorderBox>
                    <Skeleton className="h-5 mb-2  w-[220px]" />
                    <Skeleton className="h-4 w-[280px]" />
                </BorderBox>
            </div>
            <div className="border rounded-xl bg-card mb-3">
                <BorderBox className="border-b">
                    <Skeleton className="h-5 mb-2  w-[220px]" />
                    <Skeleton className="h-4 w-[280px]" />
                </BorderBox>
                <BorderBox>
                    <Skeleton className="h-5 mb-2  w-[220px]" />
                    <Skeleton className="h-4 w-[280px]" />
                </BorderBox>
            </div>
        </div>
    );
}
