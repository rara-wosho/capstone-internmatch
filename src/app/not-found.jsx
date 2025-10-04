import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-[90svh] flex flex-col items-center justify-center">
            <Image
                src="/images/404-image.png"
                alt="not found"
                width={200}
                height={200}
            />

            <SecondaryLabel className="px-4 mt-2 mb-2 md:mb-3">
                Sorry, we can't find that page!
            </SecondaryLabel>
            <p className="text-sm text-center text-muted-foreground px-5 max-w-[300px]">
                Don't worry though, everything is STILL AWESOME!
            </p>
        </div>
    );
}
