import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";
import DeleteExamModal from "./DeleteExamModal";

export default function ManageExamCard({ examData }) {
    return (
        <div className="bg-card rounded-xl border-b">
            <Link href={`/company/internship-exam/manage/${examData?.id}`}>
                <div className="p-3 md:p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <p>{examData?.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {dateFormatter(examData?.created_at)}
                    </p>
                </div>
            </Link>
            <div className="p-3 md:p-4 border-t flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {examData?.questions?.length} questions
                </p>
                <div>
                    <DeleteExamModal examId={examData?.id} type="icon" />
                </div>
            </div>
        </div>
    );
}
