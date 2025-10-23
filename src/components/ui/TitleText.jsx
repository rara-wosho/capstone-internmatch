import { cn } from "@/lib/utils";

export default function TitleText({ children, className }) {
    return <h1 className={cn("font-medium", className)}>{children}</h1>;
}
