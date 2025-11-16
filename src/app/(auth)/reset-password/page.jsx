"use client";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { createClient } from "@/lib/supabase/client";
import { Loader } from "lucide-react";
import Form from "next/form";
import { useState, useTransition } from "react";

export default function ResetPasswordPage() {
    const [isPending, startTransition] = useTransition();

    // Controlled form state
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [status, setStatus] = useState({ success: false, message: "" });

    const handleChangePassword = (e) => {
        e.preventDefault(); // Prevent form refresh

        // Validate inputs
        if (!newPassword || !confirmPassword) {
            return setStatus({
                success: false,
                message: "Please fill in all fields.",
            });
        }

        if (newPassword.length < 6) {
            return setStatus({
                success: false,
                message: "Password must be at least 6 characters.",
            });
        }

        if (newPassword !== confirmPassword) {
            return setStatus({
                success: false,
                message: "Passwords do not match.",
            });
        }

        // Start transition
        startTransition(async () => {
            const supabase = createClient();

            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                setStatus({
                    success: false,
                    message: error.message,
                });

                return;
            }

            setNewPassword("");
            setConfirmPassword("");

            setStatus({
                success: true,
                message:
                    "Password updated successfully. Please try refreshing the page or go to sign in page.",
            });
        });
    };

    return (
        <div className="min-h-svh flex flex-col items-center justify-center p-3 md:p-5">
            <Card className="p-3 md:p-5 w-full max-w-[400px]">
                <Form
                    onSubmit={handleChangePassword}
                    className="flex flex-col gap-y-3"
                >
                    <div className="flex flex-col justify-center items-center py-4">
                        <SecondaryLabel>Update Password</SecondaryLabel>
                        <p className="text-sm text-muted-foreground text-center">
                            You can now update your password.
                        </p>
                    </div>

                    <div>
                        <FormLabel>New Password</FormLabel>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={isPending}
                            placeholder="min of 6 characters"
                        />
                    </div>

                    <div>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isPending}
                            placeholder="Re-type your password"
                        />
                    </div>

                    <Button
                        disabled={isPending || !newPassword || !confirmPassword}
                    >
                        {isPending && (
                            <Loader className="animate-spin mr-2 h-4 w-4" />
                        )}
                        Update Password
                    </Button>

                    {status.message && (
                        <div
                            className={`rounded-sm text-sm border p-3 ${
                                status.success
                                    ? "border-green-500/30 text-green-600 dark:text-green-500 bg-green-500/10"
                                    : "border-destructive/40 text-destructive bg-destructive/10"
                            }`}
                        >
                            {status.message}
                        </div>
                    )}
                </Form>
            </Card>
        </div>
    );
}
