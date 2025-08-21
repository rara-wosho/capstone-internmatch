import { Button } from "@/components/ui/button";
import GroupCard from "@/components/ui/GroupCard";

export default function Page() {
    return (
        <div>
            <div className="flex items-center justify-end">
                <Button variant="white">New Group</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
            </div>
        </div>
    );
}
