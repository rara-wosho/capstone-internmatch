import SpinLoader from "@/components/ui/SpinLoader";

export default function Loading() {
    return (
        <div className="min-h-[70svh] flex-col flex items-center justify-center">
            <SpinLoader />
            <p className="mt-2 text-center text-sm text-muted-foreground">
                Loading groups
            </p>
        </div>
    );
}
