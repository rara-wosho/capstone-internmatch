import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ChartBar,
    ChevronLeft,
    Edit,
    Loader,
    PlusCircle,
    UserCheck,
} from "lucide-react";

export default function Loading() {
    return (
        <>
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 mt-2 md:mt-0">
                <SecondaryLabel className="gap-2 text-left">
                    <ChevronLeft />
                    <Skeleton className="h-6 w-32" />
                </SecondaryLabel>

                <div className="ms-auto">
                    <Button disabled>
                        <PlusCircle /> Add question
                    </Button>
                </div>
            </div>

            <div className="flex items-center mb-5 gap-3">
                <Button variant="primaryOutline" size="sm" disabled>
                    <Edit /> Edit exam
                </Button>
                <Button variant="primaryOutline" size="sm" disabled>
                    <UserCheck /> Examinees
                </Button>
                <Button disabled variant="primaryOutline" size="sm">
                    <ChartBar /> Reports
                </Button>
            </div>

            <p className="flex items-center gap-2 text-muted-foreground">
                <Loader size={17} className="animate-spin" /> Loading exam
                details...
            </p>
        </>
    );
}
