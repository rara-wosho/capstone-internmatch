"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavLinks = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/registrations", label: "Registrations" },
    { href: "/admin/insights", label: "Insights" },
    { href: "/admin/users", label: "Users" },
];

export default function AdminNavbar() {
    const pathname = usePathname();

    console.log(pathname);

    return (
        <div className="flex gap-2 items-center">
            {NavLinks.map((nav) => (
                <div
                    key={nav.label}
                    className={cn(
                        "py-2.5",
                        nav.href === pathname
                            ? "border-b-2 border-neutral-700 dark:border-neutral-300 text-secondary-foreground"
                            : "text-muted-foreground"
                    )}
                >
                    {nav.label}
                </div>
            ))}
        </div>
    );
}
