"use client";

import { useSession } from "@/context/SessionContext";
import { checkStudentEligibility } from "@/lib/actions/company";
import { useEffect, useState, useTransition } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ErrorUi from "../ui/ErrorUi";
import { Button } from "../ui/button";

import SecondaryLabel from "../ui/SecondaryLabel";
import { ScrollArea } from "../ui/scroll-area";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Check, Info, Loader, Upload, X } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { submitApplication } from "@/lib/actions/application";
import { toast } from "sonner";

export default function ApplyModal({
    companyEmail,
    companyId,
    accept_applicants,
    term,
}) {
    const { userData } = useSession();
    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);
    const [isEligible, setIsEligible] = useState(false);
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState(null);

    // loading states
    const [loading, setLoading] = useState(true);
    const [checkingApply, setCheckingApply] = useState(true);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false);

    // form Data
    const [formData, setFormData] = useState({
        resume_url: "",
        cover_letter_url: "",
        portfolio_link: "",
        introduction: "",
    });

    // file states
    const [resumeFile, setResumeFile] = useState(null);
    const [coverLetterFile, setCoverLetterFile] = useState(null);

    if (!userData) {
        return (
            <ErrorUi secondaryMessage="You need to be logged in to apply." />
        );
    }

    const resetForm = () => {
        setFormData({
            resume_url: "",
            cover_letter_url: "",
            portfolio_link: "",
            introduction: "",
        });
        setResumeFile(null);
        setCoverLetterFile(null);
    };

    const uploadFileToSupabase = async (file, fileType) => {
        try {
            const supabase = createClient();
            const fileExt = file.name.split(".").pop();
            const fileName = `${fileType}/${userData.id}/${fileType}_${Date.now()}.${fileExt}`;

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

    const handleResumeUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Please upload a PDF or Word document for your resume."
            );
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Resume file must be less than 5MB.");
            return;
        }

        setUploadingResume(true);
        const { url, error } = await uploadFileToSupabase(file, "resume");
        setUploadingResume(false);

        if (error) {
            setResumeFile(null);
            toast.error("Failed to upload resume.", { description: error });
            return;
        }

        setResumeFile(file);
        setFormData((prev) => ({ ...prev, resume_url: url }));
        toast.success("Resume uploaded successfully!");
    };

    const handleCoverLetterUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Please upload a PDF or Word document for your cover letter."
            );
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Cover letter file must be less than 5MB.");
            return;
        }

        setUploadingCoverLetter(true);
        const { url, error } = await uploadFileToSupabase(file, "cover_letter");
        setUploadingCoverLetter(false);

        if (error) {
            toast.error("Failed to upload cover letter.", {
                description: error,
            });
            return;
        }

        setCoverLetterFile(file);
        setFormData((prev) => ({ ...prev, cover_letter_url: url }));
        toast.success("Cover letter uploaded successfully!");
    };

    const removeResume = () => {
        setResumeFile(null);
        setFormData((prev) => ({ ...prev, resume_url: "" }));
    };

    const removeCoverLetter = () => {
        setCoverLetterFile(null);
        setFormData((prev) => ({ ...prev, cover_letter_url: "" }));
    };

    const handleSubmit = async () => {
        if (!formData.resume_url) {
            toast.error("Please upload your resume.");
            return;
        }

        startTransition(async () => {
            const { success, error } = await submitApplication({
                resume_link: formData.resume_url,
                cover_letter_url: formData.cover_letter_url,
                portfolio_link: formData.portfolio_link,
                introduction: formData.introduction,
                companyEmail,
                company_id: companyId,
                student_id: userData.id,
                student_name: `${userData.firstname} ${userData.lastname}`,
                status: "pending",
            });

            if (!success) {
                toast.error("Unable to submit application.", {
                    description: error,
                });
                return;
            }

            toast.success("Application submitted successfully!");
            resetForm();
            setTimeout(() => {
                setOpen(false);
                setApplied(true);
            }, 600);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const alreadyApplied = async () => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("applicants")
                .select("applied_at")
                .eq("student_id", userData.id)
                .eq("company_id", companyId)
                .maybeSingle();

            if (error) throw new Error(error.message);
            if (data) setApplied(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setCheckingApply(false);
        }
    };

    const checkEligibility = async () => {
        setLoading(true);
        const { eligible, error } = await checkStudentEligibility(
            companyId,
            userData.id
        );

        if (error) {
            setError("Something went wrong while checking eligibility.");
            return;
        }

        setIsEligible(eligible);
        setLoading(false);
    };

    useEffect(() => {
        alreadyApplied();
    }, []);

    useEffect(() => {
        if (open) {
            checkEligibility();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="w-full">
                <Button
                    disabled={!accept_applicants || applied || checkingApply}
                >
                    {checkingApply && <Loader className="animate-spin" />}
                    {applied ? "Applied" : "Apply"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        <SecondaryLabel>Apply for Internship</SecondaryLabel>
                    </DialogTitle>

                    <DialogDescription className="text-left sr-only">
                        Please provide your details and required materials so
                        the company can review your application.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mx-auto w-full max-h-[60svh]">
                    {error && <ErrorUi secondaryMessage={error} />}

                    {loading ? (
                        <div className="flex items-center gap-1">
                            <Loader size={16} className="animate-spin" />{" "}
                            Checking status
                        </div>
                    ) : isEligible && !error ? (
                        <div className="flex flex-col">
                            <div className="border-sky-600/50 border rounded-sm p-3 bg-accent mb-7">
                                <p className="text-sm text-accent-foreground mb-2">
                                    We'll use the information from your profile
                                    for this application. Make sure your account
                                    profile is up to date.
                                </p>
                                <p className="text-sm text-accent-foreground">
                                    Need to edit?{" "}
                                    <Link
                                        href={"/student/account/edit"}
                                        className="underline"
                                    >
                                        Click here
                                    </Link>
                                </p>
                            </div>
                            <Separator className="mb-5" />

                            {/* Resume Upload */}
                            <div className="mb-3">
                                <FormLabel>Resume</FormLabel>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Info size={12} className="shrink-0" />
                                    <p className="text-xs">
                                        You will not be able to change or update
                                        your resume once application is
                                        submitted.
                                    </p>
                                </div>
                                <div className="mt-1">
                                    {!resumeFile ? (
                                        <label className="flex items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none">
                                            <div className="flex flex-col items-center space-y-2">
                                                <Upload className="w-6 h-6 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">
                                                    {uploadingResume ? (
                                                        <span className="flex items-center gap-2">
                                                            <Loader
                                                                className="animate-spin"
                                                                size={16}
                                                            />
                                                            Uploading...
                                                        </span>
                                                    ) : (
                                                        "Click to upload resume (PDF or Word)"
                                                    )}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Max 5MB
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleResumeUpload}
                                                disabled={
                                                    uploadingCoverLetter ||
                                                    uploadingResume ||
                                                    applied
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

                                                <p className="text-sm max-w-[300px] truncate">
                                                    {resumeFile.name}
                                                </p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={removeResume}
                                                disabled={applied}
                                            >
                                                <X size={16} />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Cover Letter Upload */}
                            <div className="mb-3">
                                <FormLabel>Cover Letter (Optional)</FormLabel>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Info size={12} className="shrink-0" />
                                    <p className="text-xs">
                                        You will not be able to change or update
                                        your cover letter once application is
                                        submitted.
                                    </p>
                                </div>
                                <div className="mt-1">
                                    {!coverLetterFile ? (
                                        <label className="flex items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none">
                                            <div className="flex flex-col items-center space-y-2">
                                                <Upload className="w-6 h-6 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">
                                                    {uploadingCoverLetter ? (
                                                        <span className="flex items-center gap-2">
                                                            <Loader
                                                                className="animate-spin"
                                                                size={16}
                                                            />
                                                            Uploading...
                                                        </span>
                                                    ) : (
                                                        "Click to upload cover letter (PDF or Word)"
                                                    )}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Max 5MB
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={
                                                    handleCoverLetterUpload
                                                }
                                                disabled={
                                                    uploadingResume ||
                                                    uploadingCoverLetter ||
                                                    applied
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
                                                <span className="text-sm max-w-[300px] truncate">
                                                    {coverLetterFile.name}
                                                </span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={removeCoverLetter}
                                                disabled={applied}
                                            >
                                                <X size={16} />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <FormLabel>Portfolio link (Optional)</FormLabel>
                                <Input
                                    disabled={applied}
                                    value={formData.portfolio_link}
                                    name="portfolio_link"
                                    onChange={handleChange}
                                    placeholder="e.g. https://yourportfolio.com"
                                />
                            </div>
                            <div className="mb-3">
                                <FormLabel>
                                    Short Introduction (Optional)
                                </FormLabel>
                                <Textarea
                                    disabled={applied}
                                    value={formData.introduction}
                                    name="introduction"
                                    onChange={handleChange}
                                    placeholder="Write a brief introduction about yourself."
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 rounded-md border border-amber-500/30 bg-amber-500/5 text-amber-500 flex flex-col justify-center">
                            {term === "all" && (
                                <p className="text-sm">
                                    This company requires applicants to complete
                                    all of its exams before applying.
                                </p>
                            )}
                            {term === "some" && (
                                <p className="text-sm">
                                    This company requires applicants to take at
                                    least one of its exams before applying.
                                </p>
                            )}
                        </div>
                    )}
                </ScrollArea>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                                setError(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            !isEligible ||
                            applied ||
                            isPending ||
                            !formData.resume_url ||
                            uploadingResume ||
                            uploadingCoverLetter
                        }
                    >
                        {isPending && <Loader className="animate-spin" />}
                        Submit Application
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
