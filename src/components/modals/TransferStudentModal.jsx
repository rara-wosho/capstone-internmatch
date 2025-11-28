"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Copy, Check, Users, Link } from "lucide-react";
import { toast } from "sonner";
import FormLabel from "../ui/FormLabel";

export function TransferStudentModal({ groupId }) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Generate transfer link
    const transferLink = `https://internmatch.online/student/transfer/${groupId}`;

    // Copy to clipboard
    const copyToClipboard = async () => {
        if (!transferLink) return;

        try {
            await navigator.clipboard.writeText(transferLink);
            setCopied(true);
            toast.success("Transfer link copied to clipboard!");

            // Reset copied state after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Users />
                    Transfer Student
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Transfer Student From Another Group
                    </DialogTitle>
                    <DialogDescription>
                        Generate a transfer link to let students transfer to
                        this group.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <FormLabel>Transfer Link</FormLabel>
                        <div className="flex items-center space-x-2">
                            <div className="relative flex-1">
                                <Input
                                    icon={<Link size={16} />}
                                    value={transferLink}
                                    readOnly
                                />
                            </div>
                            <Button onClick={copyToClipboard}>
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Share this link with the student. They can use it to
                            transfer to this group.
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-muted p-3 rounded-md mb-3">
                        <h4 className="font-medium text-sm mb-2">
                            How it works:
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Copy the generated transfer link</li>
                            <li>• Share the link with the student</li>
                            <li>
                                • Student clicks the link to initiate transfer
                            </li>
                            <li>
                                • No need for transfer approval but deactivating
                                the group invite link will also prevent the
                                student to transfer.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-md p-3 border border-blue-500/20 bg-blue-300/20 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-sm">
                        Please remind your students to sign in first before
                        clicking this link.
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
