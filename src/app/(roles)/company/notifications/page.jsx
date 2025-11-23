// app/notifications/page.jsx
"use client";

import { StudentApplicationSubmitted } from "@/components/email/StudentApplicationSubmitted";
import { Button } from "@/components/ui/button";
import NotificationCard from "@/components/ui/NotificationCard";
import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "@/components/Wrapper";
import { useNotifications } from "@/context/NotificationContext";
import { CheckCircle2, Bell } from "lucide-react";

export default function NotificationsPage() {
    const { notifications, loading, unreadCount, markAllAsRead } =
        useNotifications();

    if (loading) {
        return (
            <Wrapper size="sm">
                <div className="space-y-3">
                    <Skeleton className="h-8 rounded-sm w-1/4"></Skeleton>
                    {[...Array(5)].map((_, i) => (
                        <Skeleton
                            className="h-24 rounded-sm"
                            key={i}
                        ></Skeleton>
                    ))}
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper size="sm">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <p className="text-muted-foreground">
                        {unreadCount > 0
                            ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                            : "All caught up!"}
                    </p>
                </div>

                {unreadCount > 0 && (
                    <Button
                        onClick={markAllAsRead}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Mark all as read
                    </Button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-12">
                    <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                        No notifications
                    </h3>
                    <p className="text-muted-foreground">
                        You're all caught up! Check back later for new
                        notifications.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                        />
                    ))}
                </div>
            )}
        </Wrapper>
    );
}
