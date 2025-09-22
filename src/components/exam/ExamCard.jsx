import { Building, Building2, Clock, Hash } from "lucide-react";
import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ExamCard({ exam }) {
    return (
        <BorderBox className="border rounded-xl bg-card shadow-xs flex flex-col">
            <h1 className="font-semibold mb-[2px]">{exam?.title}</h1>
            <p className="text-accent-foreground mb-3 text-sm flex items-center gap-1">
                <Building2 size={12} />
                {exam?.companies?.name}
            </p>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                {exam?.description
                    ? exam?.description
                    : "No description provided."}
            </p>
            <div className="flex items-center gap-3">
                <p className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="text-green-500" size={12} />{" "}
                    {exam?.duration} minutes
                </p>
                <p className="flex items-center gap-0.5 text-muted-foreground text-xs">
                    <Hash size={12} /> {exam?.questions?.length} Questions
                </p>
            </div>

            <div className="mt-auto w-full">
                <Button
                    className="mt-6 w-full border"
                    variant="secondary"
                    asChild
                >
                    <Link href={`/student/companies/${exam?.company_id}`}>
                        View Details
                    </Link>
                </Button>
            </div>
        </BorderBox>
    );
}
