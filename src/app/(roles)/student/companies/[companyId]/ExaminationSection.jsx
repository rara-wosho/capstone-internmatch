import { Button } from "@/components/ui/button";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { ArrowUpRight } from "lucide-react";

export default function ExaminationSection() {
    return (
        <>
            <TertiaryLabel className="mb-2">Examination</TertiaryLabel>
            <div className="p-3 bg-slate-100 dark:bg-card rounded-sm">
                <h1 className="font-semibold mb-1">Programming Fundamentals</h1>
                <p className="text-muted-foreground mb-1">
                    Time limit :{" "}
                    <span className="text-secondary-foreground ">1hour</span>
                </p>
                <p className="text-muted-foreground mb-1">
                    Number of questions :{" "}
                    <span className="text-secondary-foreground ">50</span>
                </p>
                <p className="text-muted-foreground mb-1">
                    Question type :{" "}
                    <span className="text-secondary-foreground ">
                        Multiple choice
                    </span>
                </p>
            </div>

            <div className="mt-4 flex items-center justify-end">
                <Button>
                    Start examination <ArrowUpRight />
                </Button>
            </div>
        </>
    );
}
