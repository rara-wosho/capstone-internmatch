"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import provinces from "@/address-data/province.json";
import cities from "@/address-data/city.json";
import barangays from "@/address-data/barangay.json";

import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import SubmitButton from "../ui/SubmitButton";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Textarea } from "../ui/textarea";

import { createCompanyAccount } from "@/lib/actions/company";
import { useRouter } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

    // For select philippines address dropdown
    const [provinceCode, setProvinceCode] = useState("");
    const [cityCode, setCityCode] = useState("");
    const [barangayCode, setBarangayCode] = useState("");

    // Derived filtered lists - memoized to avoid re-filtering on every render
    const filteredCities = useMemo(
        () => cities.filter((c) => c.province_code === provinceCode),
        [provinceCode]
    );

    const filteredBarangays = useMemo(
        () => barangays.filter((b) => b.city_code === cityCode),
        [cityCode]
    );

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
                                required
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                placeholder="Enter your company name"
                            />
                        </div>
                        <div>
                            <FormLabel>About Company</FormLabel>
                            <Textarea
                                required
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
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div>
                            <FormLabel>Website (optional)</FormLabel>
                            <Input
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                placeholder="e.g., https://www.deverian.com"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <TertiaryLabel className="mb-3">Address</TertiaryLabel>

                    {/* Province */}
                    <div className="mb-3">
                        <FormLabel>Province</FormLabel>
                        <Select
                            value={provinceCode}
                            onValueChange={(value) => {
                                const province = provinces.find(
                                    (p) => p.province_code === value
                                );

                                setProvinceCode(value);
                                setCityCode("");

                                setForm((prev) => ({
                                    ...prev,
                                    province: province?.province_name || "",
                                    city: "",
                                    barangay: "",
                                }));
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select province" />
                            </SelectTrigger>

                            <SelectContent>
                                {provinces.map((p) => (
                                    <SelectItem
                                        key={p.province_code}
                                        value={p.province_code}
                                    >
                                        {p.province_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* City / Municipality */}
                    <div className="mb-3">
                        <FormLabel>Municipality / City</FormLabel>
                        <Select
                            value={cityCode}
                            disabled={!provinceCode}
                            onValueChange={(value) => {
                                const city = filteredCities.find(
                                    (c) => c.city_code === value
                                );

                                setCityCode(value);

                                setForm((prev) => ({
                                    ...prev,
                                    city: city?.city_name || "",
                                    barangay: "",
                                }));
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={
                                        provinceCode
                                            ? "Select city / municipality"
                                            : "Select province first"
                                    }
                                />
                            </SelectTrigger>

                            <SelectContent>
                                {filteredCities.map((c) => (
                                    <SelectItem
                                        key={c.city_code}
                                        value={c.city_code}
                                    >
                                        {c.city_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Barangay */}
                    <div className="mb-3">
                        <FormLabel>Barangay</FormLabel>
                        <Select
                            value={barangayCode}
                            disabled={!cityCode}
                            onValueChange={(value) => {
                                const barangay = filteredBarangays.find(
                                    (b) => b.brgy_code === value
                                );

                                setBarangayCode(value);

                                setForm((prev) => ({
                                    ...prev,
                                    barangay: barangay?.brgy_name || "",
                                }));
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={
                                        cityCode
                                            ? "Select barangay"
                                            : "Select city first"
                                    }
                                />
                            </SelectTrigger>

                            <SelectContent>
                                {filteredBarangays.map((b) => (
                                    <SelectItem
                                        key={b.brgy_code}
                                        value={b.brgy_code}
                                    >
                                        {b.brgy_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mb-8">
                    <TertiaryLabel className="mb-3">
                        Account Credentials
                    </TertiaryLabel>
                    <div className="mb-3">
                        <FormLabel>Email</FormLabel>
                        <Input
                            required
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="deverian@sample.com"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <FormLabel>Password</FormLabel>
                            <Input
                                required
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
                                required
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Repeat password"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 mb-1 flex justify-end">
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
