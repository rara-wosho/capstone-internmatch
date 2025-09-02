import Link from "next/link";
import AvatarInitial from "./avatar-initial";
import { EllipsisVertical } from "lucide-react";
import { Button } from "./button";
import GroupCardOption from "./groupcard-option";
import { dateFormatter } from "@/utils/date-formatter";

export default function GroupCard({ data }) {
    const initial = data?.group_name ? data.group_name.charAt(0) : "G";
    return (
        <div className="border bg-card rounded-xl hover:bg-accent/20 dark:hover:bg-accent/50 hover:border-accent-foreground/40 transition-colors flex items-center group">
            <Link
                href={`/instructor/manage-groups/${data?.id}`}
                className="flex items-center ps-3 pe-2 py-5 w-full"
            >
                <AvatarInitial letter={initial} />
                <div className="flex flex-col ms-2">
                    <p className="font-semibold text-secondary-foreground group-hover:text-accent-foreground mb-1">
                        {data?.group_name}
                    </p>
                    <p className="text-xs text-muted-foreground w-[75%] truncate group-hover:text-accent-foreground">
                        {dateFormatter(data?.created_at)}
                    </p>
                </div>
            </Link>
            <div className="ms-auto pe-2">
                <GroupCardOption />
            </div>
        </div>
    );
}
