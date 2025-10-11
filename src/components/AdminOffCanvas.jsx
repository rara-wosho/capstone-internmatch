"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    FileText,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquareQuote,
    NotebookPen,
    UsersRound,
} from "lucide-react";

import IconWrapper from "./ui/IconWrapper";
import Logo from "./ui/Logo";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SignOutModal from "./ui/SignOutModal";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Links = [
    { icon: <LayoutDashboard size={15} />, href: "/admin", label: "Dashboard" },
    {
        icon: <UsersRound size={15} />,
        href: "/admin/users",
        label: "Users",
    },
    {
        icon: <NotebookPen size={15} />,
        href: "/admin/registrations",
        label: "Registrations",
    },
    {
        icon: <FileText size={15} />,
        href: "/admin/assessment-test",
        label: "Assessment Test",
    },
    {
        icon: <MessageSquareQuote size={15} />,
        href: "/admin/feedbacks",
        label: "Feedbacks",
    },
];

export default function AdminOffCanvas({ user }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="cursor-pointer">
                <IconWrapper>
                    <Menu size={19} />
                </IconWrapper>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <div className="flex items-center gap-2">
                            <Logo className="size-5" />
                            <p className="font-semibold">InternMatch</p>
                        </div>
                    </SheetTitle>
                    <SheetDescription className="sr-only">...</SheetDescription>
                </SheetHeader>

                {/* body  */}
                <div className="p-4">
                    <div className="pb-3 border-b">
                        <p className="font-medium">
                            {user.user_metadata.firstname}{" "}
                            {user.user_metadata.lastname}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>

                    <div className="flex flex-col text-muted-foreground border-b py-3 mb-3">
                        {Links.map((link) => (
                            <Link
                                key={link.href}
                                onNavigate={() => setOpen(false)}
                                href={link.href}
                                className={cn(
                                    "py-1.5 flex items-center gap-2 transition-colors",
                                    pathname === link.href
                                        ? "text-primary-text"
                                        : "hover:text-primary-text"
                                )}
                            >
                                {link.icon} <p>{link.label}</p>
                            </Link>
                        ))}
                    </div>
                    <SignOutModal>
                        <div className="flex items-center gap-2 py-1.5 text-red-400">
                            <LogOut size={15} />
                            <button className="cursor-pointer">Sign Out</button>
                        </div>
                    </SignOutModal>
                </div>
            </SheetContent>
        </Sheet>
    );
}
