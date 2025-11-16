"use client";

import React, { useState } from "react";
import {
    Building2,
    CircleQuestionMark,
    Home,
    LogIn,
    Menu,
    MessageCircleHeart,
    MessageCircleMore,
    MessageSquareMore,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "./ui/Logo";
import { Separator } from "./ui/separator";

export default function MobileNavbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Menu size={22} />
                </SheetTrigger>
                <SheetContent
                    aria-describedby={undefined}
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                    }}
                >
                    <SheetHeader>
                        <SheetTitle>
                            <div className="flex items-center gap-2 pt-3">
                                <Logo className="size-5" />{" "}
                                <p className="font-semibold text-lg">
                                    InternMatch
                                </p>
                            </div>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col px-5">
                        <Link
                            onClick={() => setOpen(false)}
                            className={cn(
                                pathname === "/"
                                    ? "text-primary-text bg-violet-500/5 dark:bg-violet-400/5"
                                    : "text-muted-foreground",
                                "py-1.5 px-3 rounded-sm gap-2.5 flex items-center"
                            )}
                            href="/"
                        >
                            <Home size={15} />
                            Home
                        </Link>
                        <Link
                            onClick={() => setOpen(false)}
                            className={cn(
                                pathname === "/about"
                                    ? "text-primary-text bg-violet-500/5 dark:bg-violet-400/5"
                                    : "text-muted-foreground",
                                "py-1.5 px-3 rounded-sm gap-2.5 flex items-center"
                            )}
                            href="/about"
                        >
                            <CircleQuestionMark size={15} />
                            About
                        </Link>
                        {/* <Link
                            onClick={() => setOpen(false)}
                            className={cn(
                                pathname === "/companies"
                                    ? "text-primary-text bg-violet-500/5 dark:bg-violet-400/5"
                                    : "text-muted-foreground",
                                "py-1.5 px-3 rounded-sm gap-2.5 flex items-center"
                            )}
                            href="/companies"
                        >
                            <Building2 size={15} />
                            Companies
                        </Link> */}
                        <Link
                            onClick={() => setOpen(false)}
                            className={cn(
                                pathname === "/feedbacks"
                                    ? "text-primary-text bg-violet-500/5 dark:bg-violet-400/5"
                                    : "text-muted-foreground",
                                "py-1.5 px-3 rounded-sm gap-2.5 flex items-center"
                            )}
                            href="/feedbacks"
                        >
                            <MessageCircleHeart size={15} />
                            Feedbacks
                        </Link>
                        <Link
                            onClick={() => setOpen(false)}
                            className="py-1.5 px-3 rounded-sm gap-2.5 flex items-center text-muted-foreground"
                            target="_blank"
                            href="https://www.facebook.com/rae.zionn"
                        >
                            <MessageSquareMore size={15} />
                            Message Us
                        </Link>

                        <div className="py-3">
                            <Separator />
                        </div>
                        <Button
                            onClick={() => setOpen(false)}
                            size="sm"
                            asChild
                            className="mt-3"
                        >
                            <Link href="/sign-in">
                                Sign In <LogIn />
                            </Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
