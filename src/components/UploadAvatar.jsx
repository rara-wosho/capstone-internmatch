"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useSession } from "@/context/SessionContext";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader, Trash, Upload } from "lucide-react";
import { deleteAvatar } from "@/lib/actions/student";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";

export default function UploadAvatar({
    buttonVariant = "default",
    currentAvatarUrl,
}) {
    const { user } = useSession();
    const supabase = createClient();
    const router = useRouter();

    const inputRef = useRef(null);
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [open, setOpen] = useState(false);

    // Pick table based on user role
    const table =
        user?.user_metadata?.role === "company"
            ? "companies"
            : user?.user_metadata?.role === "instructor"
              ? "ojt_instructors"
              : "students";

    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files?.length > 0) {
            const file = e.target.files[0];
            const fileSize = file.size / 1000; // KB

            if (fileSize > 3500) {
                setError("File size must not exceed 3 MB");
                return;
            }
            if (!["image/png", "image/jpeg"].includes(file.type)) {
                setError("File type not allowed (PNG/JPEG only)");
                return;
            }

            setError("");
            setAvatar(file);
        }
    };

    // Upload avatar to Supabase Storage and update DB
    const handleUploadAvatar = async () => {
        if (!avatar || !user?.id) return;
        setIsUploading(true);

        // Prepare avatar path for supabase storage
        const ext = avatar.name.split(".").pop();
        const filePath = `avatars/${user.id}/${Date.now()}.${ext}`;

        try {
            // Upload to supabase storage
            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from("avatars")
                    .upload(filePath, avatar, { upsert: true });

            if (uploadError) throw new Error("Failed to upload avatar");

            // Get the url path
            const { data: urlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(uploadData.path);

            // Update avatar url in database table
            const { error: updateError } = await supabase
                .from(table)
                .update({ avatar_url: urlData.publicUrl })
                .eq("id", user.id);

            if (updateError) throw new Error("Failed to update database");

            toast.success("Avatar updated successfully!");
            setOpen(false);
            setAvatar(null);
            router.refresh();
        } catch (err) {
            toast.error(err.message || "Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    // Delete avatar
    const handleDeleteAvatar = async () => {
        setIsDeleting(true);

        const revalidationPath =
            user?.user_metadata?.role === "student"
                ? "/student/account/edit"
                : user?.user_metadata?.role === "company"
                  ? "/company/profile/edit"
                  : "/instructor/profile/edit";

        try {
            const result = await deleteAvatar(
                table,
                user?.id,
                revalidationPath
            );
            if (!result.success) throw new Error("Failed to remove avatar");

            toast.success("Avatar removed successfully.");
            setOpen(false);
            router.refresh();
        } catch (err) {
            toast.error(err.message || "Unable to remove avatar.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={buttonVariant} className="w-full">
                    Update Avatar
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Manage Avatar</DialogTitle>
                </DialogHeader>

                <div className="space-y-3 mt-2">
                    <Input
                        ref={inputRef}
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {/* Upload Section */}
                    <div className="flex flex-col gap-2">
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                        {avatar && (
                            <p className="text-sm truncate">
                                Selected:{" "}
                                <span className="font-medium">
                                    {avatar.name}
                                </span>
                            </p>
                        )}
                        <Button
                            onClick={() => inputRef.current?.click()}
                            disabled={isUploading}
                            variant="outline"
                        >
                            <Upload />
                            {avatar ? "Change Selected File" : "Choose File"}
                        </Button>

                        <Separator className="my-2" />

                        {avatar && (
                            <Button
                                onClick={handleUploadAvatar}
                                disabled={isUploading || error}
                            >
                                {isUploading && (
                                    <Loader className="animate-spin" />
                                )}
                                {isUploading ? "Uploading..." : "Upload Avatar"}
                            </Button>
                        )}
                    </div>
                    {/* Remove Section */}
                    <Button
                        onClick={handleDeleteAvatar}
                        disabled={isDeleting || !currentAvatarUrl}
                        variant="destructive"
                        className="w-full"
                    >
                        <Trash />
                        {isDeleting ? "Removing..." : "Remove Avatar"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
