import SpinLoader from "@/components/ui/SpinLoader";

export default function Loading() {
    return (
        <div className="min-h-[90svh] flex flex-col items-center justify-center gap-2">
            <SpinLoader />
        </div>
    );
}
