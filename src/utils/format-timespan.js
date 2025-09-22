// utils/formatDuration.js
export function formatTimespan(time_started, time_completed) {
    if (!time_started || !time_completed) return "";

    const start = new Date(time_started);
    const end = new Date(time_completed);
    const diffMs = end - start;

    if (isNaN(diffMs) || diffMs < 0) return "";

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0 && minutes > 0) {
        return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min`;
    }
    if (hours > 0 && minutes === 0) {
        return `${hours} hr${hours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
        return `${minutes} min`;
    }
    return `${seconds} sec`;
}
