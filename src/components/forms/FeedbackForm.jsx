"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import BorderBox from "../ui/BorderBox";
import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Textarea } from "../ui/textarea";
import TitleText from "../ui/TitleText";
import { Bug, Info, Lightbulb, Loader, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSession } from "@/context/SessionContext";
import { submitFeedback } from "@/lib/actions/feedback";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { dateFormatter } from "@/utils/date-formatter";

export default function FeedbackForm() {
    const { userData } = useSession();

    const [formData, setFormData] = useState({
        category: "suggestions",
        feedback: "",
        rating: 5,
        role: userData.role,
    });

    const [ownFeedbacks, setOwnFeedbacks] = useState([]);

    const [isPending, startTransition] = useTransition();
    const [fetchingFeedback, setFetchingFeedback] = useState(true);

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
        setFormData((prev) => ({ ...prev, category }));
    }

    function handleChangeMessage(e) {
        setFormData((prev) => ({ ...prev, feedback: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        startTransition(async () => {
            const { success, error } = await submitFeedback(formData);

            if (!success || error) {
                toast.error(error);
                return;
            }

            toast.success("Submitted feedback successfully.");
            setFormData((prev) => ({ ...prev, feedback: "" }));
            fetchOwnFeedback();
        });
    }

    const fetchOwnFeedback = useCallback(async () => {
        setFetchingFeedback(true);
        const supabase = createClient();

        const { data, error } = await supabase
            .from("feedbacks")
            .select("feedback, submitted_at, category")
            .eq("user_id", userData.id);

        if (error) {
            setOwnFeedbacks([]);
            setFetchingFeedback(false);
            return;
        }

        setOwnFeedbacks(data);

        setFetchingFeedback(false);
    }, []);

    useEffect(() => {
        fetchOwnFeedback();
    }, []);

    console.log(ownFeedbacks);
    return (
        <>
            <BorderBox className="bg-card shadow-xs rounded-xl p-4 mb-6">
                {/* Category Selector */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {categories.map(
                        ({ id, label, description, icon: Icon }) => (
                            <div
                                key={id}
                                onClick={() => handleChangeCategory(id)}
                                className={cn(
                                    "rounded-lg basis-[250px] grow border flex gap-2 p-3 cursor-pointer transition",
                                    formData.category === id
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
                        )
                    )}
                </div>
                <div className="mb-3">
                    <FormLabel>Rate your experience</FormLabel>
                    <div className="flex items-center gap-2">
                        {[...Array(5)].map((s, index) => (
                            <div
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        rating: index + 1,
                                    }))
                                }
                                key={index}
                                className="text-yellow-500 cursor-pointer size-6 flex items-center justify-center"
                            >
                                <Star
                                    className={`${formData.rating > index && "fill-yellow-500"}`}
                                />
                            </div>
                        ))}
                        <p className="ms-2 text-sm text-muted-foreground">
                            {formData.rating} Star{formData.rating > 1 && "s"}
                        </p>
                    </div>
                </div>
                {/* Feedback Form */}
                <Form onSubmit={handleSubmit} className="space-y-3">
                    <FormLabel>Your Feedback</FormLabel>
                    <Textarea
                        value={formData.feedback}
                        onChange={handleChangeMessage}
                        placeholder="Share your thoughts, suggestions, or report issues..."
                        className="min-h-[120px]"
                    />
                    <div className="flex items-center justify-end">
                        <Button
                            type="submit"
                            className="mt-2"
                            disabled={!formData.feedback || isPending}
                        >
                            {isPending && <Loader className="animate-spin" />}
                            {isPending
                                ? "Submitting Feedback"
                                : "Submit Feedback"}
                        </Button>
                    </div>
                </Form>
            </BorderBox>

            <div>
                <TitleText className="mb-2">Your Feedbacks</TitleText>
                {fetchingFeedback ? (
                    "Loading..."
                ) : ownFeedbacks.length === 0 ? (
                    <div className="text-muted-foreground">
                        No feedback submitted.
                    </div>
                ) : (
                    <div className="">
                        {ownFeedbacks.map((f) => (
                            <div
                                key={f.submitted_at}
                                className="text-muted-foreground py-3 border-b"
                            >
                                <p className="whitespace-pre-wrap">
                                    {f.feedback}
                                </p>
                                <div className="flex items-center gap-2 justify-between">
                                    <p className="text-xs text-muted-foreground capitalize">
                                        {f.category}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {dateFormatter(f.submitted_at)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
