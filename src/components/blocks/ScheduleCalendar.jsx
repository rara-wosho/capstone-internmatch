"use client";

import { Calendar, CalendarDayButton } from "../ui/calendar";

export default function ScheduleCalendar({ schedules = [] }) {
    function getEventForDate(date) {
        return schedules.find(
            (sched) =>
                new Date(sched.date).getDate() === date.getDate() &&
                new Date(sched.date).getMonth() === date.getMonth() &&
                new Date(sched.date).getFullYear() === date.getFullYear()
        );
    }

    return (
        <Calendar
            mode="multiple"
            onSelect={() => {}}
            className="bg-card rounded-xl sm:[--cell-size:--spacing(14)] border w-full"
            components={{
                DayButton: ({ children, modifiers, day, ...props }) => {
                    const sched = getEventForDate(day.date);

                    return (
                        <CalendarDayButton
                            day={day}
                            modifiers={modifiers}
                            {...props}
                            className="group"
                        >
                            {children}
                            {sched?.title && (
                                <>
                                    <span className="text-xs px-1 rounded-full bg-primary text-white">
                                        {sched.title.slice(0, 5)}...
                                    </span>

                                    <div className="absolute hidden group-hover:flex group-hover:flex-col group-hover:items-start bottom-[110%] bg-muted border shadow-md z-10 text-secondary-foreground rounded-sm space-y-1 pb-2">
                                        <span className="block border-b p-2">
                                            {sched.title}
                                        </span>

                                        {sched?.students &&
                                            sched?.students?.map((s, index) => (
                                                <span
                                                    key={index}
                                                    className="block px-2 text-muted-foreground mt-2"
                                                >
                                                    {s?.firstname} {s?.lastname}
                                                </span>
                                            ))}
                                    </div>
                                </>
                            )}
                        </CalendarDayButton>
                    );
                },
            }}
        />
    );
}
