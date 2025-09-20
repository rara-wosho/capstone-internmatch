"use client";

import { useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useSession } from "@/context/SessionContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Image as Gallery, Trash, X } from "lucide-react";
import { deleteAvatar } from "@/lib/actions/storage";

export default function UploadAvatar({ currentAvatarUrl }) {
    const { user } = useSession();
    const supabase = createClient();
    const router = useRouter();

    const inputRef = useRef(null);
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            console.log(file);
            console.log(inputRef.current);

            // filesize in kilobyte
            const fileSize = file.size / 1000;

            if (fileSize > 3500) {
                setError("File size must not exceed 3 MB");
                return;
            }

            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                setError("File type is not allowed");
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
    const handleUploadAvatar = async (e) => {
        e.stopPropagation();
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

        // 3. Update database
        const { error: updateError } = await supabase
            .from(table)
            .update({ avatar_url: urlData.publicUrl })
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
        <div className="w-full relative">
            {/* remove the current file  */}
            {avatar && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setAvatar(null);
                    }}
                    className="cursor-pointer absolute bg-muted -top-2 -right-2 p-1 rounded-full z-20"
                >
                    <X size={15} />
                </button>
            )}
            <div className="relative isolate p-[1px] rounded-lg overflow-hidden">
                {isUploading && (
                    <div className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[300px] bg-linear-to-r from-transparent from-25% to-primary [animation-duration:1.5s] animate-spin -z-10"></div>
                )}

                {/* the visible clickable part  */}
                <div
                    onClick={() => {
                        if (inputRef.current) {
                            inputRef.current.click();
                        }
                    }}
                    className="cursor-pointer bg-card border-2 border-dashed rounded-lg flex flex-col justify-center items-center p-3"
                >
                    <p className="text-sm text-muted-foreground mb-2 truncate max-w-[200px]">
                        {avatar?.name ? (
                            <span className="text-accent-foreground">
                                {avatar?.name}
                            </span>
                        ) : (
                            "No file chosen"
                        )}
                    </p>

                    <div className="text-xs text-muted-foreground text-center">
                        Max file size 3 MB
                    </div>

                    {error && (
                        <p className="text-destructive text-xs mt-1">{error}</p>
                    )}
                </div>
            </div>

            <Input
                className="sr-only"
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />

            {avatar ? (
                <Button
                    onClick={handleUploadAvatar}
                    disabled={isUploading || !avatar || error}
                    className="mt-2 w-full"
                >
                    {isUploading ? "Updating..." : "Update Avatar Now"}
                </Button>
            ) : (
                <Button
                    onClick={() => {
                        if (inputRef.current) {
                            inputRef.current.click();
                        }
                    }}
                    className="mt-2 w-full"
                >
                    <Gallery /> Upload New
                </Button>
            )}

            <Button
                onClick={() => {}}
                variant="dangerOutline"
                className="mt-2 w-full"
            >
                <Trash /> Delete Avatar
            </Button>
        </div>
    );
}
