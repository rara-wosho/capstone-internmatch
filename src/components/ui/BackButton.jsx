"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function BackButton({ children, className }) {
    const router = useRouter();
    return (
        <button
            className={cn(className, "cursor-pointer")}
            onClick={() => router.back()}
        >
            {children}
        </button>
    );
}
