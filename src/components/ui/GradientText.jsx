import { cn } from "@/lib/utils";

export default function GradientText({ children, className }) {
    return (
        <>
            <h1
                className={cn(
                    className,
                    " font-bold inline-flex bg-clip-text text-transparent bg-linear-to-r from-neutral-600 dark:from-neutral-200 to-violet-800 dark:to-neutral-500"
                )}
            >
                {children}
            </h1>
        </>
    );
}
