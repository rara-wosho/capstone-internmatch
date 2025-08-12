import { cn } from "@/lib/utils";
import Image from "next/image";

export default function WhiteLogo({ className, containerStyle }) {
    return (
        <div
            className={cn(
                "rounded-full flex items-center justify-center",
                containerStyle
            )}
        >
            <div className={cn("relative", className)}>
                <Image
                    src="/white-logo.png"
                    fill
                    className="object-contain"
                    alt="officiail-logo"
                />
            </div>
        </div>
    );
}
