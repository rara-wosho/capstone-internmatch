import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader, Search } from "lucide-react";

export default function Loading() {
    return (
        <div>
            <div className="mb-4">
                <SecondaryLabel>Assessment Test Results</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    See your students' assessment test results here.
                </p>
            </div>

            <BorderBox className="border rounded-xl bg-card shadow-xs flex items-center gap-2 mb-3">
                <Skeleton className="h-10 w-full rounded-sm" />{" "}
                <Button variant="white" disabled size="lg">
                    <Search />
                    <span className="hidden md:inline-block">Search</span>
                </Button>
            </BorderBox>

            <BorderBox className="bg-card rounded-xl border">
                <div className="flex items-center gap-2">
                    <Loader className="animate-spin" size={16} />{" "}
                    <p>Please wait...</p>
                </div>
            </BorderBox>
        </div>
    );
}
