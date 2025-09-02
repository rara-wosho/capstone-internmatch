import BorderBox from "@/components/ui/BorderBox";
import { Skeleton } from "@/components/ui/skeleton";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { BookOpen, Calendar, Link, Pencil, Users2 } from "lucide-react";

export default function Loading() {
    return (
        <div>
            <div className="mb-3 md:mb-5">
                <Skeleton className="h-8 w-36 mb-3" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <BorderBox className="border rounded-xl bg-card">
                    <div className="flex items-center mb-3">
                        <TertiaryLabel>
                            <BookOpen size={17} /> About
                        </TertiaryLabel>
                        <div className="ms-auto">
                            <Pencil
                                size={16}
                                className="text-muted-foreground"
                            />
                        </div>
                    </div>

                    {/* Description placeholder */}
                    <Skeleton className="h-4 w-full mb-3" />

                    {/* Members line */}
                    <div className="flex items-center gap-2 mb-1">
                        <Users2 size={14} className="text-muted-foreground" />
                        <Skeleton className="h-3 w-20" />
                    </div>

                    {/* Date line */}
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-muted-foreground" />
                        <Skeleton className="h-3 w-28" />
                    </div>
                </BorderBox>
                <BorderBox className="border rounded-xl bg-card">
                    <div className="mb-3">
                        <TertiaryLabel>
                            <Link size={17} /> Invitation Link
                        </TertiaryLabel>
                    </div>

                    {/* Description text */}
                    <Skeleton className="h-3 w-64 mb-2" />

                    {/* Input placeholder */}
                    <Skeleton className="h-9 w-full rounded-md" />

                    {/* Buttons row */}
                    <div className="flex items-center mt-4 mb-1 gap-2">
                        <Skeleton className="h-8 w-28 rounded-md" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                </BorderBox>
            </div>
        </div>
    );
}
