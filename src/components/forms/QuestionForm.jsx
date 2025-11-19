"use client";

import React, { useState } from "react";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function QuestionForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        question: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //  check for an empty field
        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.subject.trim() ||
            !formData.question.trim()
        ) {
            toast.warning("All fields are required.");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            toast.success("Submitted successfully");

            // Reset form after submit
            setFormData({
                name: "",
                email: "",
                subject: "",
                question: "",
            });

            setLoading(false);
        }, 1500);
    };

    return (
        <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
            <div className="mb-1">
                <FormLabel required>Your Name</FormLabel>
                <Input
                    required
                    name="name"
                    placeholder="e.g. Zhanderylle Vlarco"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-1">
                <FormLabel required>Your email</FormLabel>
                <Input
                    type="email"
                    required
                    name="email"
                    placeholder="e.g. Zhand@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-1">
                <FormLabel required>Subject</FormLabel>
                <Input
                    required
                    name="subject"
                    placeholder="Enter a subject"
                    value={formData.subject}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-1">
                <FormLabel required>Your question/message</FormLabel>
                <Textarea
                    required
                    name="question"
                    placeholder="Type here..."
                    value={formData.question}
                    onChange={handleChange}
                />
            </div>
            <Button disabled={loading} type="submit" className="mb-2">
                {loading && <Loader className="animate-spin" />}
                {loading ? "Please wait" : "Submit Form"}
            </Button>
        </form>
    );
}
