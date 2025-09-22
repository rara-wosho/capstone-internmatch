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
        duration: 60,
        is_published: false,
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Required fields
        if (!formData.title || !formData.duration) {
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
                <FormLabel className="text-left">
                    Exam Duration (minutes)
                </FormLabel>
                <Input
                    value={formData.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                    type="number"
                    placeholder="Enter exam duration"
                />
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
                        className="mb-1"
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

            <SubmitButton
                disabled={!formData.title}
                type="submit"
                className="mb-3"
            >
                <p className="flex items-center gap-2">
                    Next step <ArrowRight />
                </p>
            </SubmitButton>
        </form>
    );
}
