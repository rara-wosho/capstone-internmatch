"use client";

import { useState } from "react";
import BorderBox from "../ui/BorderBox";

export default function QuestionSection() {
    const [choices, setChoices] = useState([
        {
            letter: "a",
            text: "Letter a choice",
        },
        {
            letter: "b",
            text: "Letter a choice",
        },
        {
            letter: "c",
            text: "Letter a choice",
        },
    ]);
    return (
        <BorderBox className="border bg-card rounded-xl">
            <p className="mb-2 text-sm text-muted-foreground">Question 1</p>

            <div className="text-secondary-foreground mb-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </div>

            <div className="flex flex-col gap-3.5">
                {choices.map((c, index) => (
                    <div
                        key={index}
                        className="p-3 flex items-center border rounded-sm gap-3"
                    >
                        <p>{c.letter}</p>
                        <p>{c.text}</p>
                    </div>
                ))}
            </div>
        </BorderBox>
    );
}
