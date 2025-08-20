import Link from "next/link";
import AvatarInitial from "./avatar-initial";
import { EllipsisVertical } from "lucide-react";
import { Button } from "./button";

export default function GroupCard() {
    return (
        <div className="border bg-white shadow-xs dark:bg-card rounded-lg px-3 py-5 hover:bg-accent/20 dark:hover:bg-accent/50 hover:border-accent-foreground/40 transition-colors">
            <div className="flex items-center">
                <AvatarInitial letter="G" />
                <div className="flex flex-col w-[75%] ms-2">
                    <Link
                        href="#"
                        className="hover:underline underline-offset-4"
                    >
                        <p className="font-semibold text-secondary-foreground truncate">
                            This is a sample title
                        </p>
                    </Link>
                    <p className="text-sm text-muted-foreground truncate">
                        this is a sample description Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Accusantium, aliquam!s
                    </p>
                </div>

                <button className="p-2 rounded-full hover:bg-accent ms-auto">
                    <EllipsisVertical size={18} />
                </button>
            </div>
        </div>
    );
}
