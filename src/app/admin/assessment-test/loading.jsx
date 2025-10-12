import SpinLoader from "@/components/ui/SpinLoader";

export default function Loading() {
    return (
        <div className="min-h-[calc(100svh-64px)] flex items-center justify-center">
            <SpinLoader />
        </div>
    );
}
