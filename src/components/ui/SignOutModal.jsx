"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { signOut } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Button } from "./button";
import { Loader, LogOut } from "lucide-react";

export default function SignOutModal({ children }) {
    const [open, setOpen] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleSignOut = () => {
        startTransition(async () => {
            const res = await signOut();

            if (res?.success === false) {
                toast.error(res.message ?? "Unable to sign you out");
            }
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you signing out?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You can always sign back in at any time.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={handleSignOut} disabled={isPending}>
                        Sign Out
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <LogOut />
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
