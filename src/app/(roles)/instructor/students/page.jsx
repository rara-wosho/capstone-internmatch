import SearchField from "@/components/forms/SearchStudent";
import StudentsTable from "@/components/tables/StudentsTable";
import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Suspense } from "react";

export default function Page() {
    return (
        <div>
            <div className="flex items-center mb-4 flex-wrap gap-y-3 gap-x-14">
                <div className="">
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

            <div className="">
                <StudentsTable />
            </div>
        </div>
    );
}
