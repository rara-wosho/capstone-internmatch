// Simpler version that only compares dates (ignores time)
export function getScheduleStatus(date, time) {
    if (!date) return "unknown";

    const now = new Date();
    const scheduleDate = new Date(date);

    // Normalize both dates to start of day for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const scheduleDay = new Date(
        scheduleDate.getFullYear(),
        scheduleDate.getMonth(),
        scheduleDate.getDate()
    );

    if (scheduleDay < today) {
        return "past";
    } else if (scheduleDay.getTime() === today.getTime()) {
        return "today";
    } else {
        return "upcoming";
    }
}
