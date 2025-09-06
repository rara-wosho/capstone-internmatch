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

    const {
        data: { session },
    } = await db.auth.getSession();

    let studentQuery = db
        .from("students")
        .select(
            `id, firstname,lastname, email,course, gender, age, groups(ojt_instructor_id, group_name)`
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
            <div className="flex items-center mb-4 flex-wrap gap-y-3 gap-x-14">
                <div>
                    <SecondaryLabel>Students</SecondaryLabel>
                    <p className="text-sm text-muted-foreground">
                        A list of all students in your groups
                    </p>
                </div>
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
                    <StudentsTable students={students} />
                ) : (
                    <p className="text-center text-muted-foreground py-8">
                        {search
                            ? "No matching students found."
                            : "No students available."}
                    </p>
                )}
            </div>
        </div>
    );
}
