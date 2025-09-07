"use client";

import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/SubmitButton";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createStudentAccount } from "@/lib/actions/student";
import { useRouter } from "next/navigation";

export default function CreateStudentAccountForm9({ groupId }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check password length
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long.", {
                position: "top-center",
            });
            return;
        }

        // Check password match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.", { position: "top-center" });
            return;
        }

        // If all goods
        const { success, error } = await createStudentAccount(
            formData,
            groupId
        );

        if (!success) {
            toast.error(error);
            return;
        }

        // toast.success("Account created successfully!");
        router.replace("/interests");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-lg w-full md:px-4"
        >
            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                    <FormLabel>First Name</FormLabel>
                    <Input
                        required
                        name="firstName"
                        placeholder="Tyrelle"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        required
                        name="lastName"
                        placeholder="Constello"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Credentials */}
            <div className="mb-8">
                <div className="grid grid-cols-1 gap-3">
                    <div>
                        <FormLabel>Email</FormLabel>
                        <Input
                            required
                            name="email"
                            type="email"
                            placeholder="tyrelle@sample.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <FormLabel>Password</FormLabel>
                        <Input
                            required
                            name="password"
                            type="password"
                            placeholder="Minimum of 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            required
                            name="confirmPassword"
                            type="password"
                            placeholder="Repeat password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* cta buttons */}
            <p className="text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link
                    href="/terms-conditions"
                    className="text-accent-foreground"
                >
                    terms and conditions
                </Link>
            </p>
            {/* Actions */}
            <div className="flex flex-col gap-3 mt-3">
                <SubmitButton>Create Account</SubmitButton>
                <div className="relative border-b inline-flex my-7">
                    <p className="bg-white dark:bg-background text-center leading-2 p-3 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap">
                        Already have an account?
                    </p>
                </div>

                <Button variant="outline" type="button" asChild>
                    <Link href="/sign-in">
                        <p>Sign in instead</p>
                        <ArrowRight />
                    </Link>
                </Button>
            </div>
        </form>
    );
}
