"use client";

import { Building2, ClipboardPen, Home, LayoutDashboard } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar({ role }) {
    const pathName = usePathname();
    const { setOpenMobile } = useSidebar();

    // Menu items.
    const categories = [
        {
            label: "Main",
            items: [
                {
                    href: "/student",
                    icon: <LayoutDashboard />,
                    label: "Dashboard",
                    isActiveLink: pathName === "/student",
                },
                {
                    href: "/student/companies",
                    icon: <Building2 />,
                    label: "Companies",
                    isActiveLink: pathName === "/student/companies",
                },
                {
                    icon: <ClipboardPen />,
                    label: "My Exams",
                    subItems: [
                        {
                            href: "/student/my-exams/history",
                            icon: <Building2 />,
                            label: "History",
                            isActiveLink:
                                pathName === "/student/my-exams/history",
                        },
                        {
                            href: "/student/my-exams/upcoming",
                            icon: <Building2 />,
                            label: "Upcoming",
                            isActiveLink:
                                pathName === "/student/my-exams/upcoming",
                        },
                    ],
                },
            ],
        },
        {
            label: "Settings",
            items: [
                {
                    href: "/student/settings",
                    icon: <Home />,
                    label: "Profile",
                    isActiveLink: pathName === "/student/settings",
                },
            ],
        },
        {
            label: "Support",
            items: [
                {
                    href: "/support",
                    icon: <Home />,
                    label: "FAQs",
                    isActiveLink: pathName === "/support",
                },
                {
                    href: "/feedbacks",
                    icon: <Home />,
                    label: "Feedback",
                    isActiveLink: pathName === "/feedbacks",
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
                                        {item.subItems ? (
                                            <Collapsible
                                                defaultOpen
                                                className="group/collapsible"
                                            >
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        tooltip={item.label}
                                                        isActive={item.subItems.some(
                                                            (si) =>
                                                                si.isActiveLink
                                                        )}
                                                    >
                                                        {item.icon}
                                                        <span>
                                                            {item.label}
                                                        </span>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.subItems.map(
                                                            (sub) => (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        sub.label
                                                                    }
                                                                >
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                        isActive={
                                                                            sub.isActiveLink
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                sub.href
                                                                            }
                                                                            onClick={() =>
                                                                                setOpenMobile(
                                                                                    false
                                                                                )
                                                                            }
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    sub.label
                                                                                }
                                                                            </span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            )
                                                        )}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            <SidebarMenuButton
                                                tooltip={item.label}
                                                asChild
                                                isActive={item.isActiveLink}
                                            >
                                                <Link
                                                    className={cn(
                                                        "text-muted-foreground"
                                                    )}
                                                    href={item.href}
                                                    onClick={() =>
                                                        setOpenMobile(false)
                                                    }
                                                >
                                                    {item.icon}
                                                    <span
                                                    // className={cn(
                                                    //     "dark:text-neutral-300 text-neutral-800",
                                                    //     item.isActiveLink &&
                                                    //         "dark:text-neutral-100 text-white"
                                                    // )}
                                                    >
                                                        {item.label}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        )}
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
