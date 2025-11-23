"use client";

import NotificationCard from "@/components/ui/NotificationCard";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getNotificationsByUser } from "@/lib/actions/notification";
import { createClient } from "@/lib/supabase/client";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyNotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch notifications on component mount
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data, error } = await getNotificationsByUser();
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

    const handleMarkAsRead = async (notificationId) => {
        try {
            // Update in database
            const supabase = createClient();
            const { error } = await supabase
                .from("notifications")
                .update({ is_read: true })
                .eq("id", notificationId);

            if (error) throw error;

            // Update local state
            setNotifications(
                notifications.map((notif) =>
                    notif.id === notificationId
                        ? { ...notif, is_read: true }
                        : notif
                )
            );
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    const handleDelete = async (notificationId) => {
        try {
            // Delete from database
            const supabase = createClient();
            const { error } = await supabase
                .from("notifications")
                .delete()
                .eq("id", notificationId);

            if (error) throw error;

            // Update local state
            setNotifications(
                notifications.filter((notif) => notif.id !== notificationId)
            );
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const unreadCount = notifications.filter((notif) => !notif.is_read).length;

    if (loading) {
        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
                </div>
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="border rounded-lg p-4 animate-pulse"
                    >
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-full" />
                                <div className="h-3 bg-gray-200 rounded w-2/3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <SecondaryLabel>Notifications</SecondaryLabel>
                {unreadCount > 0 && (
                    <div className="bg-primary text-primary-foreground px-2 rounded-full">
                        {unreadCount} unread
                    </div>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No notifications</p>
                    <p className="text-sm mt-1">You're all caught up!</p>
                </div>
            ) : (
                notifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </div>
    );
}
