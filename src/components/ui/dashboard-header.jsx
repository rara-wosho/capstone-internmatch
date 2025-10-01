"use client";

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { ThemeToggler } from "../theme-toggler";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "./sidebar";
import Logo from "./Logo";
import IconWrapper from "./IconWrapper";
import { useSession } from "@/context/SessionContext";
import Link from "next/link";
import SignOutModal from "./SignOutModal";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Skeleton } from "./skeleton";
import { useState } from "react";
import { Separator } from "./separator";

export default function DashboardHeader({ profileData }) {
    // for profile popover
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    if (pathname.startsWith("/student/e/")) return null;

    return (
        <div className="sticky top-0 left-0 px-3 md:px-5 lg:px-8 py-3 flex items-center w-full bg-white border-b z-30 backdrop-blur-2xl dark:bg-background/70">
            <SidebarTrigger />

            <div className="border-s ps-2 ms-2 flex items-center">
                <div className="md:hidden inline-flex items-center gap-2">
                    <Logo className="w-4 h-4" />
                    <p className="font-bold text-secondary-foreground">
                        InternMatch
                    </p>
                </div>
                <p className="font-semibold hidden md:inline-block">
                    Welcome back 👋
                </p>
            </div>

            <div className="ms-auto flex items-center gap-3">
                <div className="flex gap-2">
                    <IconWrapper>
                        <Bell size={16} />
                    </IconWrapper>
                    <div className="border rounded-sm bg-card">
                        <ThemeToggler />
                    </div>
                </div>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className="cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <Avatar className="size-[29px]">
                                <AvatarImage
                                    src={
                                        profileData?.avatar_url ||
                                        "/images/default-avatar.jpg"
                                    }
                                    alt="avatar"
                                />
                                <AvatarFallback>
                                    {profileData?.firstname?.charAt(0)}
                                    {profileData?.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:inline-flex items-center gap-1.5">
                                <p className="text-sm text-muted-foreground  hover:text-secondary-foreground transition-colors truncate max-w-[200px]">
                                    {profileData?.firstname}{" "}
                                    {profileData?.lastname}
                                    {profileData?.name}
                                </p>
                                <ChevronDown size={15} />
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        sideOffset={10}
                        align="end"
                        className="w-fit p-0 rounded-sm"
                    >
                        <p className="p-3 text-sm text-muted-foreground">
                            {profileData?.firstname}
                        </p>

                        <Separator />
                        <SidebarMenu className="text-secondary-foreground/80 p-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="cursor-pointer"
                                    asChild
                                >
                                    <Link
                                        onNavigate={() => setOpen(false)}
                                        href={`/${profileData?.role}/profile/${profileData?.id}`}
                                    >
                                        <User />
                                        Your profile
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="cursor-pointer">
                                    <Settings />
                                    Account settings
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                        <Separator />
                        <SidebarMenu className="text-secondary-foreground/80 p-1">
                            <SidebarMenuItem>
                                <SignOutModal>
                                    <SidebarMenuButton className="cursor-pointer">
                                        <LogOut />
                                        Sign Out
                                    </SidebarMenuButton>
                                </SignOutModal>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
