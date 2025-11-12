"use client";

import Form from "next/form";
import BorderBox from "../ui/BorderBox";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { updateInstructorProfile } from "@/lib/actions/instructor";
import { toast } from "sonner";

export default function InstructorEditProfileForm({ userId, instructorData }) {
    const [state, formAction, isPending] = useActionState(
        updateInstructorProfile,
        null
    );

    // Show success/error toast
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
        } else if (state?.errors?.general) {
            toast.error(state.errors.general);
        }
    }, [state]);

    return (
        <Form action={formAction}>
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
                            placeholder="John"
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
                            placeholder="Doe"
                            aria-invalid={!!state?.errors?.lastname}
                        />
                        {state?.errors?.lastname && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.errors.lastname}
                            </p>
                        )}
                    </div>
                    <div>
                        <FormLabel>Middle Name</FormLabel>
                        <Input
                            name="middlename"
                            defaultValue={instructorData.middlename}
                            placeholder="Brown"
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
                <h2 className="font-semibold text-lg mb-2">Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-5">
                    <div>
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
                    </div>
                </div>

                <div className="mb-2 md:mb-0 flex justify-end">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </BorderBox>
        </Form>
    );
}
