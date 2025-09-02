"use client";

import { Copy, Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TertiaryLabel from "../ui/TertiaryLabel";
import BorderBox from "../ui/BorderBox";
import { useState } from "react";

export default function GroupInviteLink({ groupId }) {
    const inviteUrl = `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/invite/${groupId}`;
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000); // revert after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <BorderBox className="border rounded-xl bg-card">
            <div className="mb-3">
                <TertiaryLabel>
                    <LinkIcon size={17} /> Invitation Link
                </TertiaryLabel>
            </div>

            <p className="text-xs text-muted-foreground mb-2">
                Invite students to create an account for this group
            </p>
            <Input readOnly value={inviteUrl} />

            <div className="flex items-center mt-4 mb-1 gap-2">
                <Button size="sm" variant="destructive">
                    <LinkIcon />
                    Deactivate Link
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleCopy}
                    disabled={copied}
                >
                    <Copy />
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </div>
        </BorderBox>
    );
}
