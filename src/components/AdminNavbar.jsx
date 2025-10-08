"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./ui/Logo";

const NavLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/registrations", label: "Registrations" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/feedbacks", label: "Feedbacks" },
];

export default function AdminNavbar({ user }) {
    const pathname = usePathname();

    return (
        <div className="flex gap-3 items-center relative w-full overflow-x-auto pr-14">
            <div className="border-r pr-3 flex items-center gap-2">
                <Logo className="size-5" />
                <p className="font-semibold text-lg hidden sm:inline-block">
                    InternMatch
                </p>
            </div>

            {NavLinks.map((nav) => (
                <Link
                    key={nav.label}
                    href={nav?.href}
                    className={cn(
                        "py-4 relative before:rounded-full before:transition-all before:w-full before:h-0 before:bg-muted-foreground z-10 before:absolute before:left-0 before:bottom-0",
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
