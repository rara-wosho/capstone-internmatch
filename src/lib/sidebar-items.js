import { LayoutDashboard, Building2, ClipboardPen, Home } from "lucide-react";

export const sidebarItems = {
    student: [
        {
            label: "Main",
            items: [
                {
                    href: "/student",
                    icon: <LayoutDashboard />,
                    label: "Dashboard",
                },
                {
                    href: "/student/companies",
                    icon: <Building2 />,
                    label: "Companies",
                },
                {
                    icon: <ClipboardPen />,
                    label: "My Exams",
                    subItems: [
                        {
                            href: "/student/my-exams/upcoming",
                            label: "Upcoming",
                        },
                        {
                            href: "/student/my-exams/completed",
                            label: "Completed",
                        },
                    ],
                },
            ],
        },
        {
            label: "My Exams",
            subItems: [
                { href: "/student/settings", icon: <Home />, label: "Profile" },
                { href: "/student/settings", icon: <Home />, label: "Profile" },
            ],
        },
        {
            label: "Settings",
            items: [
                { href: "/student/settings", icon: <Home />, label: "Profile" },
            ],
        },
        {
            label: "Support",
            items: [
                { href: "/support", icon: <Home />, label: "FAQs" },
                { href: "/feedbacks", icon: <Home />, label: "Feedback" },
            ],
        },
    ],

    company: [
        {
            label: "Main",
            items: [
                {
                    href: "/company",
                    icon: <LayoutDashboard />,
                    label: "Dashboard",
                },
                {
                    href: "/company/exams",
                    icon: <ClipboardPen />,
                    label: "Manage Exams",
                },
            ],
        },
        {
            label: "Settings",
            items: [
                { href: "/company/settings", icon: <Home />, label: "Profile" },
            ],
        },
    ],

    instructor: [
        {
            label: "Main",
            items: [
                {
                    href: "/instructor",
                    icon: <LayoutDashboard />,
                    label: "Dashboard",
                },
                {
                    href: "/instructor/students",
                    icon: <Building2 />,
                    label: "Students",
                },
            ],
        },
        {
            label: "Settings",
            items: [
                {
                    href: "/instructor/settings",
                    icon: <Home />,
                    label: "Profile",
                },
            ],
        },
    ],
};
