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
import { Button } from "./button";
import { useState, useTransition } from "react";
import { Loader } from "lucide-react";

export default function AlertModal({
    children,
    alertTitle,
    alertMessage,
    cancelLabel,
    alertAction,
    actionLabel,
    type = "danger",
}) {
    const [isPending, startTransition] = useTransition();

    const handleClickAction = () => {
        startTransition(async () => {
            await alertAction();
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {alertMessage}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                    <Button
                        disabled={isPending}
                        onClick={handleClickAction}
                        variant={type === "danger" ? "destructive" : "default"}
                    >
                        {isPending && <Loader className="animate-spin" />}
                        {actionLabel}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
