import { cn } from "@/lib/utils";

export default function Wrapper({ className, children, size = "md" }) {
    return (
        <div
            className={cn(
                size === "sm" && "max-w-[900px] ",
                size === "md" && "max-w-[1200px] ",
                className,
                " mx-auto w-full"
            )}
        >
            {children}
        </div>
    );
}
