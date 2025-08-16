"use client";

import {
    Building2,
    ChevronDown,
    ClipboardPen,
    Dot,
    Home,
    LayoutDashboard,
    LogOut,
    MessageCircleQuestionMark,
    MessageSquareMore,
    Plane,
    Settings,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
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
import Logo from "./ui/Logo";

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
                            href: "/student/my-exams/assessment-test",
                            label: "Assessment Test",
                            isActiveLink:
                                pathName === "/student/my-exams/assesment-test",
                        },
                        {
                            href: "/student/my-exams/recent",
                            label: "Recent Exams",
                            isActiveLink:
                                pathName === "/student/my-exams/recent",
                        },
                        {
                            href: "/student/my-exams/results",
                            label: "Results",
                            isActiveLink:
                                pathName === "/student/my-exams/results",
                        },
                    ],
                },
            ],
        },
        {
            label: "Others",
            items: [
                {
                    href: "/settings",
                    icon: <Settings />,
                    label: "Settings",
                    isActiveLink: pathName === "/settings",
                },
                {
                    href: "/feedbacks",
                    icon: <MessageSquareMore />,
                    label: "Feedbacks",
                    isActiveLink: pathName === "/feedbacks",
                },
                {
                    href: "/faq",
                    icon: <MessageCircleQuestionMark />,
                    label: "FAQs",
                    isActiveLink: pathName === "/faq",
                },
            ],
        },
    ];

    return (
        <Sidebar collapsible="icon" className="border-0">
            <SidebarContent>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="pointer-events-none">
                                <Logo className="w-4 h-4" />
                                <p className="font-bold text-secondary-foreground">
                                    InternMatch
                                </p>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                {categories.map((category) => (
                    <SidebarGroup key={category.label}>
                        <SidebarGroupLabel>{category.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {category.items.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        {item.subItems ? (
                                            <Collapsible className="group/collapsible">
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        className="text-muted-foreground"
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
                                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
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
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}

                <SidebarGroup className="border-t border-sidebar-border/50">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="text-destructive hover:bg-destructive/80 cursor-pointer hover:text-destructive-foreground">
                                    <LogOut />
                                    <p>Logout</p>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
