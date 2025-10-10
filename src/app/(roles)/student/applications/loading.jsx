import BorderBox from "@/components/ui/BorderBox";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUser } from "lucide-react";

const TABS = [
    { label: "all" },
    { label: "accepted" },
    { label: "pending" },
    { label: "reviewed" },
    { label: "cancelled" },
];

export default function Loading() {
    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <FileUser size={17} />
                </IconWrapper>
                Applications
            </SecondaryLabel>

            {/* Tabs */}
            <div className="mb-3 flex items-center flex-wrap gap-2">
                {TABS.map((tab) => (
                    <button
                        key={tab.label}
                        className="rounded-sm px-3 py-1 cursor-pointer hover:text-accent-foreground text-sm text-muted-foreground capitalize transition-colors bg-secondary"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="border rounded-xl mb-3 shadow-xs bg-card">
                <BorderBox className="border-b flex flex-wrap gap-2 items-center justify-between">
                    <div>
                        <Skeleton className="mb-1 w-48 h-4" />
                        <Skeleton className="mb-1 w-48 h-3  " />
                    </div>

                    <Skeleton className="rounded-full h-6 px-4 flex items-center">
                        Loading
                    </Skeleton>
                </BorderBox>

                <BorderBox>
                    <div className="mb-4 flex flex-col">
                        <Skeleton className="h-3 w-24 mb-3" />
                        <Skeleton className="h-3 w-36" />
                    </div>
                </BorderBox>
            </div>
        </div>
    );
}
