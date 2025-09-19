"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useSession } from "@/context/SessionContext";
import { createClient } from "@/lib/supabase/client";

export default function UploadAvatar() {
    const { user } = useSession();
    const supabase = createClient();

    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        // ... (your existing validation code is perfect) ...
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(file);
            console.log(file.type);

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

    const handleUploadAvatar = async () => {
        if (!avatar || !user?.id) return;
        setIsUploading(true); // Start loading

        const filePath = `avatars/${user.id}/avatar4.png`;

        // 1. Upload the image directly from the client to Supabase Storage
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

        // 2. (Optional) Get the public URL
        const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(uploadData.path);

        setAvatarUrl(urlData.publicUrl);

        // 3. (Optional) If you need to save this URL to a database table,
        // you can call a separate Server Action here.
        // This payload is just a string, so it's tiny.
        // await saveAvatarUrlToDb(urlData.publicUrl);

        toast.success("Successfully updated avatar.");
        setIsUploading(false); // End loading
        setAvatar(null); // Reset the file input
        // Optional: Clear the file input
        // document.querySelector('[type="file"]').value = "";
    };

    return (
        <div>
            <Input type="file" onChange={handleFileChange} />
            {error && <p className="text-destructive text-xs mt-1">{error}</p>}

            <button
                onClick={handleUploadAvatar}
                disabled={isUploading || !avatar} // Disable while uploading or no file selected
            >
                {isUploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
}
