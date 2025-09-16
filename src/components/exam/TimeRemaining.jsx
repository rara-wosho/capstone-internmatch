"use client";

import { formatDuration } from "@/utils/format-duration";
import { useState, useEffect } from "react";

export default function TimeRemaining({ timeLimit }) {
    // Convert minutes → ms
    const [time, setTime] = useState(timeLimit * 60 * 1000);

    // Reset time if prop changes
    useEffect(() => {
        setTime(timeLimit * 60 * 1000);
    }, [timeLimit]);

    // Countdown interval
    useEffect(() => {
        if (time <= 0) return;

        const interval = setInterval(() => {
            setTime((prev) => (prev > 0 ? prev - 1000 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []); // run once

    // Convert ms → h:mm:ss
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000)
        .toString()
        .padStart(2, "0");

    const display =
        hours > 0
            ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`
            : `${minutes}:${seconds}`;

    return (
        <div className="rounded-xl border">
            <div className="bg-card shadow-xs rounded-x-xl rounded-t-xl flex items-center justify-center flex-col">
                <p className="text-sm mb-2 py-4">Time Remaining</p>
                <div className="w-20 rounded-full aspect-square border-2 border-primary mb-5 flex flex-col items-center justify-center">
                    <p className="text-primary-text font-semibold w-20 text-center">
                        {display}
                    </p>
                </div>
            </div>
            <div className="p-3 border-t rounded-b-xl text-sm text-muted-foreground text-center">
                Time limit : {formatDuration(timeLimit)}
            </div>
        </div>
    );
}
