"use client";

import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { updatePassword } from "@/lib/actions/auth";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function ChangePasswordForm({ email }) {
    const [isPending, startTransition] = useTransition();

    const handleChangePassword = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        startTransition(async () => {
            const result = await updatePassword(formData);
            if (result.success) {
                toast.success(result.message);
                e.target.reset();
            } else {
                toast.error(result.error);
            }
        });
    };
    return (
        <Form onSubmit={handleChangePassword}>
            {/* HIDDEN EMAIL INPUT FOR SIGNINWITHPASSWORD */}
            <input type="hidden" name="email" defaultValue={email} />
            <div className="mb-3">
                <FormLabel>Current Password</FormLabel>
                <Input type="password" required name="current-password" />
            </div>
            <div className="mb-3">
                <FormLabel>New Password</FormLabel>
                <Input
                    required
                    type="password"
                    name="new-password"
                    placeholder="Min of 6 characters"
                />
            </div>
            <div className="mb-3">
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                    required
                    type="password"
                    name="confirm-password"
                    placeholder="Re-type new password"
                />
            </div>
            <p className="text-xs text-muted-foreground">
                Changing your password will sign you out of all other active
                sessions.
            </p>

            <div className="flex items-center justify-end py-3">
                <Button disabled={isPending}>
                    {isPending && <Loader className="animate-spin" />}
                    {isPending ? "Please wait" : "Change Password"}
                </Button>
            </div>
        </Form>
    );
}
