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
import { CircleCheck } from "lucide-react";

export default function ExamSection() {
    const [questions, setQuestions] = useState([]);
    return (
        <form className="flex flex-col gap-y-6">
            <div>
                <FormLabel>Exam title</FormLabel>
                <Input placeholder="title" />
            </div>
            <div>
                <FormLabel>Exam description</FormLabel>
                <Textarea placeholder="description" />
            </div>
            <div className="flex flex-col mb-3">
                <FormLabel>Exam duration</FormLabel>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Exam duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">30 minutes</SelectItem>
                        <SelectItem value="dark">1 hour</SelectItem>
                        <SelectItem value="system">
                            1 hour, 30 minutes
                        </SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center mb-2">
                <Button variant="white">
                    <CircleCheck /> Save Exam
                </Button>
            </div>
        </form>
    );
}
