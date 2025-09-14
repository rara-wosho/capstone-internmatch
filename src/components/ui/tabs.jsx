"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn("flex flex-col gap-2", className)}
            {...props}
        />
    );
}

function TabsList({ className, ...props }) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                "text-muted-foreground inline-flex w-fit items-center justify-center",
                className
            )}
            {...props}
        />
    );
}

function TabsTrigger({ className, ...props }) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                "relative after:absolute after:w-0 after:h-[3px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-primary-text data-[state=active]:after:w-full after:rounded-lg",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground data-[state=active]:text-primary-text inline-flex h-full flex-1 items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 cursor-pointer",
                className
            )}
            {...props}
        />
    );
}

function TabsContent({ className, ...props }) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn("flex-1 outline-none", className)}
            {...props}
        />
    );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
