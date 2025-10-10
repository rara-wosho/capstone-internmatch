import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader, Search } from "lucide-react";

export default function Loading() {
    return (
        <div>
            <div>
                <SecondaryLabel className="mb-4 md:mb-5">
                    Student Applications
                </SecondaryLabel>

                <BorderBox className="border rounded-xl bg-card shadow-xs flex items-center gap-2 mb-3">
                    <Skeleton className="h-10 w-full rounded-sm" />{" "}
                    <Button variant="white" disabled size="lg">
                        <Search />
                        <span className="hidden md:inline-block">Search</span>
                    </Button>
                </BorderBox>

                <p className="text-center flex items-center justify-center gap-2 text-muted-foreground text-sm">
                    <Loader size={15} className="animate-spin" />
                    Loading students
                </p>
            </div>
        </div>
    );
}
