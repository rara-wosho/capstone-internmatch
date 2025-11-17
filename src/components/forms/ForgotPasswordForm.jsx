"use client";

import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { sendResetPasswordEmail } from "@/lib/actions/auth";
import { Loader } from "lucide-react";
import Form from "next/form";
import { useActionState } from "react";
import BackButton from "../ui/BackButton";
import Card from "../ui/card";
import { Button } from "../ui/button";

export default function ForgotPasswordForm({ type }) {
    const [state, formAction, isPending] = useActionState(
        sendResetPasswordEmail,
        {
            success: false,
            error: "",
            message: "",
        }
    );

    const { success, error, message } = state;

    // Dynamic texts based on type
    const isFromPasswordChange = type === "password-changed";

    const title = isFromPasswordChange
        ? "Update Your Password"
        : "Forgot Password";

    const helperMessage = isFromPasswordChange
        ? "It looks like your password was recently changed. Enter your email to request a new reset link if this wasn’t you."
        : "Enter the email address connected to your account.";

    return (
        <div className="min-h-svh flex flex-col items-center justify-center p-3 md:p-5 relative">
            <div className="absolute text-sm p-3 left-0 top-0">
                <BackButton>Back</BackButton>
            </div>

            <Card className="p-3 md:p-5 w-full max-w-[400px]">
                <Form action={formAction} className="flex flex-col gap-y-3">
                    <div className="flex flex-col justify-center items-center py-2">
                        <SecondaryLabel>{title}</SecondaryLabel>
                        <p className="text-sm text-muted-foreground text-center mt-1">
                            {helperMessage}
                        </p>
                    </div>

                    <div>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            disabled={isPending}
                            placeholder="sample@gmail.com"
                        />
                    </div>

                    <Button disabled={isPending}>
                        {isPending && <Loader className="animate-spin mr-2" />}
                        Send reset password link
                    </Button>

                    {error && (
                        <div className="text-sm rounded-sm border p-3">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-sm rounded-sm border p-3 border-green-500/30 text-green-600 dark:text-green-500 bg-green-500/10">
                            {message}
                        </div>
                    )}
                </Form>
            </Card>
        </div>
    );
}
