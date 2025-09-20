"use client";

import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useSession } from "@/context/SessionContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function UploadAvatar() {
    const { user } = useSession();
    const supabase = createClient();
    const router = useRouter();

    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // filesize in kilobyte
            const fileSize = file.size / 1000;

            if (fileSize > 3500) {
                setError("File size must not exceed 3 MB");
                return;
            }

            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                setError("File type is not allowed.");
                return;
            }

            setError("");
            setAvatar(file);
        }
    };

    function tablePicker() {
        if (user?.user_metadata?.role === "student") return "students";
        if (user?.user_metadata?.role === "company") return "companyies";
        if (user?.user_metadata?.role === "instructor")
            return "ojt_instructors";
    }

    const table = tablePicker();

    // upload the new avatar to storage then update to specific table
    const handleUploadAvatar = async () => {
        if (!avatar || !user?.id) return;
        setIsUploading(true);

        const filePath = `avatars/${user.id}/${new Date().getTime()}.png`;

        // 1. Upload to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, avatar, {
                upsert: true,
            });

        if (uploadError) {
            console.error(uploadError.message);
            toast.error("Unable to upload avatar.");
            setIsUploading(false);
            return;
        }

        // 2. Get public URL
        const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(uploadData.path);

        // 3. FIXED: Update database with correct syntax
        const { error: updateError } = await supabase
            .from(table)
            .update({ avatar_url: urlData.publicUrl }) // ← This is now correct
            .eq("id", user.id);

        if (updateError) {
            console.error(updateError.message);
            toast.error("Avatar uploaded but profile couldn't be updated.");
            setIsUploading(false);
            return;
        }

        toast.success("Successfully updated avatar.");
        setIsUploading(false);
        setAvatar(null);

        router.refresh();
    };

    return (
        <div>
            <Input type="file" onChange={handleFileChange} />
            {error && <p className="text-destructive text-xs mt-1">{error}</p>}

            <Button
                onClick={handleUploadAvatar}
                disabled={isUploading || !avatar}
                className="mt-3 w-full"
            >
                {isUploading ? "Please wait..." : "Update Avatar"}
            </Button>
        </div>
    );
}
