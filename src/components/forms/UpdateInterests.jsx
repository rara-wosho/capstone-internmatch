"use client";

import { useCallback, useState, useMemo, useTransition } from "react";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Check, Loader } from "lucide-react";
import SecondaryLabel from "../ui/SecondaryLabel";
import { Button } from "../ui/button";
import { updateStudentInterests } from "@/lib/actions/student";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const skillsData = [
    {
        category: "Development",
        skills: [
            "Frontend Development",
            "Backend Development",
            "Mobile App Development",
            "Database Management",
            "API Development & Integration",
        ],
    },
    {
        category: "Networking & Systems",
        skills: [
            "Computer Networking",
            "Network Security",
            "System Administration",
            "Cloud Platforms",
            "IoT & Embedded Systems",
        ],
    },
    {
        category: "Design & Creativity",
        skills: [
            "UI/UX Design",
            "Graphic Design",
            "Web Design",
            "Video Editing",
            "Content Creation & Photography",
        ],
    },
    {
        category: "Data & Analytics",
        skills: [
            "Data Analysis",
            "Data Visualization",
            "Machine Learning Basics",
            "Statistics & Research Methods",
            "Database Querying",
        ],
    },
    {
        category: "Cybersecurity",
        skills: [
            "Ethical Hacking",
            "Security Best Practices",
            "Cryptography Fundamentals",
            "Incident Response",
            "Secure Coding",
        ],
    },
    {
        category: "Professional & Organizational",
        skills: [
            "Project Management",
            "Technical Writing & Documentation",
            "Communication & Collaboration",
            "Leadership & Team Building",
            "Public Speaking & Presentation Skills",
        ],
    },
];

export default function UpdateInterests({
    interestId,
    initialSkills,
    buttonLabel,
}) {
    const [selectedSkills, setSelectedSkills] = useState(initialSkills ?? []);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // ✅ useCallback prevents re-creation of function on every render
    const handleSelect = useCallback((skill) => {
        setSelectedSkills((prev) =>
            prev.includes(skill)
                ? prev.filter((s) => s !== skill)
                : [...prev, skill]
        );
    }, []);

    // ✅ Convert array to Set for O(1) lookup
    const selectedSkillsSet = useMemo(
        () => new Set(selectedSkills),
        [selectedSkills]
    );

    const handleSubmit = () => {
        startTransition(async () => {
            const id = interestId ? interestId : undefined;
            const { success } = await updateStudentInterests(
                id,
                selectedSkills
            );

            if (!success) {
                toast.error(
                    "Unable to save interests and skills. Please try again."
                );
                return;
            }

            router.replace("/student");
        });
    };

    return (
        <div className="px-3">
            <div className="border-b pb-4 mb-4">
                <SecondaryLabel>Choose your Interests or Skills</SecondaryLabel>
                <p className="text-sm text-muted-foreground text-left">
                    You can update these informations anytime at your profile.
                </p>
            </div>
            {skillsData.map((category) => (
                <div key={category.category} className="mb-8">
                    <TertiaryLabel>{category.category}</TertiaryLabel>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {category.skills.map((skill) => {
                            const isSelected = selectedSkillsSet.has(skill);
                            return (
                                <button
                                    type="button"
                                    onClick={() => handleSelect(skill)}
                                    key={skill}
                                    className={`p-2 md:p-3 border rounded-md flex items-center justify-between transition-colors
                                        ${
                                            isSelected
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-card hover:bg-accent"
                                        }`}
                                >
                                    <p className="text-sm">{skill}</p>
                                    {isSelected && <Check size={16} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="flex gap-3 flex-col-reverse sm:flex-row w-full">
                <Button
                    className="grow sm:grow-0 ms-auto"
                    onClick={handleSubmit}
                    size="lg"
                    disabled={isPending}
                >
                    {isPending && <Loader className="animate-spin" />}
                    {buttonLabel}
                </Button>
            </div>
        </div>
    );
}
