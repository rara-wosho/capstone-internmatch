"use client";

import { ArrowUp, MessagesSquare } from "lucide-react";
import { ThemeToggler } from "../theme-toggler";
import Wrapper from "../Wrapper";
import IconWrapper from "./IconWrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import TertiaryLabel from "./TertiaryLabel";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

export default function PublicFooter() {
    return (
        <footer className="pt-12 pb-8 border-t dark:border-t-neutral-800/70 backdrop-blur-xl">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col px-4 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
                    <div className="flex flex-col lg:col-span-2 items-start">
                        <Logo className="w-[50px] aspect-square" />

                        <h1 className="text-xl md:text-2xl mt-3 font-bold uppercase">
                            INTERNMATCH
                        </h1>

                        <p className="py-2 text-neutral-600 dark:text-neutral-300/80 max-w-lg">
                            Connecting Skills to Opportunities. Your Internship
                            Journey Starts Here.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="mb-3 font-semibold">Pages</h4>
                        <Link
                            href="/"
                            className="text-muted-foreground mb-2 hover:text-primary-text"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-muted-foreground mb-2 hover:text-primary-text"
                        >
                            About
                        </Link>

                        <Link
                            href="/feedbacks"
                            className="text-muted-foreground mb-2 hover:text-primary-text"
                        >
                            Feedbacks
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="mb-3 font-semibold">Legal</h4>
                        <Link
                            href="/privacy-policy"
                            className="text-muted-foreground mb-2 hover:text-primary-text"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-conditions"
                            className="text-muted-foreground mb-2 hover:text-primary-text"
                        >
                            Terms and Conditions
                        </Link>
                        <div className="flex gap-2 mt-1">
                            <div className="border rounded-sm bg-card">
                                <ThemeToggler />
                            </div>
                            <Tooltip delayDuration={500}>
                                <TooltipTrigger className="cursor-pointer">
                                    <Link
                                        href="https://www.facebook.com/rae.zionn/"
                                        target="_blank"
                                    >
                                        <IconWrapper>
                                            <MessagesSquare size={16} />
                                        </IconWrapper>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">Send message</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip delayDuration={800}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="cursor-pointer"
                                    >
                                        <IconWrapper>
                                            <ArrowUp size={16} />
                                        </IconWrapper>
                                    </button>
                                </TooltipTrigger>

                                <TooltipContent>
                                    <p className="text-xs">Scroll to top</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t dark:border-neutral-800/90 mt-4 flex items-center justify-between">
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 md:text-sm">
                        Developed by{" "}
                        <span className="font-bold text-neutral-700 dark:text-neutral-300">
                            Israel De Vera
                        </span>
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 md:text-sm">
                        All right reserved@2025
                    </p>
                </div>
            </div>
        </footer>
    );
}
