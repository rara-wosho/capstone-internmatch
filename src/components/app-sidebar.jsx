"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AppSidebar() {
    const pathName = usePathname();
    const { setOpenMobile } = useSidebar();

    // Menu items.
    const categories = [
        {
            label: "Dashboard",
            items: [
                {
                    href: "/admin",
                    icon: <Home />,
                    label: "Home",
                    isActiveLink: pathName === "/admin",
                },
            ],
        },
    ];

    return (
        <Sidebar collapsible="icon" className="border-0">
            <SidebarContent>
                {categories.map((category) => (
                    <SidebarGroup key={category.label}>
                        <SidebarGroupLabel>{category.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {category.items.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton
                                            tooltip={item.label}
                                            asChild
                                            isActive={item.isActiveLink}
                                        >
                                            <Link
                                                className={cn(
                                                    "text-neutral-500",
                                                    item.isActiveLink &&
                                                        "dark:text-neutral-100"
                                                )}
                                                href={item.href}
                                                onClick={() =>
                                                    setOpenMobile(false)
                                                }
                                            >
                                                {item.icon}
                                                <span
                                                    className={cn(
                                                        "dark:text-neutral-300 text-neutral-800",
                                                        item.isActiveLink &&
                                                            "dark:text-neutral-100 text-white"
                                                    )}
                                                >
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
