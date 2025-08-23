import { cn } from "@/lib/utils";

export default function IconWrapper({ children, className }) {
    return (
        <div className={cn("p-1.5 rounded-sm bg-card border", className)}>
            {children}
        </div>
    );
}
