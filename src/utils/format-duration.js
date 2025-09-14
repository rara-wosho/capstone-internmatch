export function formatDuration(minutes) {
    if (minutes <= 0) return "No time limit";

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs && mins)
        return `${hrs} hour${hrs > 1 ? "s" : ""}, ${mins} minute${
            mins > 1 ? "s" : ""
        }`;
    if (hrs) return `${hrs} hour${hrs > 1 ? "s" : ""}`;
    return `${mins} minute${mins > 1 ? "s" : ""}`;
}
