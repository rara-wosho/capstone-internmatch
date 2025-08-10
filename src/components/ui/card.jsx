import { cn } from "@/lib/utils";

const Card = ({ children, className }) => {
    return (
        <div
            className={cn(
                className,
                "p-3 md:p-4 relative overflow-hidden isolate rounded-md bg-white shadow-xs dark:bg-linear-to-b dark:from-card dark:to-background border dark:border-neutral-800/80"
            )}
        >
            {/* <div className="absolute -z-10 -right-[12rem] -bottom-8 w-[90%] aspect-square rounded-full bg-accent/50"></div> */}
            {children}
        </div>
    );
};

export default Card;
