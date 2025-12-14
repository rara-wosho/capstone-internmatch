import { Skeleton } from "@/components/ui/skeleton";
import BorderBox from "@/components/ui/BorderBox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Loading() {
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="space-y-1">
                <Skeleton className="h-4 w-48" /> {/* Breadcrumbs */}
                <Skeleton className="h-4 w-40" /> {/* SecondaryLabel */}
            </div>

            {/* Student Profile */}
            <BorderBox className="border rounded-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />{" "}
                    {/* Avatar */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <Skeleton className="h-6 w-48" /> {/* Name */}
                                <Skeleton className="h-4 w-64 mt-2" />{" "}
                                {/* Email */}
                            </div>

                            <Skeleton className="h-9 w-24" />
                        </div>
                    </div>
                </div>
            </BorderBox>

            {/* Applications Section */}
            <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                    <div>
                        <Skeleton className="h-5 w-40" />{" "}
                        {/* Applications History title */}
                        <Skeleton className="h-4 w-64 mt-2" /> {/* Subtitle */}
                    </div>
                    <Badge
                        variant="outline"
                        className="self-start sm:self-center"
                    >
                        <Skeleton className="h-4 w-16" /> {/* Badge count */}
                    </Badge>
                </div>

                {/* Application cards skeletons */}
                <div className="space-y-5">
                    {[...Array(3)].map((_, i) => (
                        <BorderBox key={i} className="p-4 rounded-xl space-y-3">
                            <Skeleton className="h-5 w-48" />{" "}
                            {/* Company name */}
                            <Skeleton className="h-4 w-64" />{" "}
                            {/* Application details */}
                            <Skeleton className="h-4 w-32" /> {/* Status */}
                        </BorderBox>
                    ))}
                </div>
            </div>
        </div>
    );
}
