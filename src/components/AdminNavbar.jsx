"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/registrations", label: "Registrations" },
    { href: "/admin/users", label: "Users" },
];

export default function AdminNavbar() {
    const pathname = usePathname();

    return (
        <div className="flex gap-3 items-center">
            {NavLinks.map((nav) => (
                <Link
                    key={nav.label}
                    href={nav?.href}
                    className={cn(
                        "py-2.5 relative before:rounded-full before:transition-all before:w-full before:h-0 before:bg-secondary-foreground z-10 before:absolute before:left-0 before:bottom-0",
                        nav.href === pathname
                            ? "before:h-[2px] text-secondary-foreground"
                            : "text-muted-foreground hover:text-secondary-foreground transition-colors"
                    )}
                >
                    {nav.label}
                </Link>
            ))}
        </div>
    );
}
