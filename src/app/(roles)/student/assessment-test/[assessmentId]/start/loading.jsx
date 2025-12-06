import SpinLoader from "@/components/ui/SpinLoader";

export default function Loading() {
    return (
        <div className="min-h-[60svh] flex flex-col items-center justify-center">
            <SpinLoader />
            <p className="text-center text-muted-foreground mt-2">
                Starting the test
            </p>
        </div>
    );
}
