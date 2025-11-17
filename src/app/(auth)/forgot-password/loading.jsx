import SpinLoader from "@/components/ui/SpinLoader";

export default function Loading() {
    return (
        <div className="min-h-[80svh] flex items-center justify-center">
            <SpinLoader />
        </div>
    );
}
