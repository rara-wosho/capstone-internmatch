import { Skeleton } from "@/components/ui/skeleton";
import BorderBox from "@/components/ui/BorderBox";

export default function Loading() {
    return (
        <div className="space-y-3">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <Skeleton className="w-[100px] h-[100px] rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            {/* Accepting Applicants Section */}
            <BorderBox className="rounded-xl bg-primary space-y-2">
                <Skeleton className="h-5 w-60 bg-white/30" />
                <Skeleton className="h-4 w-80 bg-white/20" />
            </BorderBox>

            {/* Company Overview + Contact Info */}
            <div className="border rounded-xl bg-card">
                <BorderBox className="space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-3/4" />
                </BorderBox>

                <BorderBox className="space-y-4">
                    <Skeleton className="h-5 w-40" />
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-44" />
                            </div>
                        ))}
                    </div>
                </BorderBox>
            </div>

            {/* Available Offers */}
            <BorderBox className="border rounded-xl bg-card space-y-3">
                <Skeleton className="h-5 w-40" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-60" />
                </div>
            </BorderBox>

            {/* Company Links */}
            <BorderBox className="border rounded-xl bg-card space-y-3">
                <Skeleton className="h-5 w-36" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-72" />
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-60" />
                </div>
            </BorderBox>
        </div>
    );
}
