"use client";

import { useState } from "react";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Info } from "lucide-react";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";
import { createExam } from "@/lib/actions/exam";
import SubmitButton from "../ui/SubmitButton";

export default function ExamDetailsForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        instruction: "",
        duration: "60",
        mode: "classic",
        is_published: true,
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Required fields
        if (!formData.title || !formData.duration || !formData.mode) {
            toast.error("Fill in all required fields.");
            return;
        }

        const { success } = await createExam(formData);

        if (!success) {
            toast.error("Unable to create exam. Please try again later.");
            return;
        }
    };

    return (
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div>
                <FormLabel>Title</FormLabel>
                <Input
                    placeholder="Enter exam title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                />
            </div>
            <div>
                <FormLabel>Description (Optional)</FormLabel>
                <Textarea
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
            </div>
            <div>
                <FormLabel>Instruction (Optional)</FormLabel>
                <Textarea
                    placeholder="Enter instruction"
                    value={formData.instruction}
                    onChange={(e) =>
                        handleChange("instruction", e.target.value)
                    }
                />
            </div>
            <div className="flex flex-col mb-3">
                <FormLabel>Exam duration</FormLabel>
                <Select
                    value={formData.duration}
                    onValueChange={(val) => handleChange("duration", val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Exam duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1 hour, 30 minutes</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="150">2 hours, 30 minutes</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                        <SelectItem value="0">No time limit</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FormLabel>
                        <label htmlFor="publish">Publish</label>
                    </FormLabel>
                    <Switch
                        checked={formData.is_published}
                        onCheckedChange={(val) =>
                            handleChange("is_published", val)
                        }
                        id="publish"
                        className="cursor-pointer mb-1"
                    />
                </div>

                <Popover>
                    <PopoverTrigger className="cursor-pointer">
                        <Info size={18} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <p className="text-muted-foreground text-sm">
                            If on, this examination is accessible by anyone.
                        </p>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="py-2 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Mode</p>
                </div>

                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                    <label
                        htmlFor="classic"
                        className={`border rounded-lg p-3 cursor-pointer ${
                            formData.mode === "classic" &&
                            "border-accent-foreground bg-accent"
                        }`}
                    >
                        <input
                            type="radio"
                            name="mode"
                            id="classic"
                            className="sr-only"
                            checked={formData.mode === "classic"}
                            onChange={() => handleChange("mode", "classic")}
                        />
                        <p>Classic</p>
                        <p className="text-muted-foreground text-sm mt-1">
                            In classic mode, students will see 5 questions at a
                            time.
                        </p>
                    </label>
                    <label
                        htmlFor="focus"
                        className={`border rounded-lg p-3 cursor-pointer ${
                            formData.mode === "focus" &&
                            "border-accent-foreground bg-accent"
                        }`}
                    >
                        <input
                            type="radio"
                            name="mode"
                            id="focus"
                            className="sr-only"
                            checked={formData.mode === "focus"}
                            onChange={() => handleChange("mode", "focus")}
                        />
                        <p>Focus</p>
                        <p className="text-muted-foreground text-sm mt-1">
                            In focus mode, students will see 1 question at a
                            time.
                        </p>
                    </label>
                </div>
            </div>

            <SubmitButton type="submit" className="mb-3">
                <p className="flex items-center gap-2">
                    Next step <ArrowRight />
                </p>
            </SubmitButton>
        </form>
    );
}
