import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BreadCrumbs({ links, className }) {
    return (
        <div
            className={cn(
                className,
                " flex items-center dark:text-neutral-400/70 text-sm py-1"
            )}
        >
            {links.map((link, index) => (
                <div key={index} className="flex items-center text-neutral-500">
                    <Link
                        href={link.href}
                        className={cn(
                            "flex items-center gap-2.5 pe-1.5",
                            index === links.length - 1 &&
                                "text-secondary-foreground",
                            link.href === "" && "pointer-events-none",
                            link.href !== "" &&
                                "hover:text-secondary-foreground transition-colors"
                        )}
                    >
                        {link.label}
                        {index !== links.length - 1 && (
                            <ChevronRight size={14} />
                        )}
                    </Link>
                </div>
            ))}
        </div>
    );
}
