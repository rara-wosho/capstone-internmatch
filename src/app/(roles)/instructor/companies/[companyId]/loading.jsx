import BorderBox from "@/components/ui/BorderBox";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-3">
            {/* Breadcrumb skeleton */}
            <div className="flex items-center gap-2 mb-2 mt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-2" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-2" />
                <Skeleton className="h-4 w-24" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-4 mt-3">
                <Skeleton className="h-[100px] w-[100px] rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            {/* Contact Info */}
            <BorderBox className="border rounded-xl bg-card space-y-4">
                <Skeleton className="h-5 w-48" />
                <div className="grid sm:grid-cols-2 gap-4">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </BorderBox>

            {/* Company Overview */}
            <BorderBox className="border rounded-xl bg-card space-y-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
            </BorderBox>

            {/* Offers */}
            <BorderBox className="border rounded-xl bg-card space-y-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
            </BorderBox>

            {/* Company Links */}
            <BorderBox className="border rounded-xl bg-card space-y-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
            </BorderBox>
        </div>
    );
}
