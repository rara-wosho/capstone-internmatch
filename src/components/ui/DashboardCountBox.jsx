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
            className={`p-5 border rounded-xl bg-card grow basis-[130px] flex items-center gap-2.5 ${className} ${href === "#" && "pointer-events-none"}`}
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
                <p className="font-bold text-xl whitespace-nowrap">
                    {valueText}
                </p>
                <p className="text-muted-foreground  whitespace-nowrap">
                    {label}
                </p>
            </div>
        </Link>
    );
}
