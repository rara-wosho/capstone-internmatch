import ExamineesList from "@/components/blocks/ExamineesList";
import ExamsList from "@/components/blocks/ExamsList";

export default function Page() {
    return (
        <>
            <div className="hidden lg:grid grid-cols-[280px_1fr] gap-3">
                <ExamsList />
                <ExamineesList />
            </div>

            <div className="block lg:hidden">
                <ExamsList />
            </div>
        </>
    );
}
