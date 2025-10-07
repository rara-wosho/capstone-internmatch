"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
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
                <Link
                    href={nav?.href}
                    key={nav.label}
                    className={cn(
                        "py-2.5",
                        nav.href === pathname
                            ? "border-b-2 border-neutral-700 dark:border-neutral-300 text-secondary-foreground"
                            : "text-muted-foreground hover:text-secondary-foreground transition-colors"
                    )}
                >
                    {nav.label}
                </Link>
            ))}
        </div>
    );
}
