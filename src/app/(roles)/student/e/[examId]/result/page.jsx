"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/context/SessionContext";
import { usePathname } from "next/navigation";

export default function Page() {
    const { user } = useSession();

    const pathname = usePathname();

    // get the exam id in the third array
    const pathnameArr = pathname.split("/");

    return (
        <div>
            <p>exam id: {pathnameArr[3]}</p>
            <p>user id: {user?.id}</p>
            <div className="flex flex-col gap-3">
                <Skeleton className="w-72 h-14" />
                <Skeleton className="w-80 h-6" />
                <Skeleton className="w-64 h-6" />
            </div>
        </div>
    );
}
