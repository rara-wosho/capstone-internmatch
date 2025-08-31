"use client";

import Form from "next/form";
import FormLabel from "./ui/FormLabel";
import { Input } from "./ui/input";
import { createInstructor } from "@/lib/actions/instructor";
import { toast } from "sonner";
import SubmitButton from "./ui/SubmitButton";

export default function AddInstructorForm() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const { success, data } = await createInstructor(formData);

        if (!success) {
            toast.error("Unable to add instructor");
            return;
        }

        if (data) {
            toast.success("Instructor added successfully");
            console.log(data);
        }
    };

    return (
        <div className="p-16 mx-auto w-lg">
            <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstname" placeholder="firstname" required />
                </div>
                <div className="mb-3">
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastname" placeholder="lastname" required />
                </div>
                <div className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        placeholder="email"
                        type="email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        placeholder="password"
                        required
                        type="password"
                    />
                </div>

                {/* <Button disabled={isPending}>Add Instructor</Button>  */}
                <SubmitButton>Submit</SubmitButton>
            </Form>
        </div>
    );
}
