import { CircleAlert } from "lucide-react";

export default function ErrorUi({ message, secondaryMessage }) {
    return (
        <div className="bg-red-800/5 p-3 rounded-xl items-center gap-2 border dark:border-red-400/20 border-red-600/20">
            <div className="rounded-sm flex gap-3 text-red-600 dark:text-red-400/90">
                <div className="pt-1">
                    <CircleAlert />
                </div>
                <div>
                    <p>
                        {message
                            ? message
                            : "Something went wrong while we fetch the data."}
                    </p>
                    <p className="text-xs font-light tracking-wider mt-1">
                        {secondaryMessage && secondaryMessage}
                    </p>
                </div>
            </div>
        </div>
    );
}
