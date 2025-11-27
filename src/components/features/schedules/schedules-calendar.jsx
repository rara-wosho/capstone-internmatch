"use client";

import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

export default function SchedulesCalendar({ dates }) {
    const router = useRouter();

    const handleSelect = () => {
        if (dates.length > 0) {
            router.push("/student/schedules");
        }
    };

    return (
        <Calendar
            mode="multiple"
            selected={dates}
            onSelect={handleSelect}
            className="rounded-md w-full"
        />
    );
}
