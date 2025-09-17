import { formatDuration } from "@/utils/format-duration";
import { Clock, Target, TriangleAlert } from "lucide-react";

export default function ExamReminders({ passing, duration }) {
    return (
        <div className="flex flex-col gap-2 py-3">
            <section className="flex items-start mb-3 rounded-xl bg-card gap-2">
                <Target className="mt-1 text-accent-foreground" size={14} />
                <div>
                    <p className="mb-1 text-sm font-medium">Passing Score</p>
                    <p className="text-xs text-muted-foreground">
                        {passing ? passing : "Not set"}
                    </p>
                </div>
            </section>
            <section className="flex items-start mb-3 bg-card rounded-xl gap-2">
                <TriangleAlert
                    className="mt-1 text-accent-foreground"
                    size={14}
                />
                <div>
                    <p className="mb-1 text-sm font-medium">Browser Focus</p>
                    <p className="text-xs text-muted-foreground">
                        Switching tabs or leaving the window will result in
                        immediate forfeit.
                    </p>
                </div>
            </section>
            <section className="flex items-start mb-3 bg-card rounded-xl gap-2">
                <Clock className="mt-1 text-accent-foreground" size={14} />
                <div>
                    <p className="mb-1 text-sm font-medium">Time Limit</p>
                    <p className="text-xs text-muted-foreground">
                        <span className="text-secondary-foreground font-medium">
                            {formatDuration(duration)}
                        </span>{" "}
                        to complete all questions. Auto submit when time
                        expires.
                    </p>
                </div>
            </section>
            <section className="flex items-start mb-3 bg-card rounded-xl gap-2">
                <TriangleAlert
                    className="mt-1 text-accent-foreground"
                    size={14}
                />
                <div>
                    <p className="mb-1 text-sm font-medium">Note</p>
                    <p className="text-xs text-muted-foreground">
                        Avoid refreshing the page or you will lose your
                        progress.
                    </p>
                </div>
            </section>
        </div>
    );
}
