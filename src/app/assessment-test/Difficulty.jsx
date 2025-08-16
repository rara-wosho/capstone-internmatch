"use client";
import BackButton from "@/components/ui/BackButton";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

export default function Difficulty() {
    const [difficulty, setDifficulty] = useState("medium");

    return (
        <>
            <TertiaryLabel className="mt-10 border-t pt-7 mb-2">
                Choose Difficulty
            </TertiaryLabel>

            <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value)}
                className="w-full"
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose difficulty level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
            </Select>

            <div className="mt-8 flex flex-col items-center md:items-start">
                <TertiaryLabel className="mb-3">
                    Ready to take the test now? Click start test
                </TertiaryLabel>

                <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-lg gap-2">
                    <Button
                        asChild
                        variant="secondary"
                        className="order-2 sm:order-1"
                    >
                        <BackButton>Maybe Later</BackButton>
                    </Button>
                    <Button className="order-1 sm:order-2" asChild>
                        {/* embedded page number and difficulty level  */}
                        <Link
                            href={`/assessment-test/start?p=1&d=${difficulty}`}
                        >
                            Start Test
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
