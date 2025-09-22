import ExamCard from "@/components/exam/ExamCard";
import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/server";
import { NotepadText } from "lucide-react";

export default async function ExamsPage() {
    const supabase = await createClient();

    const { data: exams, error } = await supabase
        .from("exams")
        .select(
            "company_id, updated_at, title, description, duration, questions(id), companies(name)"
        )
        .eq("is_published", true);

    if (error) {
        return (
            <ErrorUi secondaryMessage="We're not able to fetch exams. Please check your internet connection and try again." />
        );
    }

    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <NotepadText size={17} />
                </IconWrapper>
                Available Exams
            </SecondaryLabel>

            {/* Exams Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {exams.map((exam) => (
                    <ExamCard key={exam?.title} exam={exam} />
                ))}
            </div>
        </div>
    );
}
