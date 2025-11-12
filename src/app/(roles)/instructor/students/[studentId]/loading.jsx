import { Skeleton } from "@/components/ui/skeleton";
import BorderBox from "@/components/ui/BorderBox";

export default function Loading() {
    return (
        <div className="space-y-4">
            {/* Breadcrumb Placeholder */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Skeleton className="h-4 w-16" />
                <span>/</span>
                <Skeleton className="h-4 w-24" />
                <span>/</span>
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mt-2 mb-3">
                <Skeleton className="h-[100px] w-[100px] rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            {/* Personal Information */}
            <BorderBox className="border rounded-xl bg-card p-4 space-y-3">
                <Skeleton className="h-5 w-40" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="col-span-2 space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="col-span-2 space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            </BorderBox>

            {/* Exam Access */}
            <BorderBox className="border rounded-xl bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-8 w-28 rounded-md" />
                </div>
                <Skeleton className="h-4 w-56" />
            </BorderBox>

            {/* Exams Taken */}
            <BorderBox className="border rounded-xl bg-card p-4 space-y-3">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-52" />
                </div>
            </BorderBox>
        </div>
    );
}
