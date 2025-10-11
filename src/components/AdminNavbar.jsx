"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./ui/Logo";

const NavLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/registrations", label: "Registrations" },
];

export default function AdminNavbar() {
    const pathname = usePathname();

    return (
        <div className="flex gap-3 items-center relative w-full h-[60px]">
            <div className="md:border-r pr-3 flex items-center gap-2">
                <Logo className="size-5" />
                <p className="font-semibold text-lg">InternMatch</p>
            </div>

            <div className="hidden md:flex gap-3">
                {NavLinks.map((nav) => (
                    <Link
                        key={nav.label}
                        href={nav?.href}
                        className={cn(
                            "relative before:rounded-full before:transition-all before:w-full before:h-0 before:bg-muted-foreground z-10 before:absolute before:left-0 before:bottom-0 whitespace-nowrap h-[60px] flex items-center",
                            nav.href === pathname
                                ? "before:h-[2px] text-secondary-foreground"
                                : "text-muted-foreground hover:text-secondary-foreground transition-colors"
                        )}
                    >
                        {nav.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
