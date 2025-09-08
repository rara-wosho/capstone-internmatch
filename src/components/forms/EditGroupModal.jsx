"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";
import { toast } from "sonner";
import { editGroup } from "@/lib/actions/group";
import FormLabel from "../ui/FormLabel";

export default function EditGroupModal({ group }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(group?.group_name || "");
    const [desc, setDesc] = useState(group?.group_description || "");

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e) => {
        e.preventDefault();

        startTransition(async () => {
            const { success } = await editGroup(group.id, {
                group_name: name,
                group_description: desc,
            });

            if (!success) {
                toast.error("Failed to update group");
                console.error(err);
                return;
            }

            toast.success("Group updated successfully");
            setOpen(false);
            router.refresh();
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="cursor-pointer hover:text-accent-foreground transition-colors outline-none">
                <Pen size={16} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Group</DialogTitle>
                    <DialogDescription>
                        Update the group details below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <FormLabel>Group Name</FormLabel>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Enter group description..."
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
