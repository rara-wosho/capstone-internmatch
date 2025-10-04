import SpinLoader from "@/components/ui/SpinLoader";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80svh]">
            <SpinLoader />
            <p className="text-sm text-muted-foreground mt-1">Please wait...</p>
        </div>
    );
}
