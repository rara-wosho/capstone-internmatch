"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import IconWrapper from "./IconWrapper";
import { ArrowUp, MessagesSquare } from "lucide-react";
import { ThemeToggler } from "../theme-toggler";
import Link from "next/link";

export default function PrivateFooter() {
    return (
        <div>
            <footer className="p-3 lg:p-4 border-t bg-white dark:bg-transparent flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    © 2025 InternMatch
                </p>
                <div className="flex gap-2">
                    <div className="border rounded-sm bg-card">
                        <ThemeToggler />
                    </div>
                    <Tooltip delayDuration={800}>
                        <TooltipTrigger className="cursor-pointer" asChild>
                            <Link href="#">
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
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <IconWrapper className="cursor-pointer">
                                    <ArrowUp size={16} />
                                </IconWrapper>
                            </button>
                        </TooltipTrigger>

                        <TooltipContent>
                            <p className="text-xs">Scroll to top</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </footer>
        </div>
    );
}
