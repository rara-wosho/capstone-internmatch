import { BookOpen, Calendar, Info, Pencil, Users2 } from "lucide-react";
import TertiaryLabel from "../ui/TertiaryLabel";
import BorderBox from "../ui/BorderBox";
import { dateFormatter } from "@/utils/date-formatter";
import EditGroupModal from "../forms/EditGroupModal";
import { Button } from "../ui/button";
import DeleteGroupModal from "../modals/DeleteGroupModal";

export default function AboutGroup({ data, memberCount }) {
    return (
        <BorderBox className="border rounded-xl bg-card">
            <div className="flex items-center mb-3">
                <TertiaryLabel>
                    <BookOpen size={17} /> About
                </TertiaryLabel>
                <div className="ms-auto">
                    <EditGroupModal group={data} />
                </div>
            </div>

            <p className="text-sm italic text-muted-foreground mb-3">
                {data?.group_description
                    ? data.group_description
                    : "No description provided."}
            </p>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Users2 size={14} /> {memberCount} Member
                {memberCount > 1 && "s"}
            </p>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Calendar size={14} />
                {dateFormatter(data?.created_at)}
            </p>

            <div className="mt-4">
                {memberCount > 0 ? (
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Info size={15} />
                        You can only delete a group when it has no members.
                    </div>
                ) : (
                    <DeleteGroupModal id={data?.id} />
                )}
            </div>
        </BorderBox>
    );
}
