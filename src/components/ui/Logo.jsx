import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className, containerStyle }) {
    return (
        <div
            className={cn(
                "rounded-full flex items-center justify-center",
                containerStyle
            )}
        >
            <div className={cn("relative", className)}>
                <Image
                    src="/logo.png"
                    fill
                    className="object-contain"
                    alt="officiail-logo"
                    sizes="100%"
                />
            </div>
        </div>
    );
}
