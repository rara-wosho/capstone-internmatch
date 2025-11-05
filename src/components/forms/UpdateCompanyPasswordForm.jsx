"use client";

import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function UpdateCompanyPasswordForm() {
    return (
        <Form>
            <div className="mb-3">
                <FormLabel>Current Password</FormLabel>
                <Input name="current-password" />
            </div>
            <div className="mb-3">
                <FormLabel>New Password</FormLabel>
                <Input name="new-password" placeholder="Min of 6 characters" />
            </div>
            <div className="mb-3">
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                    name="confirm-password"
                    placeholder="Re-type new password"
                />
            </div>

            <div className="flex items-center justify-end py-3">
                <Button>Change Password</Button>
            </div>
        </Form>
    );
}
