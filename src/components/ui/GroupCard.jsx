import Link from "next/link";
import AvatarInitial from "./avatar-initial";
import { dateFormatter } from "@/utils/date-formatter";
import EditGroupModal from "../forms/EditGroupModal";

export default function GroupCard({ data }) {
    const initial = data?.group_name ? data.group_name.charAt(0) : "G";
    return (
        <div className="border bg-card rounded-xl hover:bg-accent/20 dark:hover:bg-accent/50 hover:border-accent-foreground/40 transition-colors flex items-start group">
            <Link
                href={`/instructor/manage-groups/${data?.id}`}
                className="flex items-center ps-3 pe-2 py-5 w-full"
            >
                <AvatarInitial letter={initial} />
                <div className="flex flex-col ms-2">
                    <div className="flex items-center mb-1 gap-2">
                        {data?.is_shareable && (
                            <div className="size-2 bg-green-500 rounded-full">
                                <div className="animate-ping size-2 bg-green-500 rounded-full"></div>
                            </div>
                        )}
                        <p className="font-semibold text-secondary-foreground group-hover:text-accent-foreground">
                            {data?.group_name}
                        </p>
                    </div>

                    <p className="text-xs text-muted-foreground group-hover:text-accent-foreground">
                        {dateFormatter(data?.created_at)}
                    </p>
                </div>
            </Link>
            <div className="ms-auto rounded-full flex items-center justify-center me-3 pt-6">
                <EditGroupModal group={data} />
            </div>
        </div>
    );
}
