import { formatDuration } from "@/utils/format-duration";
import { Clock, File, FileText, Target, TriangleAlert } from "lucide-react";

export default function ExamReminders({ passing, duration, items }) {
    return (
        <div className="flex flex-col gap-3 py-3 sm:py-5">
            <div className="rounded-lg bg-slate-100/50 dark:bg-slate-500/5 p-3">
                <p className="mb-2 text-sm font-medium flex items-center gap-2">
                    <FileText className="text-accent-foreground" size={15} />{" "}
                    Exam Format
                </p>
                <ul className="list-disc pl-3 text-sm text-muted-foreground space-y-1 tracking-wide">
                    <li>{items} multiple-choice questions.</li>
                    <li>One correct answer per question.</li>
                    <li>Can review and change answers.</li>
                </ul>
            </div>
            <div className="rounded-lg bg-slate-100/50 dark:bg-slate-500/5 p-3">
                <p className="mb-2 text-sm font-medium flex items-center gap-2">
                    <Target className="text-accent-foreground" size={15} />{" "}
                    Passing Requirements
                </p>
                <ul className="list-disc pl-3 text-sm text-muted-foreground space-y-1 tracking-wide">
                    <li>{passing ? passing : "No minimum score required"}</li>
                </ul>
            </div>
            <div className="rounded-lg bg-slate-100/50 dark:bg-slate-500/5 p-3">
                <p className="mb-2 text-sm font-medium flex items-center gap-2">
                    <Clock className="text-accent-foreground" size={15} /> Time
                    Limit
                </p>
                <ul className="list-disc pl-3 text-sm text-muted-foreground space-y-1 tracking-wide">
                    <li>
                        <span className="text-secondary-foreground font-medium">
                            {formatDuration(duration)}
                        </span>{" "}
                        to complete all questions.
                    </li>
                    <li>Auto submit when time expires.</li>
                </ul>
            </div>
            <div className="rounded-lg bg-slate-100/50 dark:bg-slate-500/5 p-3">
                <p className="mb-2 text-sm font-medium flex items-center gap-2">
                    <TriangleAlert
                        className="text-accent-foreground"
                        size={15}
                    />{" "}
                    Important Rules
                </p>
                <ul className="list-disc pl-3 text-sm text-muted-foreground space-y-1 tracking-wide">
                    <li>
                        Avoid refreshing the page or you will lose your
                        progress.
                    </li>

                    <li>Ensure stable internet connection before starting.</li>
                </ul>
            </div>
        </div>
    );
}
