"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function ArchiveExamButton({ examId, initialArchiveStatus }) {
    const [isPending, startTransition] = useTransition();
    const [isArchive, setIsArchive] = useState(initialArchiveStatus || false);
    const router = useRouter();

    const handleClick = () => {
        const supabase = createClient();

        startTransition(async () => {
            const { error } = await supabase
                .from("exams")
                .update({ is_archive: true })
                .eq("id", examId);

            if (error) {
                console.log("error archiving exam", error.message);
                toast.error("Unable to archive exam. Please try again.");
                return;
            }

            setIsArchive(true);
            router.replace("/company/manage-exam");
        });
    };
    return isArchive ? (
        <p className="w-full text-center text-sm text-muted-foreground">
            This exam is archived
        </p>
    ) : (
        <Button
            disabled={isPending}
            onClick={handleClick}
            variant="outline"
            className="w-full"
        >
            {isPending ? "Archiving..." : "Archive Exam"}
        </Button>
    );
}
