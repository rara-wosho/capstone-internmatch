"use client";
import { X } from "lucide-react";
import BorderBox from "../ui/BorderBox";
import TertiaryLabel from "../ui/TertiaryLabel";
import { useState } from "react";

export default function AddQuestionCard() {
    const [choices, setChoices] = useState([]);
    return (
        <BorderBox className="border rounded-xl bg-card shadow-xs">
            <div className="flex items-center gap-2">
                <textarea
                    className="border-b focus:outline-0 w-full py-2"
                    placeholder="Type question"
                />
                <button>
                    <X />
                </button>
            </div>
        </BorderBox>
    );
}
