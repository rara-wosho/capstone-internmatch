import { Button } from "@/components/ui/button";
import GroupCard from "@/components/ui/GroupCard";

export default function Page() {
    return (
        <div>
            <Button variant="white">New Group</Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
            </div>
        </div>
    );
}
