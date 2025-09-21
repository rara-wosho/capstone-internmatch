import { cn } from "@/lib/utils";

// utils/dateFormatter.ts
export function dateFormatter(rawDate, includeTime = false, vertical = false) {
    if (!rawDate) return "";

    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return "";

    const datePart = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    if (!includeTime) return datePart;

    const timePart = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <span className={cn("flex", vertical ? "flex-col" : "items-end gap-1")}>
            <span>{datePart}</span>
            {!vertical && "-"}
            <span className="text-xs">{timePart}</span>
        </span>
    );
}
