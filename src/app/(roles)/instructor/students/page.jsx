import SearchStudent from "@/components/forms/SearchStudent";
import StudentsTable from "@/components/tables/StudentsTable";
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

                <div className="ms-auto grow lg:max-w-lg">
                    <Suspense fallback={null}>
                        <SearchStudent />
                    </Suspense>
                </div>
            </div>

            <div className="">
                <StudentsTable />
            </div>
        </div>
    );
}
