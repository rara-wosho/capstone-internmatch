import { cn } from "@/lib/utils";

export default function BorderBox({ children, className }) {
    return <div className={cn(className, "p-3 md:p-5")}>{children}</div>;
}
