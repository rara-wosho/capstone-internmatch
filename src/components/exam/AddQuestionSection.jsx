"use client";

import React, { useState } from "react";
import BorderBox from "../ui/BorderBox";
import TertiaryLabel from "../ui/TertiaryLabel";
import AddQuestionCard from "./AddQuestionCard";
import AddQuestionAbout from "./AddQuestionAbout";

export default function AddQuestionSection() {
    const [questions, setQuestions] = useState([
        "Sample question",
        "",
        "",
        "",
        "",
        "",
    ]);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-3 gap-y-10">
            {/* questions list  */}
            <div className="flex flex-col gap-3 order-2 lg:order-1">
                {questions.map((q, index) => (
                    <AddQuestionCard key={index} />
                ))}
            </div>
            {/* right section for settings and total question ui  */}
            <div className="flex flex-col gap-3 order-1 lg:order-2">
                <AddQuestionAbout />

                <BorderBox className="border rounded-xl bg-card shadow-xs">
                    <TertiaryLabel className="mb-3">
                        Total questions
                    </TertiaryLabel>
                    <div className="flex gap-2 flex-wrap">
                        {questions.map((q, index) => (
                            <div
                                key={index}
                                className="size-8 rounded-sm border flex items-center justify-center bg-card"
                            >
                                <p className="text-sm text-secondary-foreground">
                                    {index + 1}
                                </p>
                            </div>
                        ))}
                    </div>
                </BorderBox>
            </div>
        </div>
    );
}
