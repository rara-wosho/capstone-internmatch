import { Button } from "@/components/ui/button";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import {
    ArrowUpRight,
    Calendar,
    Clock,
    Hash,
    Info,
    LayoutList,
    ListOrdered,
} from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { formatDuration } from "@/utils/format-duration";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExaminationSection({ companyExams }) {
    return (
        <>
            {/* header  */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b">
                <TertiaryLabel>Examination</TertiaryLabel>
                <Popover>
                    <PopoverTrigger className="cursor-pointer">
                        <Info size={18} />
                    </PopoverTrigger>
                    <PopoverContent
                        className="p-2 rounded"
                        side="left"
                        align="start"
                        sideOffset={10}
                    >
                        <p className="text-xs">
                            Companies may require you to take an examination as
                            part of their selection process before accepting you
                            as an intern.
                        </p>
                    </PopoverContent>
                </Popover>
            </div>

            {/* exams contents  */}
            {companyExams.length === 0 ? (
                <div>
                    <p className="text-sm text-muted-foreground italic">
                        No examinations posted.
                    </p>
                </div>
            ) : (
                companyExams?.map((exam) => (
                    <div key={exam?.id} className="mb-7">
                        <div className="mb-3">
                            <h1 className="mb-1 font-semibold">
                                {exam?.title}
                            </h1>
                            <p className="text-sm text-muted-foreground mb-4">
                                {exam?.description}
                            </p>
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2 text-sm mb-1.5">
                            <Clock size={12} />
                            Time limit :{" "}
                            <span className="text-secondary-foreground ">
                                {formatDuration(exam?.duration)}
                            </span>
                        </p>
                        <p className="text-muted-foreground flex items-center gap-2 text-sm mb-1.5">
                            <Hash size={12} />
                            Total questions :{" "}
                            <span className="text-secondary-foreground ">
                                {exam?.questions[0]?.count}
                            </span>
                        </p>
                        <p className="text-muted-foreground flex items-center gap-2 text-sm mb-1.5">
                            <LayoutList size={12} />
                            Question type :{" "}
                            <span className="text-secondary-foreground ">
                                Multiple choice
                            </span>
                        </p>
                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                            <Calendar size={12} />
                            Created at :{" "}
                            <span className="text-secondary-foreground ">
                                {dateFormatter(exam?.created_at)}
                            </span>
                        </p>
                        <div className="mt-6 flex items-center mb-1">
                            <Button className="w-full" asChild>
                                <Link href="/student/e">
                                    Start examination <ArrowUpRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
