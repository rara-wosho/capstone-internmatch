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
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ChangePasswordForm from "./ChangePasswordForm";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function EditStudentForm({ isOnboarding, studentData }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

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
                if (isOnboarding) {
                    toast.success("Student details saved successfully", {
                        description: "Redirecting to dashboard.",
                    });
                    router.replace("/student");
                } else {
                    toast.success("Student details saved successfully");
                }
            } catch (error) {
                toast.error("Something went wrong.", {
                    description: error.message,
                });
            }
        });
    };

    return (
        <div className="border rounded-xl bg-card">
            <Tabs defaultValue="account">
                <div className="border-b px-3 md:px-5">
                    <TabsList className="h-[50px] space-x-2">
                        <TabsTrigger value="account">Account Info</TabsTrigger>
                        <TabsTrigger value="change-password">
                            Change Password
                        </TabsTrigger>
                    </TabsList>
                </div>
                <BorderBox>
                    <TabsContent value="account">
                        <Form action={handleSubmit}>
                            <input
                                type="hidden"
                                name="studentId"
                                value={studentData.id}
                            />
                            <div className="bg-card shadow-xs rounded-xl mb-3">
                                <div className="pb-2">
                                    <TitleText>Personal Information</TitleText>
                                </div>
                                <div className="space-y-2.5">
                                    <div className="flex flex-wrap gap-2">
                                        <div className="grow basis-[300px]">
                                            <FormLabel>First Name</FormLabel>
                                            <Input
                                                name="firstname"
                                                defaultValue={
                                                    studentData.firstname || ""
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="grow basis-[300px]">
                                            <FormLabel>
                                                Middle Name (Optional)
                                            </FormLabel>
                                            <Input
                                                name="middlename"
                                                defaultValue={
                                                    studentData.middlename || ""
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            name="lastname"
                                            defaultValue={
                                                studentData.lastname || ""
                                            }
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
                                                defaultValue={
                                                    studentData.age || ""
                                                }
                                            />
                                        </div>
                                        <div className="grow basis-[200px]">
                                            <FormLabel>Gender</FormLabel>
                                            <Select
                                                name="gender"
                                                required
                                                defaultValue={
                                                    studentData?.gender
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem value="female">
                                                        Female
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card shadow-xs rounded-xl mb-3">
                                <div className="pb-2">
                                    <TitleText>Address</TitleText>
                                </div>
                                <div className="space-y-2.5">
                                    <div>
                                        <FormLabel>Barangay</FormLabel>
                                        <Input
                                            required
                                            name="barangay"
                                            defaultValue={
                                                studentData.barangay || ""
                                            }
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>City/Municipality</FormLabel>
                                        <Input
                                            name="city"
                                            required
                                            defaultValue={
                                                studentData.city || ""
                                            }
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Province</FormLabel>
                                        <Input
                                            name="province"
                                            required
                                            defaultValue={
                                                studentData.province || ""
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card shadow-xs rounded-xl mb-3">
                                <div className="pb-2">
                                    <TitleText>Academics</TitleText>
                                </div>
                                <div className="space-y-2.5">
                                    <div>
                                        <FormLabel>School</FormLabel>
                                        <Input
                                            name="school"
                                            required
                                            defaultValue={
                                                studentData.school || ""
                                            }
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Course</FormLabel>
                                        <Input
                                            name="course"
                                            required
                                            defaultValue={
                                                studentData.course || ""
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="submit" disabled={isPending}>
                                    {isPending
                                        ? "Saving Details..."
                                        : "Save Profile Details"}
                                </Button>
                            </div>
                        </Form>
                    </TabsContent>

                    <TabsContent value="change-password">
                        <ChangePasswordForm email={studentData.email} />
                    </TabsContent>
                </BorderBox>
            </Tabs>
        </div>
    );
}
