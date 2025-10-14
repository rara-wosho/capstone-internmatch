import IconWrapper from "@/components/ui/IconWrapper";
import { cn } from "@/lib/utils";

export default function UserCountCard({ className, role, count, icon }) {
    return (
        <div
            className={cn(
                "rounded-xl p-4 flex flex-col gap-y-2 shadow-xs relative overflow-hidden grow shrink-0 basis-[200px]",
                className
            )}
        >
            <div className="absolute scale-[300%] opacity-10 dark:opacity-5 text-neutral-400 dark:text-neutral-300 bottom-2 right-8">
                {icon}
            </div>
            <div className="flex flex-col gap-2 z-10">
                <div className="rounded-full bg-secondary dark:bg-neutral-100 text-neutral-800 shadow-xs size-9 flex items-center justify-center">
                    {icon}
                </div>
                {role}
            </div>

            <p className="text-xl md:text-2xl font-bold">{count}</p>
        </div>
    );
}
