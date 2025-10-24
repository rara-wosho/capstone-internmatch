import SpinLoader from "@/components/ui/SpinLoader";

export default function StudentDashboardLoading() {
    return (
        <div className="min-h-[calc(100svh-100px)] flex flex-col items-center justify-center">
            <SpinLoader />
        </div>
    );
}
