"use client";
import { useEffect, useState } from "react";
import { formatDuration } from "@/utils/format-duration";

export default function TimeRemaining({
    examId,
    userId,
    durationMinutes,
    onExpire,
}) {
    const [deadline, setDeadline] = useState(null);
    const [remainingMs, setRemainingMs] = useState(null);

    // Initialize start time & deadline
    useEffect(() => {
        if (!examId || !userId) return;

        const key = `exam_${examId}_${userId}_start`;
        const stored = localStorage.getItem(key);

        const startedAt = stored ? new Date(stored) : new Date();
        if (!stored) localStorage.setItem(key, startedAt.toISOString());

        const end = new Date(startedAt.getTime() + durationMinutes * 60 * 1000);
        setDeadline(end);
    }, [examId, userId, durationMinutes]);

    // Countdown only
    useEffect(() => {
        if (!deadline) return;

        const tick = () => {
            const diff = deadline - new Date();
            setRemainingMs(diff);
            if (diff <= 0) {
                clearInterval(timer);
                onExpire?.();
            }
        };

        const timer = setInterval(tick, 1000);
        tick();
        return () => clearInterval(timer);
    }, [deadline, onExpire]);

    if (!deadline) return null;

    const totalSeconds = Math.max(Math.floor((remainingMs ?? 0) / 1000), 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime =
        hours > 0
            ? `${hours.toString().padStart(2, "0")}:${minutes
                  .toString()
                  .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            : `${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`;

    return (
        <div className="rounded-xl border shadow-xs">
            <div className="bg-card flex items-center py-5 px-4 rounded-t-xl flex-col justify-center">
                <p className="mb-4 text-sm">Remaining time</p>
                <div className="p-3 text-center flex items-center justify-center rounded-full border-2 border-primary w-[100px] aspect-square">
                    <p className="text-primary-text">{formattedTime}</p>
                </div>
            </div>
            <div className="p-3 text-center text-sm text-muted-foreground">
                Time Limit: {formatDuration(durationMinutes)}
            </div>
        </div>
    );
}
