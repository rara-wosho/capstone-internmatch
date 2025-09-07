import { CircleAlert } from "lucide-react";

export default function ErrorUi({ message }) {
    return (
        <div className="bg-red-500/5 p-3 rounded-xl items-center gap-2">
            <div className="rounded-sm flex gap-2">
                <div className="text-destructive">
                    <CircleAlert />
                </div>
                <div>
                    <p className="text-destructive">
                        {message
                            ? message
                            : "Something went wrong while we fetch the data."}
                    </p>
                </div>
            </div>
        </div>
    );
}
