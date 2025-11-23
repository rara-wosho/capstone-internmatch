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
                        <div className="absolute -right-[2px] -top-[2px] size-2 rounded-full bg-primary"></div>
                    )}
                    <Bell size={16} />
                </IconWrapper>
            </Link>
        )
    );
}
