"use client";

import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { sendResetPasswordEmail } from "@/lib/actions/auth";
import { Loader } from "lucide-react";
import Form from "next/form";
import { useActionState } from "react";

export default function ForgotPasswordPage() {
    const [state, formAction, isPending] = useActionState(
        sendResetPasswordEmail,
        {
            success: false,
            error: "",
            message: "",
        }
    );

    const { success, error, message } = state;

    return (
        <div className="min-h-svh flex flex-col items-center justify-center p-3 md:p-5 relative">
            <div className="absolute text-sm p-3 left-0 top-0">
                <BackButton>Back</BackButton>
            </div>
            <Card className="p-3 md:p-5 w-full max-w-[400px]">
                <Form action={formAction} className="flex flex-col gap-y-3">
                    <div className="flex flex-col justify-center items-center py-4">
                        <SecondaryLabel>Forgot Password</SecondaryLabel>
                        <p className="text-sm text-muted-foreground text-center">
                            Enter the email address connected to your account.
                        </p>
                    </div>
                    <div>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            disabled={isPending}
                            placeholder="sample@gmail.com"
                        />
                    </div>
                    <Button disabled={isPending}>
                        {isPending && <Loader className="animate-spin" />} Send
                        reset password link
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
