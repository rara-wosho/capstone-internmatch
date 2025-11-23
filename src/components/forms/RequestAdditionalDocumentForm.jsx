"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import SecondaryLabel from "../ui/SecondaryLabel";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import Form from "next/form";

export default function RequestAdditionalDocumentForm({
    selectedApplicants,
    setSelectedApplicants,
}) {
    const [loading, setLoading] = useState();

    const submit = (e) => {
        e.preventDefault();

        setLoading(true);
        setTimeout(() => {
            toast.success("Successfully submitted request form.");
            setLoading(false);
            setSelectedApplicants([]);
            e.target.reset();
        }, 1300);
    };

    return (
        <Form onSubmit={submit}>
            <div className="mb-6">
                <TertiaryLabel>Request additional documents</TertiaryLabel>
                <p className="text-sm text-muted-foreground">
                    This will be sent directly to the student's email address.
                </p>
            </div>

            <div className="mb-2 pb-2 border-b">
                <SecondaryLabel>Email Content</SecondaryLabel>
            </div>
            <div className="space-y-3 mb-3">
                <div>
                    <FormLabel>Subject</FormLabel>
                    <Input
                        required
                        defaultValue="Requesting for additional documents"
                        name="subject"
                    />
                </div>
                <div>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                        required
                        name="content"
                        placeholder="Enter content here..."
                    />
                </div>
            </div>

            <Button disabled={loading}>
                {loading && <Loader className="animate-spin" />}
                Send Request
            </Button>
        </Form>
    );
}
