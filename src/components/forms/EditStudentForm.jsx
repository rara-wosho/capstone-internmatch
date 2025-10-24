"use client";

import { useTransition } from "react";
import Form from "next/form";
import TitleText from "../ui/TitleText";
import BorderBox from "../ui/BorderBox";
import { Input } from "../ui/input";
import FormLabel from "../ui/FormLabel";
import { Button } from "../ui/button";
import { updateStudentDetails } from "@/lib/actions/student";
import { toast } from "sonner";

export default function EditStudentForm({ studentData }) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData) => {
        startTransition(async () => {
            try {
                const result = await updateStudentDetails(formData);

                if (!result.success) {
                    toast.error("Failed to update student details", {
                        description: result.error,
                    });
                    return;
                }
                toast.success("Student details updated successfully");
            } catch (error) {
                toast.error("Something went wrong.", {
                    description: error.message,
                });
            }
        });
    };

    return (
        <Form action={handleSubmit}>
            <input type="hidden" name="studentId" value={studentData.id} />

            <div className="bg-card shadow-xs rounded-xl mb-3">
                <div className="px-3 md:px-5 py-4 border-b">
                    <TitleText>Personal Information</TitleText>
                </div>
                <BorderBox className="space-y-2.5">
                    <div className="flex flex-wrap gap-2">
                        <div className="grow basis-[300px]">
                            <FormLabel>First Name</FormLabel>
                            <Input
                                name="firstname"
                                defaultValue={studentData.firstname || ""}
                                required
                            />
                        </div>
                        <div className="grow basis-[300px]">
                            <FormLabel>Middle Name (Optional)</FormLabel>
                            <Input
                                name="middlename"
                                defaultValue={studentData.middlename || ""}
                            />
                        </div>
                    </div>
                    <div>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            name="lastname"
                            defaultValue={studentData.lastname || ""}
                            required
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="grow basis-[200px]">
                            <FormLabel>Age</FormLabel>
                            <Input
                                required
                                name="age"
                                type="number"
                                defaultValue={studentData.age || ""}
                            />
                        </div>
                        <div className="grow basis-[200px]">
                            <FormLabel>Gender</FormLabel>
                            <Input
                                required
                                name="gender"
                                defaultValue={studentData.gender || ""}
                            />
                        </div>
                    </div>
                </BorderBox>
            </div>

            <div className="bg-card shadow-xs rounded-xl mb-3">
                <div className="px-3 md:px-5 py-4 border-b">
                    <TitleText>Address</TitleText>
                </div>
                <BorderBox className="space-y-2.5">
                    <div>
                        <FormLabel>Barangay</FormLabel>
                        <Input
                            required
                            name="barangay"
                            defaultValue={studentData.barangay || ""}
                        />
                    </div>
                    <div>
                        <FormLabel>City</FormLabel>
                        <Input
                            name="city"
                            required
                            defaultValue={studentData.city || ""}
                        />
                    </div>
                    <div>
                        <FormLabel>Province</FormLabel>
                        <Input
                            name="province"
                            required
                            defaultValue={studentData.province || ""}
                        />
                    </div>
                </BorderBox>
            </div>

            <div className="bg-card shadow-xs rounded-xl mb-3">
                <div className="px-3 md:px-5 py-4 border-b">
                    <TitleText>Academics</TitleText>
                </div>
                <BorderBox className="space-y-2.5">
                    <div>
                        <FormLabel>School</FormLabel>
                        <Input
                            name="school"
                            required
                            defaultValue={studentData.school || ""}
                        />
                    </div>
                    <div>
                        <FormLabel>Course</FormLabel>
                        <Input
                            name="course"
                            required
                            defaultValue={studentData.course || ""}
                        />
                    </div>
                </BorderBox>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </Form>
    );
}
