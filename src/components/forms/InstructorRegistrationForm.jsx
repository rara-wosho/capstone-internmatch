"use client";

import { submitRegistration } from "@/lib/actions/instructor";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import TertiaryLabel from "../ui/TertiaryLabel";
import { AlertCircle, FileWarning, Loader } from "lucide-react";
import { toast } from "sonner";

export default function InstructorRegistrationForm() {
    const formRef = useRef(null);

    const [state, formAction, isPending] = useActionState(submitRegistration, {
        success: false,
        error: "",
        time: 0,
        formData: null,
    });

    useEffect(() => {
        // Only show toasts when there's actually a message
        if (state.success) {
            toast.success("Submitted successfully.");
        } else if (state.error) {
            window.scrollTo({ top: 0, behavior: "smooth" });

            toast.error(state.error);
        }
    }, [state.time]);

    return (
        <>
            {state.error && (
                <div className="mb-3 border gap-2 flex items-center rounded-lg border-red-500/30 bg-red-500/5 p-3 text-red-700 dark:text-red-400">
                    <AlertCircle size={17} className="shrink-0" />{" "}
                    <p>{state.error}</p>
                </div>
            )}
            <Form
                ref={formRef}
                action={formAction}
                className="shadow-xs rounded-xl"
            >
                <div className="bg-card p-3 md:p-5 lg:p-8 rounded-t-xl border-b">
                    <p className="text-sm text-muted-foreground mb-3">
                        All fields are required
                    </p>
                    <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                defaultValue={state?.formData?.firstname || ""}
                                name="firstName"
                                placeholder="Mark"
                                required
                                disabled={isPending}
                            />
                        </div>
                        <div>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                defaultValue={state?.formData?.lastname || ""}
                                name="lastName"
                                placeholder="Reyes"
                                required
                                disabled={isPending}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <FormLabel>Valid Email Address</FormLabel>
                        <Input
                            defaultValue={state?.formData?.email || ""}
                            name="email"
                            type="email"
                            placeholder="sample@gmail.com"
                            required
                            disabled={isPending}
                        />
                    </div>
                    <div className="mb-3">
                        <FormLabel>Institution/School</FormLabel>
                        <Input
                            defaultValue={state?.formData?.school || ""}
                            name="school"
                            placeholder="Montello High College"
                            required
                            disabled={isPending}
                        />
                    </div>
                </div>
                <div className="bg-card p-3 md:p-5 lg:p-8 border-b">
                    <div className="mb-3">
                        <FormLabel>Barangay</FormLabel>
                        <Input
                            defaultValue={state?.formData?.barangay || ""}
                            name="barangay"
                            placeholder="San Isidro"
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div className="mb-3">
                        <FormLabel>City/Municipality</FormLabel>
                        <Input
                            defaultValue={state?.formData?.city || ""}
                            name="city"
                            placeholder="Davao City"
                            required
                            disabled={isPending}
                        />
                    </div>
                    <div className="mb-3">
                        <FormLabel>Province</FormLabel>
                        <Input
                            defaultValue={state?.formData?.province || ""}
                            name="province"
                            placeholder="Davao del Sur"
                            required
                            disabled={isPending}
                        />
                    </div>
                </div>
                <div className="bg-card p-3 md:p-5 lg:p-8 rounded-b-xl">
                    <TertiaryLabel>Verification Documents</TertiaryLabel>

                    <p className="mb-1 mt-4">Requirements</p>
                    <ul className="list-disc ps-3 text-sm text-muted-foreground mb-4">
                        <li>Valid ID (Government-issued)</li>
                        <li>
                            Certificate of Employment or Teaching Credentials
                        </li>
                    </ul>
                    <p className="mb-1 mt-4">Steps</p>
                    <ul className="list-decimal ps-3 text-sm text-muted-foreground mb-5">
                        <li>Upload your documents to Google Drive</li>
                        <li>
                            Set sharing permissions to "Anyone with the link can
                            view"
                        </li>
                        <li>Copy and paste the link below</li>
                    </ul>
                    <div className="mb-3">
                        <FormLabel>Google Drive Link to Documents</FormLabel>
                        <Input
                            defaultValue={state?.formData?.documents_link || ""}
                            name="documentsLink"
                            type="url"
                            placeholder="https://drive.google.com/sampleId"
                            required
                            disabled={isPending}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                            For pilot testing, just type "https://"
                        </p>
                    </div>

                    <div className="mt-4 md:mt-6 flex sm:justify-end gap-2 flex-wrap">
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={() => formRef.current.reset()}
                        >
                            Reset Form
                        </Button>
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="grow sm:grow-0"
                        >
                            {isPending && <Loader className="animate-spin" />}
                            {isPending ? "Submitting..." : "Submit Form"}
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
}
