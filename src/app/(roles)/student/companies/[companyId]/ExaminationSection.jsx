import { Button } from "@/components/ui/button";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { ArrowUpRight, Clock, Hash, Info, LayoutList } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function ExaminationSection() {
    return (
        <>
            <div className="flex items-center justify-between mb-3">
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
            <div className="mb-7 border-t pt-5">
                <div className="mb-3">
                    <h1 className="mb-1">Programming Fundamentals</h1>
                    <p className="text-sm text-muted-foreground mb-4">
                        Lorem ipsum dolor sit amet consectetur.
                    </p>
                </div>
                <p className="text-muted-foreground flex items-center gap-2 text-sm mb-1">
                    <Clock size={12} />
                    Time limit :{" "}
                    <span className="text-secondary-foreground ">1hour</span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 text-sm mb-1">
                    <Hash size={13} />
                    Number of questions :{" "}
                    <span className="text-secondary-foreground ">50</span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <LayoutList size={12} />
                    Question type :{" "}
                    <span className="text-secondary-foreground ">
                        Multiple choice
                    </span>
                </p>
                <div className="mt-8 flex items-center mb-1">
                    <Button className="w-full">
                        Start examination <ArrowUpRight />
                    </Button>
                </div>
            </div>
            <div className="mb-7 border-t pt-5">
                <div className="mb-3">
                    <h1 className="mb-1">Networking guru</h1>
                    <p className="text-sm text-muted-foreground mb-4">
                        Lorem ipsum dolor sit amet consectetur.
                    </p>
                </div>
                <p className="text-muted-foreground flex items-center gap-2 text-sm mb-1">
                    <Clock size={12} />
                    Time limit :{" "}
                    <span className="text-secondary-foreground ">
                        1 1/2 hour
                    </span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 text-sm mb-1">
                    <Hash size={13} />
                    Number of questions :{" "}
                    <span className="text-secondary-foreground ">50</span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <LayoutList size={12} />
                    Question type :{" "}
                    <span className="text-secondary-foreground ">
                        Multiple choice
                    </span>
                </p>
                <div className="mt-8 flex items-center mb-1">
                    <Button className="w-full">
                        Start examination <ArrowUpRight />
                    </Button>
                </div>
            </div>
        </>
    );
}
