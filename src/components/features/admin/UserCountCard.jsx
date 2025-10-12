import IconWrapper from "@/components/ui/IconWrapper";
import { cn } from "@/lib/utils";

export default function UserCountCard({ className, role, count, icon }) {
    return (
        <div className={cn("rounded-xl p-4 flex flex-col gap-y-2", className)}>
            <div className="flex items-center gap-2">
                <IconWrapper>{icon}</IconWrapper>
                {role}
            </div>

            <p className="text-xl font-semibold">{count}</p>
        </div>
    );
}
