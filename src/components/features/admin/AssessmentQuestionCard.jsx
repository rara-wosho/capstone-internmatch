"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";

export default function AssessmentQuestionCard({ question }) {
    const [isEditing, setIsEditing] = useState(false);

    const toggleIsEditing = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="py-4 md:py-5 border-t">
            {!isEditing ? (
                <div className="flex items-start sm:flex-row flex-col sm:justify-between gap-3">
                    <div>
                        <p className="font-medium mb-1">
                            {question.assessment_question_text}
                        </p>
                        <div className="text-muted-foreground text-sm">
                            Answer:{" "}
                            <span className="text-accent-foreground">
                                {
                                    question.assessment_choices.find(
                                        (c) => c.is_correct
                                    )?.assessment_choice_text
                                }
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="text-destructive"
                            size="smallIcon"
                        >
                            <Trash />
                        </Button>
                        <Button
                            onClick={toggleIsEditing}
                            variant="outline"
                            size="smallIcon"
                        >
                            <Pen />
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <Textarea
                        placeholder="Enter question here"
                        defaultValue={question.assessment_question_text}
                    />

                    <div className="flex items-center gap-2 justify-end mt-4">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={toggleIsEditing}
                        >
                            Cancel
                        </Button>
                        <Button size="sm" onClick={toggleIsEditing}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
