"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ThemeToggler } from "@/components/theme-toggler";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import PrimaryGradientText from "@/components/ui/PrimaryGradientText";
import SubmitButton from "@/components/ui/SubmitButton";
import { BookOpen, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Logo from "@/components/ui/Logo";
import WhiteLogo from "@/components/ui/WhiteLogo";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Page() {
    const params = useParams();
    const { groupId } = params;

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        school: "",
        course: "",
        year: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check password length
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long.", {
                position: "top-center",
            });
            return;
        }

        // Check password match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.", { position: "top-center" });
            return;
        }

        // If all good
        toast.success("Account created successfully!", {
            position: "top-center",
        });
        console.log("Form submitted:", formData);
    };

    return (
        <div className="min-h-screen flex">
            {/* left content */}
            <aside className="hidden lg:flex overflow-hidden w-[360px] bg-primary dark:bg-card p-8 flex-col relative isolate">
                <div className="w-[560px] aspect-square rounded-full dark:bg-violet-500/0 bg-violet-400/40 absolute -z-10 -top-[15rem] -left-[12rem]"></div>
                <div className="w-[100px] aspect-square rounded-full dark:bg-violet-500/0 bg-violet-400/30 absolute -z-10 bottom-[11.5rem] right-[1rem]"></div>
                <div className="w-[290px] aspect-square rounded-full dark:bg-violet-500/0 bg-violet-400/40 absolute -z-10 -bottom-[8rem] -right-[6rem]"></div>

                <Link
                    href="/"
                    className="font-bold text-xl mb-10 text-neutral-100 flex items-center gap-2"
                >
                    <WhiteLogo className="w-5 aspect-square" />
                    InternMatch
                </Link>
                <h1 className="text-4xl font-bold text-neutral-100">
                    One Platform to Streamline Your Skills and Find Quality
                    <span className="dark:text-violet-500"> Internship</span>
                </h1>

                <p className="my-6 text-neutral-100">
                    Lorem ipsum dolor sit amet.
                </p>
                <div className="flex items-center gap-1.5 text-neutral-100">
                    <Link href="mailto:raeldevprojects@gmail.com">
                        <Mail size={20} />
                    </Link>
                    <ThemeToggler />
                </div>

                <div className="mt-auto">
                    <Link
                        href="/terms-conditions"
                        className="text-sm text-neutral-100 flex items-center gap-2 hover:text-accent-foreground"
                    >
                        <BookOpen size={14} /> Terms and Conditions
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="p-3 md:px-4 md:py-8 grow bg-linear-to-br from-transparent to-blue-200/20 dark:to-blue-950/15 from-50%">
                <div className="flex flex-col bg-white md:bg-transparent p-3 md:p-0 border md:border-0 items-center md:items-start rounded-lg dark:bg-neutral-900/30 dark:border-neutral-900 dark:md:bg-transparent">
                    <div className="mb-4 mt-2 lg:hidden">
                        <Logo className="w-8 h-9" />
                    </div>
                    <h4 className="font-bold text-xl text-muted-foreground mb-3 text-center md:text-start">
                        You are invited to{" "}
                        <PrimaryGradientText>
                            CREATE AN ACCOUNT
                        </PrimaryGradientText>
                    </h4>
                    <p className="text-muted-foreground text-sm mb-1 text-center md:text-start">
                        Group name :{" "}
                        <span className="font-bold italic">
                            Sir Amin's group
                        </span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Status :{" "}
                        <span className="font-bold italic">Active</span>
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="pt-4 mt-4 border-t dark:border-neutral-900"
                >
                    {/* Personal Info */}
                    <div className="mb-6">
                        <h1 className="text-lg text-secondary-foreground font-semibold">
                            Tell us something about yourself
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <div>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    required
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <FormLabel>Middle Name (Optional)</FormLabel>
                                <Input
                                    name="middleName"
                                    placeholder="Enter your middle name"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    required
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Academic Info */}
                    <div className="mb-6">
                        <h1 className="text-lg text-secondary-foreground font-semibold">
                            Academic Information
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <div>
                                <FormLabel>School</FormLabel>
                                <Input
                                    required
                                    name="school"
                                    placeholder="Enter your school"
                                    value={formData.school}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <FormLabel>Course/Program</FormLabel>
                                <Input
                                    required
                                    name="course"
                                    placeholder="Enter your course/program"
                                    value={formData.course}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <FormLabel>Year</FormLabel>
                                <Select required name="year" className="w-full">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Credentials */}
                    <div className="mb-6">
                        <h1 className="text-lg text-secondary-foreground font-semibold">
                            Credentials
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <div>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="e.g. Zhand@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="Minimum of 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    required
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Repeat password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4">
                        <div className="md:col-span-2 flex items-center justify-center sm:justify-start order-2 sm:order-1">
                            <p>
                                Already have an account?{" "}
                                <Link
                                    href="/sign-in"
                                    className="text-accent-foreground"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                        <SubmitButton className="order-1 sm:order-2">
                            Create Account
                        </SubmitButton>
                    </div>
                </form>
            </main>
        </div>
    );
}
