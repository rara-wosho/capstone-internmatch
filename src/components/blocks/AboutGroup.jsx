import { Calendar, Pencil, Users2 } from "lucide-react";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Button } from "../ui/button";

export default function AboutGroup() {
    return (
        <div className="p-3 bg-card border rounded-lg">
            <div className="flex items-center mb-3">
                <TertiaryLabel>About</TertiaryLabel>
                <div className="ms-auto">
                    <button className="hover:text-accent-foreground cursor-pointer px-1.5">
                        <Pencil size={16} />
                    </button>
                </div>
            </div>

            <p className="text-sm italic text-muted-foreground mb-3">
                No description provided.
            </p>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Users2 size={14} /> 8 Members
            </p>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Calendar size={14} />
                June 18 2025
            </p>
        </div>
    );
}
