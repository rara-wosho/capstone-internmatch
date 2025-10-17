import Link from "next/link";
import AvatarInitial from "./avatar-initial";
import EditGroupModal from "../forms/EditGroupModal";

export default function GroupCard({ data }) {
    const initial = data?.group_name ? data.group_name.charAt(0) : "G";
    return (
        <div className="border bg-card rounded-xl hover:bg-accent/20 dark:hover:bg-accent/50 hover:border-accent-foreground/40 transition-colors flex items-start group">
            <Link
                href={`/instructor/manage-groups/${data?.id}`}
                className="flex items-center ps-3 pe-2 py-5 w-full"
            >
                <div className="relative">
                    <div className="absolute bottom-0.5 left-0.5">
                        {data?.is_shareable && (
                            <div className="size-2 bg-green-500 rounded-full">
                                <div className="animate-ping size-2 bg-green-500 rounded-full"></div>
                            </div>
                        )}
                    </div>
                    <AvatarInitial letter={initial} />
                </div>
                <div className="flex flex-col ms-2">
                    <div className="flex items-center mb-1 gap-2">
                        <p className="font-semibold text-secondary-foreground group-hover:text-accent-foreground">
                            {data?.group_name}
                        </p>
                    </div>

                    <p className="text-xs text-muted-foreground group-hover:text-accent-foreground">
                        {data?.students?.length} Member
                        {data?.students?.length > 1 && "s"}
                    </p>
                </div>
            </Link>
            <div className="ms-auto rounded-full flex items-center justify-center me-3 pt-6 px-1">
                <EditGroupModal group={data} />
            </div>
        </div>
    );
}
