import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, Loader, PlusCircle } from "lucide-react";

export default function Loading() {
    return (
        <>
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 flex-wrap md:flex-nowrap gap-x-10 gap-y-4">
                <SecondaryLabel className="gap-2 text-left">
                    <ChevronLeft />
                    <Skeleton className="h-6 w-32" />
                </SecondaryLabel>

                <div className="ms-auto grow md:grow-0 flex justify-end">
                    <Button disabled>
                        <PlusCircle /> Add question
                    </Button>
                </div>
            </div>

            <p className="flex items-center gap-2 text-muted-foreground">
                <Loader size={17} className="animate-spin" /> Loading exam
                details...
            </p>
        </>
    );
}
