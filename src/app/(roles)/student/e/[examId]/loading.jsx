import SpinLoader from "@/components/ui/SpinLoader";

export default function Loading() {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center gap-3">
            <SpinLoader />
            <p className="text-center">Starting Examination</p>
        </div>
    );
}
