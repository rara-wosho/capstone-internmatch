"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Wrapper from "./Wrapper";
import { ThemeToggler } from "./theme-toggler";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageCircle, MessageSquare } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <div className="fixed z-50 top-0 left-0 w-full px-3 py-3 bg-white dark:bg-transparent backdrop-blur-2xl">
            <div className="absolute bottom-0 w-full left-0 h-[1px] bg-linear-to-r from-transparent via-neutral-400/20 dark:via-neutral-600/20 to-transparent"></div>

            <Wrapper className="grid grid-cols-2 md:grid-cols-3">
                <Link href="/" className="flex items-center gap-2">
                    <p className="font-bold">InternMatch</p>
                </Link>
                <div className="hidden md:flex middle items-center justify-center gap-6 text-neutral-700 dark:text-neutral-300">
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
                </div>
                <div className="right hidden md:flex justify-end gap-2.5">
                    <div className="border-e flex items-center pe-3 me-2 gap-3">
                        <Link
                            target="_blank"
                            href="https://www.facebook.com/rae.zionn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
                            </svg>
                        </Link>
                        <Link
                            target="_blank"
                            href="https://www.facebook.com/rae.zionn"
                        >
                            <MessageSquare size={17} />
                        </Link>
                        <ThemeToggler />
                    </div>
                    <Button size="sm" asChild>
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                </div>
            </Wrapper>
        </div>
    );
}
