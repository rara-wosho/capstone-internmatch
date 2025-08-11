import { cn } from "@/lib/utils";

export default function GradientText({ children, className }) {
    return (
        <>
            <h1
                className={cn(
                    className,
                    " font-bold inline-flex bg-clip-text text-transparent bg-linear-to-r to-neutral-500 dark:from-neutral-200 from-neutral-600 dark:to-neutral-400"
                )}
            >
                {children}
            </h1>
        </>
    );
}
