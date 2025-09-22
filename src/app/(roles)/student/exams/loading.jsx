import BorderBox from "@/components/ui/BorderBox";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { NotepadText } from "lucide-react";

export default function Loading() {
    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <NotepadText size={17} />
                </IconWrapper>
                Available Exams
            </SecondaryLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[...Array(3)].map((_, index) => (
                    <BorderBox
                        key={index}
                        className="border bg-card rounded-xl shadow-xs"
                    >
                        <Skeleton className="mb-2.5 h-4 w-[80%] mt-[1px]" />
                        <Skeleton className="mb-5 h-3 w-[40%]" />
                        <Skeleton className="mb-4 h-3 w-[60%]" />
                        <Skeleton className="mb-[47px] h-3 w-[60%]" />
                        <Skeleton className="h-9 w-full" />
                    </BorderBox>
                ))}
            </div>
        </div>
    );
}
