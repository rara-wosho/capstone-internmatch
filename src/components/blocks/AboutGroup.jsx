import { BookOpen, Calendar, Pencil, Users2 } from "lucide-react";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Button } from "../ui/button";
import BorderBox from "../ui/BorderBox";
import { dateFormatter } from "@/utils/date-formatter";

export default function AboutGroup({ data }) {
    return (
        <BorderBox className="border rounded-xl bg-card">
            <div className="flex items-center mb-3">
                <TertiaryLabel>
                    <BookOpen size={17} /> About
                </TertiaryLabel>
                <div className="ms-auto">
                    <button className="hover:text-accent-foreground cursor-pointer px-1.5">
                        <Pencil size={16} />
                    </button>
                </div>
            </div>

            <p className="text-sm italic text-muted-foreground mb-3">
                {data?.group_description
                    ? data.group_description
                    : "No description provided."}
            </p>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Users2 size={14} /> 8 Members
            </p>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Calendar size={14} />
                {dateFormatter(data?.created_at)}
            </p>
        </BorderBox>
    );
}
