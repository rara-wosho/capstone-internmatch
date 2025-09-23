"use client";

import { Button } from "@/components/ui/button";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import {
    ArrowUpRight,
    Calendar,
    Clock,
    Handshake,
    Hash,
    Info,
    LayoutList,
} from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { formatDuration } from "@/utils/format-duration";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ExamReminders from "@/components/exam/ExamReminders";
import { useSession } from "@/context/SessionContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ExaminationSection({ companyExams }) {
    const { userData } = useSession();

    return (
        <>
            {/* header  */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b">
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
                            Companies may or may not require you to take an
                            examination as part of their selection process
                            before accepting you as an intern.
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {companyExams?.map((exam) => (
                        <div key={exam?.id} className="mb-7 flex flex-col">
                            <div className="mb-3">
                                <h1 className="mb-1.5 font-semibold">
                                    {exam?.title}
                                </h1>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {exam?.description
                                        ? exam?.description
                                        : "No description provided."}
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
                                    {exam?.question_count}
                                </span>
                            </p>
                            <p className="text-muted-foreground flex items-center gap-2 text-sm mb-1.5">
                                <LayoutList size={12} />
                                Question type :{" "}
                                <span className="text-secondary-foreground ">
                                    Multiple choice
                                </span>
                            </p>
                            {exam?.created_at !== exam?.updated_at ? (
                                <p className="text-muted-foreground flex items-center gap-2 text-sm mb-5">
                                    <Calendar size={12} />
                                    Updated at :{" "}
                                    <span className="text-secondary-foreground ">
                                        {dateFormatter(exam?.updated_at)}
                                    </span>
                                </p>
                            ) : (
                                <p className="text-muted-foreground flex items-center gap-2 text-sm mb-5">
                                    <Calendar size={12} />
                                    Created at :{" "}
                                    <span className="text-secondary-foreground ">
                                        {dateFormatter(exam?.created_at)}
                                    </span>
                                </p>
                            )}
                            <div className="mt-auto flex items-center mb-1">
                                <Dialog>
                                    {userData.exam_access && (
                                        <DialogTrigger
                                            asChild
                                            className="w-full"
                                        >
                                            <Button>Start examination</Button>
                                        </DialogTrigger>
                                    )}
                                    <DialogContent className="sm:max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Start Examination?
                                            </DialogTitle>
                                            <DialogDescription>
                                                Before starting the exam, make
                                                sure that you read exam rules.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <ScrollArea className="max-h-[55svh] sm:max-h-[60svh] border-t">
                                            <ExamReminders
                                                passing={exam?.passing}
                                                duration={exam?.duration}
                                                items={exam?.question_count}
                                            />

                                            <div className="p-3 rounded-xl border border-blue-500/15 bg-blue-500/5 mb-3 text-accent-foreground">
                                                <p className="font-medium text-sm mb-2 flex items-center gap-2">
                                                    <Handshake size={16} />{" "}
                                                    Honor Code Agreement
                                                </p>

                                                <p className="text-xs tracking-wider">
                                                    By starting this exam, you
                                                    agree to uphold academic
                                                    integrity and certify that:
                                                </p>

                                                <ul className="list-disc pl-3 mt-3 text-xs text-accent-foreground space-y-1 tracking-wide">
                                                    <li>
                                                        You will complete this
                                                        exam independently
                                                        without assistance
                                                    </li>
                                                    <li>
                                                        You will not use
                                                        unauthorized resources
                                                        or references
                                                    </li>
                                                    <li>
                                                        You will not share exam
                                                        questions or answers
                                                    </li>
                                                    <li>
                                                        You understand that
                                                        cheating will result in
                                                        disqualification
                                                    </li>
                                                </ul>
                                            </div>
                                        </ScrollArea>

                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button
                                                    variant="secondary"
                                                    className="sm:w-1/2"
                                                >
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button asChild>
                                                <Link
                                                    className="sm:w-1/2"
                                                    href={`/student/e/${exam?.id}`}
                                                >
                                                    I aggree and start
                                                    <ArrowUpRight />
                                                </Link>
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
