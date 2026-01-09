"use client";

import Form from "next/form";
import BorderBox from "../ui/BorderBox";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useActionState, useEffect, useMemo, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import provinces from "@/address-data/province.json";
import cities from "@/address-data/city.json";
import barangays from "@/address-data/barangay.json";

import { updateInstructorProfile } from "@/lib/actions/instructor";
import { toast } from "sonner";
import { CircleX, Edit2, PenLine, X } from "lucide-react";

export default function InstructorEditProfileForm({ userId, instructorData }) {
    const [editAddress, setEditAddress] = useState(false);

    const [state, formAction, isPending] = useActionState(
        updateInstructorProfile,
        null
    );

    // For data to be appended in the form
    const [barangay, setBarangay] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");

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

    // Show success/error toast
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
        } else if (state?.errors?.general) {
            toast.error(state.errors.general);
        }
    }, [state]);

    const handleSaveChanges = async (formData) => {
        setEditAddress(false);

        if (province) {
            formData.set("province", province || instructorData?.province);
        }
        if (city) {
            formData.set("city", city || instructorData?.city);
        }
        if (barangay) {
            formData.set("barangay", barangay || instructorData?.barangay);
        }

        return formAction(formData);
    };

    return (
        <Form action={handleSaveChanges}>
            {/* Hidden input for instructor ID */}
            <input type="hidden" name="instructorId" value={userId} />

            <BorderBox>
                {/* PERSONAL INFO  */}
                <h2 className="font-semibold text-lg mb-2">
                    Instructor Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-5">
                    <div>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            name="firstname"
                            required
                            defaultValue={instructorData.firstname}
                            placeholder="Enter your first name"
                            aria-invalid={!!state?.errors?.firstname}
                        />
                        {state?.errors?.firstname && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.firstname}
                            </p>
                        )}
                    </div>
                    <div>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            name="lastname"
                            required
                            defaultValue={instructorData.lastname}
                            placeholder="Enter your last name"
                            aria-invalid={!!state?.errors?.lastname}
                        />
                        {state?.errors?.lastname && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.lastname}
                            </p>
                        )}
                    </div>
                    <div>
                        <FormLabel>Middle Name (Optional)</FormLabel>
                        <Input
                            name="middlename"
                            defaultValue={instructorData.middlename}
                            placeholder="Enter your middle name"
                        />
                    </div>
                    <div>
                        <FormLabel>Suffix (Optional)</FormLabel>
                        <Input
                            name="suffix"
                            defaultValue={instructorData?.suffix}
                            placeholder="e.g., Jr./Sr."
                        />
                    </div>
                    <div>
                        <FormLabel>Age</FormLabel>
                        <Input
                            name="age"
                            type="number"
                            required
                            min="18"
                            max="100"
                            defaultValue={instructorData.age}
                            placeholder="Your age"
                            aria-invalid={!!state?.errors?.age}
                        />
                        {state?.errors?.age && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.age}
                            </p>
                        )}
                    </div>
                    <div>
                        <FormLabel>Gender</FormLabel>
                        <Select
                            name="gender"
                            required
                            defaultValue={instructorData.gender}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors?.gender && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.gender}
                            </p>
                        )}
                    </div>
                </div>

                {/* ACADEMICS  */}
                <h2 className="font-semibold text-lg mb-2">Academic</h2>
                <div className="mb-5">
                    <div>
                        <FormLabel>School</FormLabel>
                        <Input
                            name="school"
                            required
                            defaultValue={instructorData.school}
                            placeholder="University of Mindanao"
                            aria-invalid={!!state?.errors?.school}
                        />
                        {state?.errors?.school && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.school}
                            </p>
                        )}
                    </div>
                </div>

                {/* ADDRESS  */}
                <h2 className="font-semibold text-lg mb-2  border-t mt-7 pt-5 flex">
                    Current Address{" : "}
                    <span className="font-normal">
                        {instructorData?.barangay}, {instructorData?.city},{" "}
                        {instructorData?.province}
                    </span>
                    <button
                        onClick={() => setEditAddress(!editAddress)}
                        type="button"
                        className="text-accent-foreground ms-2 cursor-pointer"
                    >
                        {editAddress ? (
                            <span className="text-sm font-normal">Cancel</span>
                        ) : (
                            <PenLine size={16} />
                        )}
                    </button>
                </h2>

                {editAddress && (
                    <>
                        <p className="mb-2 text-sm text-muted-foreground">
                            You can update your address below
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-5">
                            {/* SELECT PROVINCE  */}
                            <div>
                                <FormLabel>Province</FormLabel>
                                <Select
                                    defaultValue=""
                                    onValueChange={(value) => {
                                        const province = provinces.find(
                                            (p) => p.province_code === value
                                        );

                                        setProvinceCode(value);
                                        setCityCode("");
                                        setProvince(
                                            province?.province_name || ""
                                        );
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

                            {/* SELECT CITY  */}
                            <div>
                                <FormLabel>City/Municipality</FormLabel>

                                <Select
                                    name="city"
                                    defaultValue=""
                                    disabled={!provinceCode}
                                    onValueChange={(value) => {
                                        const city = filteredCities.find(
                                            (c) => c.city_code === value
                                        );

                                        setCityCode(value);
                                        setCity(city?.city_name || "");
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select City" />
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

                            {/* SELECT BARANGAY  */}
                            <div>
                                <FormLabel>Barangay</FormLabel>
                                <Select
                                    defaultValue=""
                                    disabled={!cityCode}
                                    onValueChange={(value) => {
                                        const barangay = filteredBarangays.find(
                                            (b) => b.brgy_code === value
                                        );

                                        setBarangayCode(value);
                                        setBarangay(barangay?.brgy_name);
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
                            {/* <div>
                        <FormLabel>Barangay</FormLabel>
                        <Input
                            name="barangay"
                            required
                            defaultValue={instructorData.barangay}
                            placeholder="Bagong Silang"
                            aria-invalid={!!state?.errors?.barangay}
                        />
                        {state?.errors?.barangay && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.barangay}
                            </p>
                        )}
                    </div>
                    <div>
                        <FormLabel>City/Municipality</FormLabel>
                        <Input
                            name="city"
                            required
                            defaultValue={instructorData.city}
                            placeholder="Iligan City"
                            aria-invalid={!!state?.errors?.city}
                        />
                        {state?.errors?.city && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.city}
                            </p>
                        )}
                    </div>
                    <div>
                        <FormLabel>Province</FormLabel>
                        <Input
                            name="province"
                            required
                            defaultValue={instructorData.province}
                            placeholder="Lanao Del Norte"
                            aria-invalid={!!state?.errors?.province}
                        />
                        {state?.errors?.province && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.province}
                            </p>
                        )}
                    </div> */}
                        </div>
                    </>
                )}

                <div className="mb-2 md:mb-0 flex justify-end">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </BorderBox>
        </Form>
    );
}
