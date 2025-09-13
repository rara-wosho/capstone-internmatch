import { createClient } from "@/lib/supabase/server";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export default function ManageExamCard({ examData }) {
    return (
        <div className="bg-card rounded-xl border shadow-xs">
            <Link href={`/company/internship-exam/manage/${examData?.id}`}>
                <div className="p-3 md:p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <p>{examData?.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {dateFormatter(examData?.created_at)}
                    </p>
                </div>
                <div className="p-3 md:p-4 border-t">
                    <Suspense fallback={<Skeleton className="h-3.5 w-20" />}>
                        <GetQuestionCount id={examData?.id} />
                    </Suspense>
                </div>
            </Link>
        </div>
    );
}

const GetQuestionCount = async ({ id }) => {
    const supabase = await createClient();

    const { count, error } = await supabase
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("exam_id", id);

    if (error) {
        return (
            <p className="text-xs text-muted-foreground">Error loading count</p>
        );
    }

    return (
        <p className="text-xs text-muted-foreground">
            {count} question{count > 1 && "s"}
        </p>
    );
};
