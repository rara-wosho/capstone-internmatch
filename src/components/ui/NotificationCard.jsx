"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Bell,
    CheckCircle2,
    Trash2,
    MoreVertical,
    Calendar,
    User,
    FileText,
    Mail,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useNotifications } from "@/context/NotificationContext";

export default function NotificationCard({ notification }) {
    const { markAsRead, deleteNotification } = useNotifications();

    const handleMarkAsRead = () => {
        markAsRead(notification.id);
    };

    const handleDelete = () => {
        deleteNotification(notification.id);
    };

    // Format timestamp
    const formatTime = (timestamp) => {
        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffInHours = Math.floor(
            (now - notificationTime) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(
                (now - notificationTime) / (1000 * 60)
            );
            return `${diffInMinutes}m ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else {
            return notificationTime.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
    };

    return (
        <div
            className={cn(
                "p-3 transition-all duration-200 hover:shadow-md rounded-sm bg-card",
                notification.is_read ? "" : ""
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start w-full gap-3">
                    <div
                        className={cn(
                            "p-2 rounded-full mt-1",
                            notification.is_read
                                ? "bg-secondary text-foreground"
                                : "bg-primary text-white"
                        )}
                    >
                        <Bell />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3
                                className={cn(
                                    "font-semibold text-sm",
                                    notification.is_read
                                        ? "text-muted-foreground"
                                        : "text-secondary-foreground"
                                )}
                            >
                                {notification.title}
                            </h3>
                            {!notification.is_read && (
                                <div className="bg-primary rounded-full px-1 text-primary-foreground text-xs">
                                    New
                                </div>
                            )}
                        </div>
                        <p
                            className={cn(
                                "text-sm",
                                notification.is_read
                                    ? "text-muted-foreground"
                                    : "text-secondary-foreground"
                            )}
                        >
                            {notification.message}
                        </p>

                        <div className="flex items-center justify-between gap-2">
                            {notification.link_url && (
                                <Link
                                    href={notification.link_url}
                                    className="text-sm text-accent-foreground"
                                >
                                    View details
                                </Link>
                            )}

                            <div className="flex items-center gap-1 translate-x-4">
                                <span className="text-sm text-gray-500">
                                    {formatTime(notification.created_at)}
                                </span>
                                {notification.is_read && (
                                    <CheckCircle2
                                        size={14}
                                        className="text-green-500"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-60 hover:opacity-100"
                        >
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {!notification.is_read && (
                            <DropdownMenuItem
                                onClick={handleMarkAsRead}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <CheckCircle className="h-4 w-4" />
                                Mark as read
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                            onClick={handleDelete}
                            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                            Delete notification
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
