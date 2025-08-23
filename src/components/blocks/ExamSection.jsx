"use client";
import { useState } from "react";
import BorderBox from "../ui/BorderBox";
import QuestionSection from "../exam/QuestionSection";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";

export default function ExamSection() {
    const [questions, setQuestions] = useState([]);
    return (
        <div className="">
            <div className="mb-8">
                <div className="mb-3">
                    <FormLabel>Exam title</FormLabel>
                    <Input placeholder="title" />
                </div>
                <div className="mb-3">
                    <FormLabel>Exam description</FormLabel>
                    <Input placeholder="description" />
                </div>
            </div>
            <div className="flex flex-col gap-y-10">
                <QuestionSection />
                <QuestionSection />
                <QuestionSection />
            </div>
        </div>
    );
}
