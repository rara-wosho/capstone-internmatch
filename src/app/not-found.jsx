import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center">
            <Image
                src="/images/404-image.png"
                alt="not found"
                width={200}
                height={200}
            />

            <SecondaryLabel className=" mt-2 mb-2 md:mb-3">
                Page not Found
            </SecondaryLabel>
            <p className="text-sm text-center text-muted-foreground px-12">
                We cannot find the page you were looking for.
            </p>
        </div>
    );
}
