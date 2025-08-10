import { cn } from "@/lib/utils";

const Card = ({ children, className }) => {
    return (
        <div
            className={cn(
                className,
                "p-3 md:p-4 relative overflow-hidden isolate rounded-lg shadow-xs dark:bg-linear-to-b dark:from-card dark:to-background border dark:border-neutral-800/80"
            )}
        >
            <div className="absolute top-0 w-full left-0 h-[1px] bg-linear-to-r from-transparent via-neutral-400/20 dark:via-neutral-700 to-transparent"></div>
            {children}
        </div>
    );
};

export default Card;
