// Simpler version that only compares dates (ignores time)
export function getScheduleStatus(date) {
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

// /**
//  * Returns whether a date is past, today, or upcoming
//  * @param {Date|string} date - The date to check
//  * @returns {string} - 'past', 'today', or 'upcoming'
//  */
// export function getDateStatus(date) {
//     const inputDate = new Date(date);
//     const today = new Date();

//     // Reset times to compare only dates
//     const inputDateOnly = new Date(
//         inputDate.getFullYear(),
//         inputDate.getMonth(),
//         inputDate.getDate()
//     );
//     const todayOnly = new Date(
//         today.getFullYear(),
//         today.getMonth(),
//         today.getDate()
//     );

//     if (inputDateOnly < todayOnly) {
//         return "past";
//     } else if (inputDateOnly.getTime() === todayOnly.getTime()) {
//         return "today";
//     } else {
//         return "upcoming";
//     }
// }
