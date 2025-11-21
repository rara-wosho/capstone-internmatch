// Check if schedule is upcoming, today, or past
export function getScheduleStatus(date, time) {
    const now = new Date();
    const scheduleDateTime = new Date(`${date}T${time || "00:00"}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scheduleDate = new Date(date);
    scheduleDate.setHours(0, 0, 0, 0);

    if (scheduleDateTime < now) return "past";
    if (scheduleDate.getTime() === today.getTime()) return "today";
    return "upcoming";
}
