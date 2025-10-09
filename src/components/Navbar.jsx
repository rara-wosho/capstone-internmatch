"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Wrapper from "./Wrapper";
import { ThemeToggler } from "./theme-toggler";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import Logo from "./ui/Logo";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <div className="fixed z-50 top-0 left-0 w-full px-3 h-[64px] flex items-center bg-white dark:bg-transparent backdrop-blur-2xl">
            <div className="absolute bottom-0 w-full left-0 h-[1px] bg-linear-to-r from-transparent via-neutral-400/20 dark:via-neutral-600/20 to-transparent"></div>

            <Wrapper className="grid grid-cols-2 md:grid-cols-3">
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="w-5 h-5" />
                    <p className="font-bold">InternMatch</p>
                </Link>
                <div className="hidden md:flex middle items-center justify-center gap-6 text-neutral-700 dark:text-neutral-300">
                    <Link
                        className={cn(
                            pathname === "/" && "text-primary-text",
                            "py-1 font-semibold relative after:absolute after:h-[2px] after:w-0 hover:after:w-full after:bg-primary-text after:left-0 after:bottom-0 transition-all after:transition-all  hover:text-primary-text"
                        )}
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className={cn(
                            pathname === "/about" && "text-primary-text",
                            "py-1 font-semibold relative after:absolute after:h-[2px] after:w-0 hover:after:w-full after:bg-primary-text after:left-0 after:bottom-0 transition-all after:transition-all hover:text-primary-text"
                        )}
                        href="/about"
                    >
                        About
                    </Link>
                    <Link
                        className={cn(
                            pathname === "/companies" && "text-primary-text",
                            "py-1 font-semibold relative after:absolute after:h-[2px] after:w-0 hover:after:w-full after:bg-primary-text after:left-0 after:bottom-0 transition-all after:transition-all hover:text-primary-text"
                        )}
                        href="/companies"
                    >
                        Companies
                    </Link>
                    <Link
                        className={cn(
                            pathname === "/feedbacks" && "text-primary-text",
                            "py-1 font-semibold relative after:absolute after:h-[2px] after:w-0 hover:after:w-full after:bg-primary-text after:left-0 after:bottom-0 transition-all after:transition-all hover:text-primary-text"
                        )}
                        href="/feedbacks"
                    >
                        Feedbacks
                    </Link>
                </div>
                <div className="right hidden md:flex justify-end gap-2.5">
                    <div className="border-e flex items-center me-1 pe-2 gap-3">
                        <Link
                            target="_blank"
                            href="https://www.facebook.com/rae.zionn"
                        >
                            <MessageSquare size={17} />
                        </Link>
                        <ThemeToggler />
                    </div>
                    <Button size="sm" asChild>
                        <Link href="/sign-in" className="px-6">
                            Sign In
                        </Link>
                    </Button>
                </div>

                <div className="ms-auto md:hidden flex items-center pe-2">
                    <MobileNavbar />
                </div>
            </Wrapper>
        </div>
    );
}
