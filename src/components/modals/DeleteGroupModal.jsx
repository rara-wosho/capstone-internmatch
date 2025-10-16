"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { deleteGroup } from "@/lib/actions/group";
import { toast } from "sonner";

export default function DeleteGroupModal({ id }) {
    if (!id) {
        return null;
    }

    const [isPending, startTransition] = useTransition();

    const handleDeleteGroup = () => {
        startTransition(async () => {
            const result = await deleteGroup(id);

            if (!result.success) {
                toast.error(result?.error);
                return;
            }
        });
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button disabled={isPending} variant="dangerOutline" size="sm">
                    {isPending ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <Trash />
                    )}
                    {isPending ? "Deleting Group" : "Delete Group"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Do you want to delete this group?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteGroup}>
                        Yes, Delete Group
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
