"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import SubmitButton from "../ui/SubmitButton";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Textarea } from "../ui/textarea";

import { createCompanyAccount } from "@/lib/actions/company";
import { useRouter } from "next/navigation";

export default function CreateCompanyAccountForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        companyName: "",
        description: "",
        barangay: "",
        city: "",
        province: "",
        phone: "",
        website: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (
            !form.companyName ||
            !form.description ||
            !form.barangay ||
            !form.city ||
            !form.province ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {
            toast.error("All required fields must be filled out.");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        // Call server action
        startTransition(async () => {
            const { success, message } = await createCompanyAccount(form);

            if (!success) {
                toast.error(message || "Failed to create account.");
                return;
            }

            toast.success(message);
            setForm({
                companyName: "",
                description: "",
                barangay: "",
                city: "",
                province: "",
                phone: "",
                website: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setTimeout(() => {
                router.replace("/company");
            }, 1000);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <TertiaryLabel className="mb-3">
                        Company Information
                    </TertiaryLabel>
                    <div className="grid grid-cols-1 gap-3 mb-3">
                        <div>
                            <FormLabel>Company Name</FormLabel>
                            <Input
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                placeholder="Deverian Corporation"
                            />
                        </div>
                        <div>
                            <FormLabel>Company description</FormLabel>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Tell something about your company"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <FormLabel>Phone (optional)</FormLabel>
                            <Input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="09123456789"
                            />
                        </div>
                        <div>
                            <FormLabel>Website (optional)</FormLabel>
                            <Input
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                placeholder="https://www.deverian.com"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <TertiaryLabel className="mb-3">Address</TertiaryLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 mb-3">
                        <div>
                            <FormLabel>Barangay/Street</FormLabel>
                            <Input
                                name="barangay"
                                type="text"
                                value={form.barangay}
                                onChange={handleChange}
                                placeholder="Zone 2, Tipanoy Landless"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <FormLabel>Municipality/City</FormLabel>
                            <Input
                                name="city"
                                type="text"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="Iligan City"
                            />
                        </div>
                        <div>
                            <FormLabel>Province</FormLabel>
                            <Input
                                name="province"
                                type="text"
                                value={form.province}
                                onChange={handleChange}
                                placeholder="Lanao Del Norte"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <TertiaryLabel className="mb-3">
                        Account Credentials
                    </TertiaryLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 mb-3">
                        <div>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="deverian@sample.com"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <FormLabel>Password</FormLabel>
                            <Input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="min of 6 characters"
                            />
                        </div>
                        <div>
                            <FormLabel>Confirm password</FormLabel>
                            <Input
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Repeat password"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-8 flex justify-end">
                    <SubmitButton
                        className="grow sm:grow-0"
                        disabled={isPending}
                    >
                        {isPending ? "Creating..." : "Create account"}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}
