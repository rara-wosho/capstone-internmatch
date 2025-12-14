import SpinLoader from "@/components/ui/SpinLoader";

export default function Loading() {
    return (
        <div className="min-h-[70svh] flex flex-col items-center justify-center gap-3">
            <SpinLoader />
            <p>Loading feedbacks</p>
        </div>
    );
}
