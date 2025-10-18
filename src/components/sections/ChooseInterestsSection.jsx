"use client";

import React, { useState, useTransition } from "react";
import BorderBox from "../ui/BorderBox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { upsertStudentInterests } from "@/lib/actions/student";
import { toast } from "sonner";

const INTEREST_CHOICES = [
    "Web Development",
    "Front-End Development",
    "Back-End Development",
    "Full-Stack Development",
    "Mobile App Development",
    "Network Administration",
    "Systems Administration",
    "Technical Support",
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Data Analytics",
    "Software Testing",
    "Project Assistance",
];

export default function ChooseInterestsSection({
    studentId,
    interests,
    isOnboarding,
}) {
    const [selectedInterests, setSelectedInterests] = useState(() => interests);
    const [customInterest, setCustomInterest] = useState("");

    const [isPending, startTransition] = useTransition();

    const handleAddInterest = () => {
        if (selectedInterests.includes(customInterest)) return;

        // empty custom interest
        if (!customInterest.trim()) return;

        setSelectedInterests((prev) => [...prev, customInterest]);
        setCustomInterest("");
    };

    const handleInterestChange = (e) => {
        // 30 max character
        if (e.target.value.length > 30) return;

        setCustomInterest(e.target.value);
    };

    const handleRemoveInterest = (interest) => {
        setSelectedInterests((prev) => prev.filter((i) => interest !== i));
    };

    const handleSubmitInterests = () => {
        startTransition(async () => {
            const result = await upsertStudentInterests(
                studentId,
                selectedInterests
            );

            if (!result.success) {
                toast.error("Unable to add interests.", {
                    description: result.error,
                });
            }
        });
    };

    return (
        <>
            <div className="border rounded-xl bg-card shadow-xs mb-3">
                <BorderBox className="border-b">
                    {selectedInterests.length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                            You don't have any interests yet. You can add now or
                            select from the list below.
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {selectedInterests.map((interest, index) => (
                                <div
                                    className="rounded-full bg-muted pe-3 ps-4 text-muted-foreground group h-9 text-sm flex items-center whitespace-nowrap gap-2 cursor-pointer transition-colors hover:text-secondary-foreground"
                                    key={index}
                                    onClick={() =>
                                        handleRemoveInterest(interest)
                                    }
                                >
                                    {interest}

                                    <button className="rounded-full size-5 border dark:border-neutral-700 flex items-center justify-center">
                                        <X size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </BorderBox>
                <BorderBox>
                    <div className="mb-1.5 flex items-center justify-between">
                        <p>Custom Interest</p>
                        <p className="text-sm text-muted-foreground">
                            <span className="tabular-nums">
                                {customInterest.length}
                            </span>
                            /30
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                            value={customInterest}
                            onChange={handleInterestChange}
                            placeholder="Max 30 characters"
                            onKeyDown={(e) =>
                                e.key == "Enter" && handleAddInterest()
                            }
                        />
                        <Button
                            disabled={!customInterest}
                            onClick={handleAddInterest}
                            variant="outline"
                            size="lg"
                        >
                            <Plus />
                        </Button>
                    </div>
                </BorderBox>
            </div>

            <div className="border bg-card shadow-xs rounded-xl">
                <BorderBox>
                    <p className="mb-4 text-sm  text-muted-foreground">
                        Explore common IT fields below and select the ones that
                        match your interests (recommended)
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                        {INTEREST_CHOICES.map((interest, index) => (
                            <div
                                className={cn(
                                    "rounded-full bg-muted pe-3 ps-4 text-muted-foreground group h-9 text-sm flex items-center whitespace-nowrap gap-2 cursor-pointer transition-colors hover:text-secondary-foreground",
                                    selectedInterests.includes(interest) &&
                                        "pointer-events-none opacity-40"
                                )}
                                key={index}
                                onClick={() =>
                                    setSelectedInterests((prev) => [
                                        ...prev,
                                        interest,
                                    ])
                                }
                            >
                                {interest}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            onClick={handleSubmitInterests}
                            disabled={isPending}
                        >
                            {isPending && <Loader className="animate-spin" />}
                            {isOnboarding
                                ? "Save and Get Started"
                                : "Save Interests"}
                        </Button>
                    </div>
                </BorderBox>
            </div>
        </>
    );
}
