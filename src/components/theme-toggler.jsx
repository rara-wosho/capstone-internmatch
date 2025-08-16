"use client";

import * as React from "react";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center outline-0 p-1 rounded cursor-pointer">
                    <Moon className="hidden dark:inline-block" size={18} />
                    <Sun className="inline-block dark:hidden" size={18} />
                    <span className="sr-only">Toggle theme</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="flex items-center gap-2 text-secondary-foreground/80"
                    onClick={() => setTheme("light")}
                >
                    <Sun /> Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex items-center gap-2 text-secondary-foreground/80"
                    onClick={() => setTheme("dark")}
                >
                    <Moon /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex items-center gap-2 text-secondary-foreground/80"
                    onClick={() => setTheme("system")}
                >
                    <LaptopMinimal /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
