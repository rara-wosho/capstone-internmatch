"use client";

import {
    Building2,
    ChevronDown,
    ClipboardPen,
    LayoutDashboard,
    LogOut,
    MessageSquareMore,
    Settings,
    Users,
    Calendar,
    FileText,
    CircleUser,
    Dot,
    User,
    NotepadText,
    FileUser,
    Shield,
    Trash,
    Package2,
    BriefcaseBusiness,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
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

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Logo from "./ui/Logo";
import { useMemo } from "react";
import SignOutModal from "./ui/SignOutModal";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Centralized navigation configurati on
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
                href: "/student/assessment-test",
                icon: <FileText />,
                label: "Assessment Test",
                roles: ["student"],
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
                label: "Groups",
                roles: ["instructor"],
            },
            {
                href: "/instructor/companies",
                icon: <Building2 />,
                label: "Companies",
                roles: ["instructor"],
            },

            // {
            //     href: "/student/exams",
            //     icon: <NotepadText />,
            //     label: "Browse Exams",
            //     roles: ["student"],
            // },

            {
                icon: <ClipboardPen />,
                label: "My Exams",
                roles: ["student"],
                subItems: [
                    {
                        href: "/student/my-exams/recent",
                        label: "Recent Exams",
                        icon: <Calendar size={14} />,
                    },
                ],
            },

            {
                icon: <ClipboardPen />,
                label: "Internship Exam",
                roles: ["company"],
                subItems: [
                    {
                        href: "/company/manage-exam",
                        label: "Manage Exam",
                        icon: <Calendar />,
                    },
                    {
                        href: "/company/create-exam",
                        label: "Create Exam",
                        icon: <FileText />,
                    },
                    {
                        href: "/company/examinees",
                        label: "Examinees",
                        icon: <Calendar />,
                    },
                    {
                        href: "/company/archived-exams",
                        label: "Archives",
                        icon: <Package2 />,
                    },
                ],
            },
            {
                icon: <FileUser />,
                label: "Applicants",
                roles: ["company"],
                subItems: [
                    { href: "/company/applicants", label: "Manage Applicants" },
                    {
                        href: "/company/approved-applicants",
                        label: "Approved",
                    },
                    {
                        href: "/company/schedules",
                        label: "Schedules",
                    },
                ],
            },
            {
                icon: <BriefcaseBusiness />,
                label: "Interns",
                roles: ["company"],
                href: "/company/interns",
            },
            {
                href: "/student/applications",
                icon: <FileUser />,
                label: "Applications",
                roles: ["student"],
            },

            {
                href: "/student/schedules",
                icon: <Calendar />,
                label: "Schedules",
                roles: ["student"],
            },
        ],
    },
    {
        label: "Student",
        items: [
            {
                href: "/instructor/students",
                icon: <CircleUser />,
                label: "Students List",
                roles: ["instructor"],
            },
            {
                href: "/instructor/assessment-test",
                icon: <FileText />,
                label: "Assessment Test",
                roles: ["instructor"],
            },
            {
                href: "/instructor/exam-results",
                icon: <NotepadText />,
                label: "Exam Results",
                roles: ["instructor"],
            },
            {
                icon: <FileUser />,
                label: "Student Applications",
                roles: ["instructor"],
                subItems: [
                    {
                        href: "/instructor/student-applications",
                        label: "Overview",
                        icon: <User />,
                    },
                    {
                        href: "/instructor/accepted",
                        label: "Accepted",
                        icon: <User />,
                    },
                ],
            },
            {
                href: "/instructor/schedules",
                icon: <Calendar />,
                label: "Student Schedules",
                roles: ["instructor"],
            },
        ],
    },
    {
        label: "Others",
        items: [
            {
                href: "/instructor/feedback",
                icon: <MessageSquareMore />,
                label: "Feedback",
                roles: ["instructor"],
            },
            {
                href: "/company/feedback",
                icon: <MessageSquareMore />,
                label: "Feedback",
                roles: ["company"],
            },
            {
                href: "/student/feedback",
                icon: <MessageSquareMore />,
                label: "Feedback",
                roles: ["student"],
            },

            // SETTINGS FOR INSTRUCTOR
            {
                label: "Settings",
                icon: <Settings />,
                roles: ["instructor"],
                subItems: [
                    {
                        href: "/instructor/profile",
                        icon: <User />,
                        label: "Edit Profile",
                    },
                ],
            },

            // SETTINGS FOR COMPANY
            {
                label: "Settings",
                icon: <Settings />,
                roles: ["company"],
                subItems: [
                    {
                        href: "/company/profile/edit",
                        icon: <User />,
                        label: "Edit Profile",
                    },
                    {
                        href: "/company/activities",
                        icon: <User />,
                        label: "Activity Logs",
                    },
                ],
            },

            // SETTINGS FOR STUDENTS
            {
                label: "Settings",
                icon: <Settings />,
                roles: ["student"],
                subItems: [
                    {
                        href: "/student/account/edit",
                        icon: <User />,
                        label: "Edit Profile",
                    },
                    {
                        href: "/student/profile/activities",
                        icon: <User />,
                        label: "Activity Logs",
                    },
                    {
                        href: "/student/interests",
                        icon: <Shield />,
                        label: "Interests",
                    },
                ],
            },
            {
                // Recently deleted items for company
                href: "/company/trash",
                label: "Trash",
                icon: <Trash />,
                roles: ["company"],
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

export function AppSidebar({ profileData }) {
    const pathName = usePathname();

    const { role } = profileData;

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

    return (
        <Sidebar collapsible="icon" className="border-0">
            <SidebarContent>
                <SidebarHeader className="h-14 flex items-center">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="pointer-events-none mt-1">
                                <Logo className="w-4 h-4" />
                                <p className="font-bold text-secondary-foreground/90 text-xl flex items-center">
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
                                                        className="text-secondary-foreground/80 whitespace-nowrap"
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
                                                                                <Dot
                                                                                    size={
                                                                                        16
                                                                                    }
                                                                                />
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
                                <SignOutModal>
                                    <SidebarMenuButton className="text-destructive hover:bg-destructive/80 cursor-pointer hover:text-destructive-foreground">
                                        <LogOut />
                                        <span>Sign Out</span>
                                    </SidebarMenuButton>
                                </SignOutModal>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="hover:bg-transparent"
                        >
                            <Link
                                onClick={handleLinkClick}
                                href={`/${role}/profile`}
                            >
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            profileData?.avatar_url ||
                                            "/images/default-avatar.jpg"
                                        }
                                        alt="avatar"
                                        className="size-4"
                                    />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col w-full">
                                    {role === "company" ? (
                                        <p className="text-xs truncate max-w-[88%]">
                                            {profileData?.name}
                                        </p>
                                    ) : (
                                        <p className="text-xs truncate max-w-[88%]">
                                            {profileData?.firstname}{" "}
                                            {profileData?.lastname}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground truncate max-w-[88%]">
                                        {profileData?.email}
                                    </p>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
