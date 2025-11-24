// contexts/NotificationContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    getNotificationCount,
    getNotificationsByUser,
} from "@/lib/actions/notification";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch unread count (for header indicator)
    const fetchUnreadCount = async () => {
        try {
            const { count, error } = await getNotificationCount("unread");
            if (error) throw error;
            setUnreadCount(count);
        } catch (error) {
            console.error("Error fetching unread count:", error);
        }
    };

    // Fetch all notifications
    const fetchAllNotifications = async () => {
        try {
            // setLoading(true);
            const { data, error } = await getNotificationsByUser({
                filter: "all",
            });
            if (error) throw error;
            setNotifications(data || []);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    // Refresh both count and notifications
    const refreshAll = async () => {
        await Promise.all([fetchUnreadCount(), fetchAllNotifications()]);
    };

    // Mark notification as read
    const markAsRead = async (notificationId) => {
        try {
            const supabase = createClient();
            const { error } = await supabase
                .from("notifications")
                .update({ is_read: true })
                .eq("id", notificationId);

            if (error) throw error;

            // Note: Real-time will handle the update, but we do optimistic update for better UX
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === notificationId
                        ? { ...notif, is_read: true }
                        : notif
                )
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));

            return { success: true };
        } catch (error) {
            console.error("Error marking as read:", error);
            return { error: error.message };
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        try {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return { error: "User not found" };

            const { error } = await supabase
                .from("notifications")
                .update({ is_read: true })
                .eq("recipient_id", user.id)
                .eq("is_read", false);

            if (error) throw error;

            // Real-time will handle updates, but optimistic update for better UX
            setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, is_read: true }))
            );
            setUnreadCount(0);

            return { success: true };
        } catch (error) {
            console.error("Error marking all as read:", error);
            return { error: error.message };
        }
    };

    // Delete notification
    const deleteNotification = async (notificationId) => {
        try {
            const supabase = createClient();
            const notificationToDelete = notifications.find(
                (n) => n.id === notificationId
            );

            const { error } = await supabase
                .from("notifications")
                .delete()
                .eq("id", notificationId);

            if (error) throw error;

            // Real-time will handle updates, but optimistic update for better UX
            setNotifications((prev) =>
                prev.filter((notif) => notif.id !== notificationId)
            );

            if (notificationToDelete && !notificationToDelete.is_read) {
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }

            return { success: true };
        } catch (error) {
            console.error("Error deleting notification:", error);
            return { error: error.message };
        }
    };

    // Manual refresh function
    const refreshNotifications = async () => {
        await refreshAll();
    };

    // Set up real-time subscription
    useEffect(() => {
        const supabase = createClient();

        // Subscribe to notifications table changes
        const subscription = supabase
            .channel("notifications-changes")
            .on(
                "postgres_changes",
                {
                    event: "*", // INSERT, UPDATE, DELETE
                    schema: "public",
                    table: "notifications",
                },
                (payload) => {
                    console.log("Real-time notification update:", payload);

                    // Refresh data when notifications change
                    refreshAll();
                }
            )
            .subscribe();

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Initial data fetch
    useEffect(() => {
        refreshAll();
    }, []);

    const value = {
        // State
        unreadCount,
        notifications,
        loading,

        // Data fetching
        refreshNotifications,

        // Actions
        markAsRead,
        markAllAsRead,
        deleteNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotifications must be used within a NotificationProvider"
        );
    }
    return context;
};
