import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DashboardCountBox({
    color = "bg-primary",
    icon,
    valueText,
    label,
    className,
    href = "#",
}) {
    return (
        <Link
            href={href}
            className={`p-4 border rounded-xl bg-card grow basis-[130px] flex items-center gap-2.5 ${className} ${href === "#" && "pointer-events-none"}`}
        >
            <div
                className={cn(
                    "size-10 rounded-sm flex items-center justify-center text-white",
                    color
                )}
            >
                {icon}
            </div>

            <div>
                <p className="text-muted-foreground text-sm whitespace-nowrap">
                    {label}
                </p>
                <p className="font-bold whitespace-nowrap">{valueText}</p>
            </div>
        </Link>
    );
}
