import { BookOpen, Pen, Settings, Trash } from "lucide-react";
import BorderBox from "../ui/BorderBox";
import FormLabel from "../ui/FormLabel";
import { Switch } from "../ui/switch";
import TertiaryLabel from "../ui/TertiaryLabel";
import AboutExamModal from "./AboutExamModal";
import DeleteExamModal from "./DeleteExamModal";
import { Button } from "../ui/button";
import { formatDuration } from "@/utils/format-duration";
import { dateFormatter } from "@/utils/date-formatter";

export default function AddQuestionAbout({ exam }) {
    return (
        <>
            <div className="flex items-center mb-3">
                <TertiaryLabel>
                    <BookOpen size={18} className="text-sky-600" /> About
                </TertiaryLabel>
            </div>
            <div className="flex flex-col">
                <div className="mb-4">
                    <h3 className="mb-1 text-sm">Description</h3>
                    <p className="text-sm text-muted-foreground">
                        {exam?.description
                            ? exam?.description
                            : "No description provided"}
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="mb-1 text-sm">Instruction</h3>
                    <p className="text-sm text-muted-foreground">
                        {exam?.instruction
                            ? exam?.instruction
                            : "No instruction provided"}
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="mb-1 text-sm">Date created</h3>
                    <p className="text-sm text-muted-foreground">
                        {dateFormatter(exam?.created_at)}
                    </p>
                </div>

                {exam?.updated_at !== exam?.created_at && (
                    <div className="mb-4">
                        <h3 className="mb-1 text-sm">Updated at</h3>
                        <p className="text-sm text-muted-foreground">
                            {dateFormatter(exam?.updated_at, true)}
                        </p>
                    </div>
                )}
            </div>

            <div className="border-t mt-4 pt-5 mb-4">
                <TertiaryLabel className="mb-3">
                    <Settings size={18} className="text-green-600" /> Settings
                </TertiaryLabel>
                <div className="flex justify-between items-center mb-2">
                    <FormLabel>Published</FormLabel>
                    <Switch checked={exam?.is_published} disabled />
                </div>
                <div className="flex justify-between items-center mb-2">
                    <FormLabel>Shuffle questions</FormLabel>
                    <Switch checked={exam?.shuffle_questions} disabled />
                </div>
                <div className="flex justify-between items-center mb-2">
                    <FormLabel>Exam duration</FormLabel>
                    <p className="text-sm text-muted-foreground">
                        {formatDuration(exam?.duration)}
                    </p>
                </div>
            </div>

            <DeleteExamModal examId={exam.id} type="button" />
        </>
    );
}
