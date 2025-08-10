"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Wrapper from "./Wrapper";
import { ThemeToggler } from "./theme-toggler";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <div className="fixed z-50 top-0 left-0 w-full px-3 border-b dark:border-b-neutral-900 py-3 bg-white dark:bg-transparent backdrop-blur-2xl">
            <Wrapper className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <p className="font-bold">InternMatch</p>
                </Link>
                <div className="hidden md:flex middle items-center gap-6 text-neutral-700 dark:text-neutral-300">
                    <Link
                        className={cn(
                            pathname === "/" &&
                                "text-primary-text border-b-3 border-primary-text",
                            "py-1 font-semibold transition-colors hover:text-primary-text"
                        )}
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className={cn(
                            pathname === "/about" &&
                                "text-primary-text border-b-3 border-primary-text",
                            "py-1 font-semibold transition-colors hover:text-primary-text"
                        )}
                        href="/about"
                    >
                        About
                    </Link>
                    <Link
                        className={cn(
                            pathname === "/companies" &&
                                "text-primary-text border-b-3 border-primary-text",
                            "py-1 font-semibold transition-colors hover:text-primary-text"
                        )}
                        href="/companies"
                    >
                        Companies
                    </Link>
                    <Link
                        className={cn(
                            pathname === "/feedbacks" &&
                                "text-primary-text border-b-3 border-primary-text",
                            "py-1 font-semibold transition-colors hover:text-primary-text"
                        )}
                        href="/feedbacks"
                    >
                        Feedbacks
                    </Link>
                    <ThemeToggler />
                </div>
                <div className="right hidden md:flex gap-2.5">
                    <Button variant="outline">Register</Button>
                    <Button>Sign In</Button>
                </div>
            </Wrapper>
        </div>
    );
}
