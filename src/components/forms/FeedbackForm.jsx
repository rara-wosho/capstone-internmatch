"use client";

import { useState } from "react";
import BorderBox from "../ui/BorderBox";
import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Textarea } from "../ui/textarea";
import TitleText from "../ui/TitleText";
import { Bug, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function FeedbackForm() {
    const [feedback, setFeedback] = useState({
        category: "suggestions",
        message: "",
    });
    const [status, setStatus] = useState(null);

    const categories = [
        {
            id: "suggestions",
            label: "Suggestions",
            description: "Share your ideas on how we can improve",
            icon: Lightbulb,
        },
        {
            id: "bugs",
            label: "Bug Report",
            description: "Report issues or unexpected behavior",
            icon: Bug,
        },
        {
            id: "others",
            label: "Other",
            description: "Any other feedback you'd like to share",
            icon: Info,
        },
    ];

    function handleChangeCategory(category) {
        setFeedback((prev) => ({ ...prev, category }));
    }

    function handleChangeMessage(e) {
        setFeedback((prev) => ({ ...prev, message: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // if (!feedback.message.trim()) {
        //     setStatus({ type: "error", text: "Please enter your feedback." });
        //     return;
        // }

        // try {
        //     // Example: save via API route or server action
        //     const res = await fetch("/api/feedback", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(feedback),
        //     });

        //     if (!res.ok) throw new Error("Failed to send feedback");

        //     setStatus({
        //         type: "success",
        //         text: "Thank you for your feedback!",
        //     });
        //     setFeedback({ category: "suggestions", message: "" });
        // } catch (err) {
        //     setStatus({
        //         type: "error",
        //         text: "Something went wrong. Please try again.",
        //     });
        // }
    }

    return (
        <BorderBox className="bg-card shadow-xs rounded-xl p-4">
            {/* Category Selector */}
            <div className="flex flex-wrap gap-2 mb-5">
                {categories.map(({ id, label, description, icon: Icon }) => (
                    <div
                        key={id}
                        onClick={() => handleChangeCategory(id)}
                        className={cn(
                            "rounded-lg basis-[250px] grow border flex gap-2 p-3 cursor-pointer transition",
                            feedback.category === id
                                ? "border-accent-foreground bg-accent text-accent-foreground"
                                : "hover:text-accent-foreground"
                        )}
                    >
                        <Icon size={20} className="mt-1" />
                        <div className="flex flex-col">
                            <TitleText>{label}</TitleText>
                            <p className="text-muted-foreground text-sm">
                                {description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Feedback Form */}
            <Form onSubmit={handleSubmit} className="space-y-3">
                <FormLabel>Your Feedback</FormLabel>
                <Textarea
                    value={feedback.message}
                    onChange={handleChangeMessage}
                    placeholder="Share your thoughts, suggestions, or report issues..."
                    className="min-h-[120px]"
                />
                <div className="flex items-center justify-end">
                    <Button
                        type="submit"
                        className="mt-2"
                        disabled={!feedback.message}
                    >
                        Submit Feedback
                    </Button>
                </div>
            </Form>
        </BorderBox>
    );
}
