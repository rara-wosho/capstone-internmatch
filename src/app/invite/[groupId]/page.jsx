"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ThemeToggler } from "@/components/theme-toggler";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import PrimaryGradientText from "@/components/ui/PrimaryGradientText";
import SubmitButton from "@/components/ui/SubmitButton";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Mail,
    MessageCircle,
    MessagesSquare,
} from "lucide-react";
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
import PrimaryLabel from "@/components/ui/PrimaryLabel";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";

export default function Page() {
    const params = useParams();
    const { groupId } = params;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
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

        // If all goods
        toast.success("Account created successfully!", {
            position: "top-center",
        });
        console.log("Form submitted:", formData);
    };

    return (
        <div className="min-h-screen flex flex-col lg:pl-[400px]">
            {/* left content */}
            <aside className="hidden h-screen lg:flex overflow-hidden w-[400px] bg-primary dark:bg-card p-8 flex-col fixed top-0 left-0 isolate">
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
            <main className="px-4 py-16 grow bg-[rgb(254,254,254)] dark:bg-background flex flex-col items-center justify-center">
                <div className="flex items-center flex-col mt-6 md:mt-1 mb-8 md:mb-10 gap-2">
                    <PrimaryLabel>Create an Account</PrimaryLabel>
                    <p className="max-w-md text-center">
                        You are invited to join the group{" "}
                        <strong>Sir amins group</strong>
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto max-w-lg w-full md:px-4"
                >
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                required
                                name="firstName"
                                placeholder="Tyrelle"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                required
                                name="lastName"
                                placeholder="Constello"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Credentials */}
                    <div className="mb-8">
                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="tyrelle@sample.com"
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

                    {/* cta buttons */}
                    <p className="text-sm text-muted-foreground">
                        By creating an account, you agree to our terms and
                        conditions
                    </p>
                    {/* Actions */}
                    <div className="flex flex-col gap-3 mt-3">
                        <SubmitButton>Create Account</SubmitButton>
                        <div className="relative border-b inline-flex my-7">
                            <p className="bg-white dark:bg-background text-center leading-2 p-3 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap">
                                Already have an account?
                            </p>
                        </div>

                        <Button variant="outline" type="button" asChild>
                            <Link href="/sign-in">
                                <p>Sign in instead</p>
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </form>
            </main>

            {/* footer  */}
            <div className="border-t py-8 px-4 md:px-5 lg:px-8 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    Internmatch. All rights reserved
                </p>
                <IconWrapper>
                    <MessagesSquare size={17} />
                </IconWrapper>
            </div>
        </div>
    );
}
