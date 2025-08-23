import Link from "next/link";
import AvatarInitial from "./avatar-initial";
import { EllipsisVertical } from "lucide-react";
import { Button } from "./button";
import GroupCardOption from "./groupcard-option";

export default function GroupCard() {
    return (
        <div className="border bg-card rounded-xl hover:bg-accent/20 dark:hover:bg-accent/50 hover:border-accent-foreground/40 transition-colors flex items-center group">
            <Link
                href="/instructor/manage-groups/hsdashief"
                className="flex items-center ps-3 pe-2 py-5 w-full"
            >
                <AvatarInitial letter="G" />
                <div className="flex flex-col ms-2">
                    <p className="font-semibold text-secondary-foreground group-hover:text-accent-foreground mb-1">
                        This is a sample title
                    </p>
                    <p className="text-xs text-muted-foreground w-[75%] truncate group-hover:text-accent-foreground">
                        January 17 2025
                    </p>
                </div>
            </Link>
            <div className="ms-auto pe-2">
                <GroupCardOption />
            </div>
        </div>
    );
}
