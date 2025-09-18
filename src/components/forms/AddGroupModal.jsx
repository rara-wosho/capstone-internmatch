"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { CircleCheckBig, CirclePlus, Users } from "lucide-react";
import IconWrapper from "../ui/IconWrapper";
import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { toast } from "sonner";
import SubmitButton from "../ui/SubmitButton";
import { createGroup } from "@/lib/actions/group";
import { useSession } from "@/context/SessionContext";
import { useState } from "react";

export default function AddGroupModal() {
    const [open, setOpen] = useState(false);
    const [returnedValue, setReturnedValue] = useState({
        name: "",
        description: "",
    });

    async function handleCreateGroup(formData) {
        // formData.append("instructor-id", user?.id ?? null);
        const {
            success,
            returnedData: { name, description },
        } = await createGroup(formData);

        if (!success) {
            toast.error("Unable to add group", { position: "top-right" });
            setReturnedValue({ name, description });
            return;
        }

        toast.success("Group created successfully!", { position: "top-right" });
        setTimeout(() => {
            setOpen(false);
        }, 800);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button asChild className="grow md:grow-0">
                <DialogTrigger>
                    <CirclePlus /> New Group
                </DialogTrigger>
            </Button>
            <DialogContent className="overflow-y-auto max-h-[90svh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <IconWrapper>
                            <Users size={17} />
                        </IconWrapper>
                        New Group
                    </DialogTitle>
                    <DialogDescription>
                        Provide group details in the form below
                    </DialogDescription>
                </DialogHeader>

                <Form action={handleCreateGroup}>
                    <div className="mb-3">
                        <FormLabel htmlFor="name">Group Name</FormLabel>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={returnedValue.name}
                            placeholder="Awesome group"
                            required
                        />
                    </div>
                    <div className="mb-7">
                        <FormLabel htmlFor="description">
                            Description (Optional)
                        </FormLabel>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={returnedValue.description}
                            placeholder="This group is awesome..."
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" asChild>
                            <DialogClose>Cancel</DialogClose>
                        </Button>
                        <SubmitButton icon={<CircleCheckBig />}>
                            Add Group
                        </SubmitButton>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
