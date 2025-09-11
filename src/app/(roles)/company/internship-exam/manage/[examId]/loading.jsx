import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center gap-2">
            <Loader size={17} className="animate-spin" />{" "}
            <p>Loading exam details</p>
        </div>
    );
}
