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
import { Plus, Users } from "lucide-react";
import IconWrapper from "../ui/IconWrapper";
import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function AddGroupModal() {
    return (
        <Dialog>
            <Button asChild className="grow md:grow-0">
                <DialogTrigger>
                    New Group <Plus />
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
                <Form>
                    <div className="mb-3">
                        <FormLabel>Group Name</FormLabel>
                        <Input placeholder="Awesome group" />
                    </div>
                    <div className="mb-7">
                        <FormLabel>Description (Optional)</FormLabel>
                        <Textarea placeholder="This group is awesome..." />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" asChild>
                            <DialogClose>Cancel</DialogClose>
                        </Button>
                        <Button>Save New Group</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
