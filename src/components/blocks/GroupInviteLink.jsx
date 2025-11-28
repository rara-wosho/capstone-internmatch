"use client";

import { Copy, Link as LinkIcon, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TertiaryLabel from "../ui/TertiaryLabel";
import BorderBox from "../ui/BorderBox";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { toggleGroupShareable } from "@/lib/actions/group";

export default function GroupInviteLink({ groupId, is_shareable }) {
    const inviteUrl = `https://internmatch.online/invite/${groupId}`;

    const [copied, setCopied] = useState(false);
    const [shareable, setShareable] = useState(is_shareable);
    const [isPending, startTransition] = useTransition();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const handleToggleShareable = () => {
        startTransition(async () => {
            const newValue = !shareable;
            const { success } = await toggleGroupShareable(groupId, newValue);

            if (!success) {
                toast.error("Failed to update shareable state");
                return;
            }

            setShareable(newValue);
            toast.success(
                newValue
                    ? "Invitation link activated ✅"
                    : "Invitation link deactivated 🚫"
            );
        });
    };

    return (
        <BorderBox className="border rounded-xl bg-card">
            <div className="mb-3 flex items-center justify-between">
                <TertiaryLabel>
                    <LinkIcon size={17} /> Invitation Link
                </TertiaryLabel>
            </div>

            <p className="text-xs text-muted-foreground mb-2">
                Student can only join InternMatch with your invitation link.
                Once joined, they will be a member of this group.
            </p>

            <div className="flex items-center gap-2">
                <Input readOnly value={inviteUrl} />
                <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleCopy}
                    disabled={copied}
                >
                    <Copy />
                    <p className="hidden sm:inline-flex">
                        {copied ? "Copied!" : "Copy"}
                    </p>
                </Button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 mb-1 p-2 border rounded-lg">
                <div className="text-sm text-muted-foreground flex items-center gap-1.5 sm:pl-1.5">
                    <p>Status: </p>
                    <p
                        className={`font-semibold ${
                            shareable ? "text-green-600" : "text-destructive"
                        }`}
                    >
                        {shareable ? "Active" : "Inactive"}
                    </p>
                    {/* ✅ Dot indicator */}
                    <div
                        className={`size-2 rounded-full ${
                            shareable ? "bg-green-500" : "bg-destructive"
                        }`}
                    >
                        <div
                            className={`size-2 rounded-full animate-ping ${
                                shareable ? "bg-green-500" : "bg-destructive"
                            }`}
                        ></div>
                    </div>
                </div>

                <Button
                    onClick={handleToggleShareable}
                    size="sm"
                    variant={shareable ? "destructive" : "success"}
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <LinkIcon />
                    )}
                    {shareable ? "Deactivate" : "Activate"} Link
                </Button>
            </div>
        </BorderBox>
    );
}
