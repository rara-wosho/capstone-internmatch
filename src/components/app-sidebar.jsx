"use client";

import {
    Building2,
    ChevronDown,
    ClipboardPen,
    LayoutDashboard,
    LogOut,
    MessageCircleQuestionMark,
    MessageSquareMore,
    Settings,
    Users,
    BookOpen,
    Calendar,
    FileText,
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
import { useMemo } from "react";

// Centralized navigation configuration
const navigationConfig = [
    {
        label: "Main",
        items: [
            {
                href: "/student",
                icon: <LayoutDashboard />,
                label: "Dashboard",
                roles: ["student"],
            },
            {
                href: "/instructor",
                icon: <LayoutDashboard />,
                label: "Dashboard",
                roles: ["instructor"],
            },
            {
                href: "/company",
                icon: <LayoutDashboard />,
                label: "Dashboard",
                roles: ["company"],
            },
            {
                href: "/student/companies",
                icon: <Building2 />,
                label: "Companies",
                roles: ["student"],
            },
            {
                href: "/instructor/manage-groups",
                icon: <Users />,
                label: "Manage Groups",
                roles: ["instructor"],
            },
            {
                href: "/company/interns",
                icon: <Users />,
                label: "Manage Interns",
                roles: ["company"],
            },
            {
                icon: <ClipboardPen />,
                label: "My Exams",
                roles: ["student"],
                subItems: [
                    {
                        href: "/assessment-test",
                        label: "Assessment Test",
                        icon: <FileText size={14} />,
                    },
                    {
                        href: "/student/my-exams/recent",
                        label: "Recent Exams",
                        icon: <Calendar size={14} />,
                    },
                    {
                        href: "/student/my-exams/results",
                        label: "Results",
                        icon: <BookOpen size={14} />,
                    },
                ],
            },
            {
                icon: <ClipboardPen />,
                label: "Exam Management",
                roles: ["instructor"],
                subItems: [
                    {
                        href: "/instructor/exams/create",
                        label: "Create Exam",
                        icon: <FileText />,
                    },
                    {
                        href: "/instructor/exams/manage",
                        label: "Manage Exams",
                        icon: <Calendar />,
                    },
                    {
                        href: "/instructor/exams/results",
                        label: "View Results",
                        icon: <BookOpen />,
                    },
                ],
            },
            {
                icon: <ClipboardPen />,
                label: "Internship Programs",
                roles: ["company"],
                subItems: [
                    {
                        href: "/company/programs/create",
                        label: "Create Program",
                        icon: <FileText />,
                    },
                    {
                        href: "/company/programs/manage",
                        label: "Manage Programs",
                        icon: <Calendar />,
                    },
                    {
                        href: "/company/applications",
                        label: "Applications",
                        icon: <BookOpen />,
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
                roles: ["student", "company"],
            },
            {
                href: "/instructor/settings",
                icon: <Settings />,
                label: "Settings",
                roles: ["instructor"],
            },
            {
                href: "/feedbacks",
                icon: <MessageSquareMore />,
                label: "Feedbacks",
                roles: ["student", "instructor", "company"],
            },
            {
                href: "/faq",
                icon: <MessageCircleQuestionMark />,
                label: "FAQs",
                roles: ["student", "instructor", "company"],
            },
        ],
    },
];

// Helper function to check if a path is active
const isPathActive = (itemPath, currentPath) => {
    if (!itemPath) return false;

    // Exact match for root paths
    if (itemPath === currentPath) return true;

    // For non-root paths, check if current path starts with item path
    if (
        itemPath !== "/student" &&
        itemPath !== "/company" &&
        itemPath !== "/instructor" &&
        currentPath.startsWith(itemPath)
    ) {
        return true;
    }
    return false;
};

// Helper function to check if any sub-item is active
const isAnySubItemActive = (subItems, currentPath) => {
    if (!subItems) return false;
    return subItems.some((subItem) => isPathActive(subItem.href, currentPath));
};

export function AppSidebar({ role, onSignOut }) {
    const pathName = usePathname();
    const { setOpenMobile } = useSidebar();

    // Filter navigation items based on user role
    const filteredNavigation = useMemo(() => {
        return navigationConfig
            .map((section) => ({
                ...section,
                items: section.items.filter((item) =>
                    item.roles.includes(role)
                ),
            }))
            .filter((section) => section.items.length > 0); // Remove empty sections
    }, [role]);

    const handleLinkClick = () => {
        setOpenMobile(false);
    };

    const handleSignOut = () => {
        if (onSignOut) {
            onSignOut();
        } else {
            // Default sign out behavior
            console.log("Sign out clicked - implement your sign out logic");
        }
    };

    return (
        <Sidebar collapsible="icon" className="border-0">
            <SidebarContent>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="pointer-events-none mt-1">
                                <Logo className="w-4 h-4" />
                                <p className="font-bold text-secondary-foreground/90 text-xl flex items-end">
                                    Intern
                                    <span className=" inline-flex">Match</span>
                                </p>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                {filteredNavigation.map((section) => (
                    <SidebarGroup key={section.label}>
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        {item.subItems ? (
                                            <Collapsible
                                                defaultOpen={isAnySubItemActive(
                                                    item.subItems,
                                                    pathName
                                                )}
                                                className="group/collapsible"
                                            >
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        className="text-secondary-foreground/80"
                                                        tooltip={item.label}
                                                        isActive={isAnySubItemActive(
                                                            item.subItems,
                                                            pathName
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
                                                            (subItem) => (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        subItem.label
                                                                    }
                                                                >
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                        isActive={isPathActive(
                                                                            subItem.href,
                                                                            pathName
                                                                        )}
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                subItem.href
                                                                            }
                                                                            onClick={
                                                                                handleLinkClick
                                                                            }
                                                                            className="flex items-center gap-2"
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    subItem.icon
                                                                                }
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    subItem.label
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
                                                isActive={isPathActive(
                                                    item.href,
                                                    pathName
                                                )}
                                            >
                                                <Link
                                                    className="text-secondary-foreground/80"
                                                    href={item.href}
                                                    onClick={handleLinkClick}
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

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="border-t border-sidebar-border/50 pt-3">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="text-destructive hover:bg-destructive/80 cursor-pointer hover:text-destructive-foreground"
                                    onClick={handleSignOut}
                                >
                                    <LogOut />
                                    <span>Sign Out</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
