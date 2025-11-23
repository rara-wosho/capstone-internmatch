"use client";

import Link from "next/link";
import IconWrapper from "./IconWrapper";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { getNotificationsByUser } from "@/lib/actions/notification";

export default function NotificationIcon({ role }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch notifications on component mount
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data, error } = await getNotificationsByUser({
                    filter: "unread",
                });

                if (error) {
                    console.error("Error fetching notifications:", error);
                    return;
                }
                setNotifications(data || []);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);
    return (
        <div>
            {!loading && (
                <Link href={`/${role}/notifications`}>
                    <IconWrapper className="relative">
                        {notifications?.length > 0 && (
                            <div className="absolute -right-[2px] -top-[2px] size-2 rounded-full bg-primary"></div>
                        )}
                        <Bell size={16} />
                    </IconWrapper>
                </Link>
            )}
        </div>
    );
}
