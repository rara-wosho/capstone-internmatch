import StudentsTable from "@/components/tables/StudentsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Search } from "lucide-react";

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
                    <div className="flex items-center gap-2 max-w-md">
                        <Input
                            icon={<Search size={16} />}
                            placeholder="Seach student"
                        />

                        <Button variant="white">Search</Button>
                    </div>
                </div>
                <StudentsTable />
            </div>
        </div>
    );
}
