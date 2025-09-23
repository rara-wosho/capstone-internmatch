import ExamineesTable from "@/components/tables/ExamineesTable";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import Pagination from "@/components/ui/Pagination";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Constants
const ITEMS_PER_PAGE = 10;

export default async function Page({ params, searchParams }) {
    const examId = (await params)?.examId;
    const page = Number((await searchParams)?.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    if (!examId) {
        notFound();
    }

    const supabase = await createClient();

    // Fetch paginated examinees with total count
    const {
        data: examinees,
        error,
        count,
    } = await supabase
        .from("exam_attempt")
        .select(
            "id, completed_at, exam_id, exam_title, score, started_at, status, student_id, students(firstname, lastname, avatar_url)",
            { count: "exact" }
        )
        .eq("exam_id", examId)
        .order("score", { ascending: false })
        .range(offset, offset + ITEMS_PER_PAGE - 1);

    if (error) {
        return (
            <ErrorUi
                secondaryMessage={error?.message}
                message="Something went wrong while trying to fetch examination records."
            />
        );
    }

    // Build the base query
    // let query = supabase
    //     .from("exam_attempt")
    //     .select(
    //         "id, completed_at, exam_id, exam_title, score, started_at, status, student_id, students(firstname, lastname)",
    //         { count: "exact" }
    //     )
    //     .eq("exam_id", examId);

    // // Add search filter if search query exists
    // if (searchQuery.trim()) {
    //     query = query.or(
    //         `students.firstname.ilike.%${searchQuery}%,students.lastname.ilike.%${searchQuery}%`
    //     );
    // }

    // // Execute the query with ordering and pagination
    // const {
    //     data: examinees,
    //     error,
    //     count,
    // } = await query
    //     .order("score", { ascending: false })
    //     .range(offset, offset + ITEMS_PER_PAGE - 1);

    if (error) {
        return (
            <ErrorUi
                secondaryMessage={error?.message}
                message="Something went wrong while trying to fetch examination records."
            />
        );
    }

    return (
        <div>
            {examinees.length === 0 ? (
                <div className="min-h-[60svh] flex flex-col items-center justify-center">
                    <p className="mb-3">No examinees yet.</p>
                    <Button asChild variant="outline" className="px-6">
                        <BackButton className="flex items-center gap-2">
                            <p>Go back</p>
                        </BackButton>
                    </Button>
                </div>
            ) : (
                <>
                    {/* header */}
                    <div className="flex items-center pb-5 md:pb-7 border-b mb-5 md:mb-8 mt-2 md:mt-1.5">
                        <BackButton className="hover:text-primary-text rounded-sm pe-2 transition-colors">
                            <ChevronLeft />
                        </BackButton>
                        <SecondaryLabel>
                            <span>{examinees[0]?.exam_title}</span>
                        </SecondaryLabel>
                    </div>

                    <ExamineesTable examId={examId} examinees={examinees} />
                    <Pagination
                        currentPage={page}
                        totalCount={count}
                        baseUrl={`/company/examinees/${examId}`}
                        pageSize={ITEMS_PER_PAGE}
                    />
                </>
            )}
        </div>
    );
}
