"use client";

import { useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useSession } from "@/context/SessionContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Image as Gallery, Loader, Trash, X } from "lucide-react";
import { deleteAvatar } from "@/lib/actions/student";

export default function UploadAvatar({ currentAvatarUrl }) {
    const { user } = useSession();
    const supabase = createClient();
    const router = useRouter();

    const inputRef = useRef(null);
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
                setError("File type is not allowed");
                return;
            }

            setError("");
            setAvatar(file);
        }
    };

    function tablePicker() {
        if (user?.user_metadata?.role === "student") return "students";
        if (user?.user_metadata?.role === "company") return "companies"; // Fixed typo
        if (user?.user_metadata?.role === "instructor")
            return "ojt_instructors";
        return "students"; // Default fallback
    }

    const table = tablePicker();

    // upload the new avatar to storage then update to specific table
    const handleUploadAvatar = async (e) => {
        e.stopPropagation();
        if (!avatar || !user?.id) return;
        setIsUploading(true);

        const filePath = `avatars/${user.id}/${new Date().getTime()}.png`;

        try {
            // 1. Upload to storage
            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from("avatars")
                    .upload(filePath, avatar, {
                        upsert: true,
                    });

            if (uploadError) {
                throw new Error(
                    "Something went wrong while updating your avatar"
                );
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
                throw new Error("Unable to update a new avatar");
            }

            toast.success("Successfully updated avatar.");
            setAvatar(null);
            router.refresh();
        } catch (error) {
            console.error(error.message);
            toast.error(error.message || "Unable to upload avatar.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteAvatar = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteAvatar(
                table,
                user?.id,
                "/student/profile",
                "/student/account/edit"
            );

            if (result.success) {
                toast.success("Avatar removed successfully.");
                router.refresh();
            } else {
                throw new Error("Failed to remove avatar");
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.message || "Unable to remove avatar.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="w-full relative">
            {/* remove the current file  */}
            {avatar && (
                <button
                    disabled={isUploading}
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
                    className={`${
                        isUploading && "pointer-events-none"
                    } cursor-pointer bg-card border-2 border-dashed rounded-lg flex flex-col justify-center items-center p-3`}
                >
                    {error ? (
                        <p className="text-destructive text-xs mt-1">{error}</p>
                    ) : (
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {avatar?.name ? (
                                <span className="text-accent-foreground">
                                    {avatar?.name}
                                </span>
                            ) : (
                                "No file chosen"
                            )}
                        </p>
                    )}
                </div>
            </div>

            <Input
                className="sr-only"
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
            />

            {avatar ? (
                <Button
                    onClick={handleUploadAvatar}
                    disabled={isUploading || !avatar || error}
                    className="mt-2 w-full"
                >
                    {isUploading && <Loader className="animate-spin" />}
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
                onClick={handleDeleteAvatar}
                disabled={isDeleting || !currentAvatarUrl}
                variant="dangerOutline"
                className="mt-2 w-full"
            >
                <Trash /> {isDeleting ? "Removing..." : "Remove Avatar"}
            </Button>
        </div>
    );
}
