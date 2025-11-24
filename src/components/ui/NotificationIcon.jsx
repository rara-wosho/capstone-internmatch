// components/layout/Header.jsx
"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import IconWrapper from "./IconWrapper";

export default function NotificationIcon({ role }) {
    const { unreadCount, loading } = useNotifications();

    return (
        !loading && (
            <Link href={`/${role}/notifications`}>
                <IconWrapper className="relative">
                    {unreadCount > 0 && (
                        <div className="absolute -right-[4px] -top-[4px] size-4 flex items-center justify-center rounded-full bg-primary text-[10px] tabular-nums text-white">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </div>
                    )}
                    <Bell size={16} />
                </IconWrapper>
            </Link>
        )
    );
}
