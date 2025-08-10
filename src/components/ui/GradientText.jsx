import { cn } from "@/lib/utils";

export default function GradientText({ children, className }) {
    return (
        <>
            <h1
                className={cn(
                    className,
                    " font-bold hidden lg:inline-flex bg-clip-text text-transparent bg-linear-to-r from-neutral-600 dark:from-neutral-200 to-blue-800 dark:to-neutral-500"
                )}
            >
                {children}
            </h1>

            <h1
                className={cn(
                    className,
                    "lg:hidden inline-flex text-neutral-700 dark:text-neutral-300 font-bold"
                )}
            >
                {children}
            </h1>
        </>
    );
}
