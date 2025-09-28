import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2 } from "lucide-react";

export default function Loading() {
    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <Building2 size={17} />
                </IconWrapper>{" "}
                Companies
            </SecondaryLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {/* card skeletons  */}
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="border rounded-xl p-2">
                        <Skeleton className="w-full aspect-[5/3.5] mb-3" />

                        <div className="py-2 md:px-2">
                            <Skeleton className="w-[80%] h-4 mb-3" />
                            <Skeleton className="w-full h-3.5 mb-4" />
                            <Skeleton className="w-[80%] h-2.5 mb-3" />
                            <Skeleton className="w-[80%] h-2.5 mb-5" />

                            <Skeleton className="grow h-8" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
