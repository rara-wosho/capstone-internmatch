import SearchStudent from "@/components/forms/SearchStudent";
import StudentsTable from "@/components/tables/StudentsTable";
import SecondaryLabel from "@/components/ui/SecondaryLabel";

export default function Page() {
    return (
        <div>
            <div className="flex items-center mb-4">
                <div className="">
                    <SecondaryLabel>Students</SecondaryLabel>
                    <p className="text-sm text-muted-foreground">
                        A list of all students in your groups
                    </p>
                </div>
            </div>

            <div className="">
                <div className="mb-4">
                    <SearchStudent />
                </div>
                <StudentsTable />
            </div>
        </div>
    );
}
