"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Menu, MessageSquare, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";

export default function MobileNavbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>

            <PopoverContent
                sideOffset={15}
                align="end"
                className="flex flex-col gap-y-1.5"
            >
                <Link
                    onClick={() => setOpen(false)}
                    className={cn(
                        pathname === "/" && "text-primary-text",
                        "py-1 font-semibold transition-colors hover:text-primary-text"
                    )}
                    href="/"
                >
                    Home
                </Link>
                <Link
                    onClick={() => setOpen(false)}
                    className={cn(
                        pathname === "/about" && "text-primary-text",
                        "py-1 font-semibold transition-colors hover:text-primary-text"
                    )}
                    href="/about"
                >
                    About
                </Link>
                <Link
                    onClick={() => setOpen(false)}
                    className={cn(
                        pathname === "/companies" && "text-primary-text",
                        "py-1 font-semibold transition-colors hover:text-primary-text"
                    )}
                    href="/companies"
                >
                    Companies
                </Link>
                <Link
                    onClick={() => setOpen(false)}
                    className={cn(
                        pathname === "/feedbacks" && "text-primary-text",
                        "py-1 font-semibold transition-colors hover:text-primary-text"
                    )}
                    href="/feedbacks"
                >
                    Feedbacks
                </Link>
                <Link
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-1"
                    target="_blank"
                    href="https://www.facebook.com/rae.zionn"
                >
                    Message Us
                </Link>

                <div className="flex items-center gap-1">
                    <ThemeToggler />
                </div>
                <Button
                    onClick={() => setOpen(false)}
                    size="sm"
                    asChild
                    className="mt-3"
                >
                    <Link href="/sign-in">Sign In</Link>
                </Button>
            </PopoverContent>
        </Popover>
    );
}
