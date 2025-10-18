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

export default function CreateStudentAccountForm9({ groupId, school }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middlename: "",
        school,
        course: "",
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

        const {
            firstName,
            lastName,
            school,
            email,
            password,
            confirmPassword,
            course,
        } = formData;

        // Required fields check
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !school.trim() ||
            !course.trim()
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Email format check (simple pattern)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // Password length
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        // Password match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        // Submit
        const { success, error } = await createStudentAccount(
            formData,
            groupId
        );

        if (!success) {
            toast.error(error || "Failed to create account.");
            return;
        }

        toast.success("Account created successfully.");
        router.replace("/student/interests?onboarding=yes");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-lg w-full md:px-4"
        >
            {/* Personal Info */}
            <h4 className="font-medium mb-1">Personal Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
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
                <div className="col-span-1 sm:col-span-2">
                    <FormLabel>Middle Name (Optional)</FormLabel>
                    <Input
                        name="middlename"
                        placeholder="Rivero"
                        value={formData.middlename}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Academics  */}
            <h4 className="font-medium mb-1">Academics</h4>
            <div className="mb-5">
                <div className="mb-3">
                    <FormLabel>School</FormLabel>
                    <Input
                        required
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        placeholder="University of Science and Technology of Southern Philippines"
                    />
                </div>
                <div className="mb-3">
                    <FormLabel>Course</FormLabel>
                    <Input placeholder="Bachelor of Science in Information Technology" />
                </div>
            </div>

            <h4 className="font-medium mb-1">Account Credentials</h4>
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
