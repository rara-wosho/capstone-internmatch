import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUser, Settings } from "lucide-react";

export default function Loading() {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 mt-2 md:mt-0">
                <SecondaryLabel className="gap-2">
                    <IconWrapper className="hidden md:inline-block">
                        <FileUser size={16} />
                    </IconWrapper>
                    <span>Applicants</span>
                </SecondaryLabel>

                <div className="ms-auto">
                    <Button disabled>
                        <Settings /> Settings
                    </Button>
                </div>
            </div>

            {/* status section  */}
            <div className="flex items-center gap-2">
                <p className="text-muted-foreground">Status: </p>
                <Skeleton className="h-6   rounded-full  w-36" />
            </div>
        </div>
    );
}
