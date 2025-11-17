import SearchField from "@/components/forms/SearchStudent";
import StudentsTable from "@/components/tables/StudentsTable";
import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Suspense } from "react";
import ErrorUi from "@/components/ui/ErrorUi";
import { createClient } from "@/lib/supabase/server";

export default async function Page({ searchParams }) {
    const db = await createClient();

    // ✅ get search query
    const search = (await searchParams)?.search_query || "";

    // ✅ get status filter query
    const initialFilter = (await searchParams)?.status_filter || "all";

    // get current user
    const {
        data: { session },
    } = await db.auth.getSession();

    let studentQuery = db
        .from("students")
        .select(
            `id, firstname,lastname,avatar_url, exam_access, email,course, gender, age, is_active, groups!inner(ojt_instructor_id, group_name, id)`
        )
        .order("created_at", { ascending: false });

    // ✅ ensure student belongs to groups owned by current instructor
    studentQuery = studentQuery.eq("groups.ojt_instructor_id", session.user.id);

    // ✅ apply filter if searching
    if (search) {
        studentQuery = studentQuery.or(
            `firstname.ilike.%${search}%,lastname.ilike.%${search}%,email.ilike.%${search}%`
        );
    }

    const { data: students, error } = await studentQuery;

    if (error) {
        return (
            <ErrorUi message="Something went wrong while fetching students." />
        );
    }

    return (
        <div>
            <div className="mb-4">
                <SecondaryLabel>Students</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    A list of all students in your groups
                </p>
            </div>

            <BorderBox className="border rounded-xl bg-card mb-3">
                <div className="ms-auto grow">
                    <Suspense fallback={null}>
                        <SearchField
                            actionPath="/instructor/students"
                            placeholder="Search student, group, etc."
                        />
                    </Suspense>
                </div>
            </BorderBox>

            <div>
                {students.length > 0 ? (
                    <StudentsTable
                        initialFilter={initialFilter}
                        students={students}
                    />
                ) : (
                    <div className="flex justify-center py-3 text-muted-foreground">
                        {search
                            ? `No result found for "${search}"`
                            : "No data available yet."}
                    </div>
                )}
            </div>
        </div>
    );
}
