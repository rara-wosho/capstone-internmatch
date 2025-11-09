"use client";

import React, { useTransition } from "react";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { updateCompanyDetails } from "@/lib/actions/company";
import { toast } from "sonner";
import { Check, Loader } from "lucide-react";

export default function UpdateCompanyDetailsForm({ defaultFormData }) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        startTransition(async () => {
            const result = await updateCompanyDetails(formData);
            if (!result.success) {
                toast.error("Unable to update details.", {
                    description: result.error,
                });
                return;
            }

            toast.success("Details saved successfully.");
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <input
                type="hidden"
                name="company-id"
                defaultValue={defaultFormData.id}
            />

            {/* --- Company Info --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                    <FormLabel>Company Name</FormLabel>
                    <Input
                        required
                        name="name"
                        defaultValue={defaultFormData.name}
                        placeholder="Enter company name"
                    />
                </div>

                <div className="sm:col-span-2">
                    <FormLabel>About Company</FormLabel>
                    <Textarea
                        name="details"
                        rows={4}
                        defaultValue={defaultFormData.details}
                        placeholder="Describe your company..."
                    />
                </div>

                <div>
                    <FormLabel>Phone</FormLabel>
                    <Input
                        name="phone"
                        defaultValue={defaultFormData.phone}
                        placeholder="Enter company phone number"
                    />
                </div>

                <div>
                    <FormLabel>Website</FormLabel>
                    <Input
                        name="website"
                        defaultValue={defaultFormData.website}
                        placeholder="https://yourcompany.com"
                    />
                </div>
            </div>

            {/* --- Address --- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                    <FormLabel>Barangay</FormLabel>
                    <Input
                        required
                        name="barangay"
                        defaultValue={defaultFormData.barangay}
                        placeholder="Enter barangay"
                    />
                </div>

                <div>
                    <FormLabel>City or Municipality</FormLabel>
                    <Input
                        required
                        name="city"
                        defaultValue={defaultFormData.city}
                        placeholder="Enter city"
                    />
                </div>

                <div>
                    <FormLabel>Province</FormLabel>
                    <Input
                        required
                        name="province"
                        defaultValue={defaultFormData.province}
                        placeholder="Enter province"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <Check />
                    )}
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
