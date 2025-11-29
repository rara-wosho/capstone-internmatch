"use client";

import { submitRegistration } from "@/lib/actions/instructor";
import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Form from "next/form";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import TertiaryLabel from "../ui/TertiaryLabel";
import { AlertCircle, Check, Loader, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

export default function InstructorRegistrationForm() {
    const formRef = useRef(null);

    const [state, formAction, isPending] = useActionState(submitRegistration, {
        success: false,
        error: "",
        time: 0,
        formData: null,
    });

    // File states
    const [validIdFile, setValidIdFile] = useState(null);
    const [credentialFile, setCredentialFile] = useState(null);
    const [uploadingValidId, setUploadingValidId] = useState(false);
    const [uploadingCredential, setUploadingCredential] = useState(false);
    const [validIdUrl, setValidIdUrl] = useState("");
    const [credentialUrl, setCredentialUrl] = useState("");

    const uploadFileToSupabase = async (file, fileType) => {
        try {
            const supabase = createClient();
            const fileExt = file.name.split(".").pop();
            const timestamp = Date.now();
            const fileName = `instructor_registrations/${fileType}_${timestamp}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from("files")
                .upload(fileName, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw error;

            // Get public URL
            const {
                data: { publicUrl },
            } = supabase.storage.from("files").getPublicUrl(fileName);

            return { url: publicUrl, error: null };
        } catch (err) {
            return { url: null, error: err.message };
        }
    };

    const handleValidIdUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type (images only)
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];
        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Please upload an image file (JPEG, PNG, or WebP) for your Valid ID."
            );
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Valid ID file must be less than 5MB.");
            return;
        }

        setUploadingValidId(true);
        const { url, error } = await uploadFileToSupabase(file, "valid_id");
        setUploadingValidId(false);

        if (error) {
            toast.error("Failed to upload Valid ID.", { description: error });
            return;
        }

        setValidIdFile(file);
        setValidIdUrl(url);
        toast.success("Valid ID uploaded successfully!");
    };

    const handleCredentialUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type (images and PDFs)
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Please upload an image, PDF, or Word document for your Teaching Credential."
            );
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Teaching Credential file must be less than 5MB.");
            return;
        }

        setUploadingCredential(true);
        const { url, error } = await uploadFileToSupabase(
            file,
            "teaching_credential"
        );
        setUploadingCredential(false);

        if (error) {
            toast.error("Failed to upload Teaching Credential.", {
                description: error,
            });
            return;
        }

        setCredentialFile(file);
        setCredentialUrl(url);
        toast.success("Teaching Credential uploaded successfully!");
    };

    const removeValidId = () => {
        setValidIdFile(null);
        setValidIdUrl("");
    };

    const removeCredential = () => {
        setCredentialFile(null);
        setCredentialUrl("");
    };

    const handleFormSubmit = async (formData) => {
        // Add the uploaded file URLs to formData
        if (validIdUrl) {
            formData.set("validIdUrl", validIdUrl);
        }
        if (credentialUrl) {
            formData.set("credentialUrl", credentialUrl);
        }

        return formAction(formData);
    };

    const resetForm = () => {
        formRef.current?.reset();
        setValidIdFile(null);
        setCredentialFile(null);
        setValidIdUrl("");
        setCredentialUrl("");
    };

    useEffect(() => {
        if (state.success) {
            toast.success("Submitted successfully.");
            resetForm();
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
                action={handleFormSubmit}
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
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <div className="flex items-center gap-2 justify-between">
                                <p className="mb-1 mt-4">Requirements</p>
                                <AccordionTrigger showIcon={true}>
                                    View Allowed IDs & Credentials
                                </AccordionTrigger>
                            </div>
                            <AccordionContent>
                                <div className="rounded-lg bg-muted p-2 mb-4">
                                    <div className="mb-3">
                                        <p className="mb-1 font-bold">
                                            Valid ID
                                        </p>
                                        <ul>
                                            <li>Passport</li>
                                            <li>Driver’s License</li>
                                            <li>
                                                UMID (Unified Multi-Purpose ID)
                                            </li>
                                            <li>
                                                PRC ID (Professional Regulation
                                                Commission ID)
                                            </li>
                                            <li>SSS ID</li>
                                            <li>PhilHealth ID</li>
                                            <li>Voter’s ID</li>
                                            <li>Postal ID</li>
                                            <li>National ID (PhilSys ID)</li>
                                            <li>
                                                Government-issued Employee ID
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p className="mb-1 font-bold">
                                            Teaching Credentials
                                        </p>
                                        <ul>
                                            <li>
                                                PRC License (Teacher’s License)
                                            </li>
                                            <li>
                                                Professional Teacher Certificate
                                            </li>
                                            <li>
                                                DepEd Appointment / Deployment
                                                Order
                                            </li>
                                            <li>
                                                School-issued Employment
                                                Certificate
                                            </li>
                                            <li>Faculty ID</li>
                                            <li>
                                                Teaching Contract / Job Order
                                            </li>
                                            <li>Certificate of Employment</li>
                                            <li>School Service Record</li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <ul className="list-disc ps-3 text-sm text-muted-foreground mb-4">
                        <li>
                            <span className="text-font-bold text-secondary-foreground me-1">
                                Valid ID :
                            </span>
                            An image file of your government-issued ID
                        </li>
                        <li>
                            Certificate of Employment or Teaching Credentials
                        </li>
                    </ul>

                    {/* Valid ID Upload */}
                    <div className="mb-3">
                        <FormLabel>Valid ID</FormLabel>
                        <div>
                            {!validIdFile ? (
                                <label className="flex items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none">
                                    <div className="flex flex-col items-center space-y-2">
                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {uploadingValidId ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader
                                                        className="animate-spin"
                                                        size={16}
                                                    />
                                                    Uploading...
                                                </span>
                                            ) : (
                                                "Click to upload Valid ID (Image)"
                                            )}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            Max 5MB • JPEG, PNG, WebP
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleValidIdUpload}
                                        disabled={uploadingValidId || isPending}
                                    />
                                </label>
                            ) : (
                                <div className="flex items-center justify-between p-3 border rounded-md bg-accent">
                                    <div className="flex items-center gap-2">
                                        <Check
                                            className="text-green-500"
                                            size={20}
                                        />
                                        <span className="text-sm truncate">
                                            {validIdFile.name}
                                        </span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={removeValidId}
                                        disabled={isPending}
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Teaching Credential Upload */}
                    <div className="mb-3">
                        <FormLabel>Teaching Credential</FormLabel>
                        <div>
                            {!credentialFile ? (
                                <label className="flex items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none">
                                    <div className="flex flex-col items-center space-y-2">
                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {uploadingCredential ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader
                                                        className="animate-spin"
                                                        size={16}
                                                    />
                                                    Uploading...
                                                </span>
                                            ) : (
                                                "Click to upload Teaching Credential"
                                            )}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            Max 5MB • Image, PDF, or Word
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf,.doc,.docx"
                                        onChange={handleCredentialUpload}
                                        disabled={
                                            uploadingCredential || isPending
                                        }
                                    />
                                </label>
                            ) : (
                                <div className="flex items-center justify-between p-3 border rounded-md bg-accent">
                                    <div className="flex items-center gap-2">
                                        <Check
                                            className="text-green-500"
                                            size={20}
                                        />
                                        <span className="text-sm truncate">
                                            {credentialFile.name}
                                        </span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={removeCredential}
                                        disabled={isPending}
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 md:mt-6 flex sm:justify-end gap-2 flex-wrap">
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={resetForm}
                            disabled={isPending}
                        >
                            Reset Form
                        </Button>
                        <Button
                            disabled={
                                isPending ||
                                !validIdUrl ||
                                !credentialUrl ||
                                uploadingValidId ||
                                uploadingCredential
                            }
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
