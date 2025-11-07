import { cn } from "@/lib/utils";

export default function StatusPill({
    label,
    icon,
    size = "lg",
    variant = "default",
    className,
}) {
    const height = size === "sm" ? "h-6" : size === "md" ? "h-7" : "h-8";

    const variantStyles = {
        success:
            "bg-green-100 dark:bg-green-200 text-green-700 border-green-200",
        danger: "bg-red-100 dark:bg-red-600/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/15",
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        reviewed: "bg-blue-100 text-blue-700 border-blue-200",
        default: "bg-gray-100 text-gray-700 border-gray-200",
    };

    return (
        <div
            className={cn(
                "px-3 flex items-center gap-2 border rounded-full font-medium",
                height,
                variantStyles[variant],
                className
            )}
        >
            {icon && <span className="text-sm">{icon}</span>}
            <p className="text-sm capitalize">{label}</p>
        </div>
    );
}
