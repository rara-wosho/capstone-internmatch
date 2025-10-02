import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-linear-to-b from-violet-400 to-violet-700 text-primary-foreground shadow-xs hover:opacity-90",
                success:
                    "bg-green-600 text-white shadow-xs transition-all hover:opacity-90 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40 dark:bg-green-700",
                successOutline:
                    "bg-green-500/10 text-green-500 shadow-xs transition-all hover:opacity-90 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40",
                destructive:
                    "bg-destructive text-white shadow-xs hover:opacity-80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                dangerOutline:
                    "bg-red-500/5 text-destructive shadow-xs focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border border-destructive hover:bg-red-500/15",
                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                primaryOutline:
                    "border border-primary bg-background shadow-xs text-primary-text dark:hover:bg-primary hover:bg-primary hover:text-primary-foreground dark:bg-background",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:opacity-80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
                white: "shadow-xs bg-neutral-800 border-gray-400 dark:bg-neutral-100 text-neutral-50 dark:text-black hover:opacity-90 border border-neutral-800 dark:border-neutral-100",
                outlineWhite:
                    "shadow-xs bg-white dark:bg-secondary text-neutral-800 dark:text-foreground hover:opacity-90 border border-neutral-500 dark:border-secondary",
            },
            size: {
                default: "h-9 px-4 py-2.5 has-[>svg]:px-3",
                sm: "h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-sm px-6 has-[>svg]:px-4",
                icon: "size-9",
                smallIcon: "size-7",
                smallest: "h-7 rounded-sm gap-1.5 px-3 has-[>svg]:px-2",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
