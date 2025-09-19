"use client";

import { ThemeToggler } from "@/components/theme-toggler";
import Card from "@/components/ui/card";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";
import { Loader, Lock, Mail, Star } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import Form from "next/form";

export default function Page() {
    const [state, formAction, isPending] = useActionState(signIn, {
        error: null,
        email: "",
    });

    // Show error toast when there's an error
    useEffect(() => {
        if (state?.error) {
            toast.error("We couldn't sign you in. " + state.error);
        }
    }, [state]);

    return (
        <>
            <div className="flex items-center justify-between px-4 h-[65px]">
                <Link href="/" className="flex items-center font-bold">
                    <Logo className="w-5 h-5 me-3" /> InternMatch
                </Link>
                <ThemeToggler className="border rounded-sm bg-card p-2" />
            </div>

            <div className="p-0 md:p-5 flex flex-col items-center justify-center min-h-[calc(100vh-65px)] bg-linear-to-b from-transparent to-blue-200/50 dark:to-blue-950/40 from-50% relative md:pb-14">
                {/* wrapper */}
                <div className="p-2 lg:p-5 gap-8 lg:border rounded-3xl flex items-center w-full max-w-[1000px] lg:bg-[rgb(253,253,253)] lg:dark:bg-background relative isolate overflow-hidden">
                    <div className="hidden lg:block rounded-[100%] border-4 border-neutral-100 dark:border-neutral-900 h-[200px] w-[500px] absolute -left-20 -top-32 -z-10"></div>
                    <div className="hidden lg:block rounded-[100%] border-4 border-neutral-100 dark:border-neutral-900 h-[400px] w-[1000px] absolute -right-[200px] -bottom-[300px] -z-10"></div>

                    {/* left section */}
                    <div className="flex-col hidden lg:flex w-3xl p-16 items-start justify-between bg-dots">
                        <div className="flex items-center gap-2 mb-6 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} fill="yellow" size={15} />
                            ))}
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-secondary-foreground">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Provident, id! Lorem ipsum
                                dolor sit amet.
                            </p>
                        </div>
                        <div className="flex items-center mt-6 gap-3">
                            <Avatar>
                                <AvatarImage src="/images/profile.JPG" />
                                <AvatarFallback>ID</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-semibold text-secondary-foreground">
                                    Israel De Vera
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Founder, Internmatch
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* sign in form */}
                    <Card className="max-w-[450px] p-5 w-full mx-auto">
                        <div className="flex flex-col items-center justify-center mb-3 mt-5">
                            <h1 className="text-secondary-foreground font-bold text-3xl mb-1 text-center">
                                Welcome Back!
                            </h1>
                            <p className="text-center text-muted-foreground text-sm">
                                Please enter your credentials
                            </p>

                            <Form
                                action={formAction}
                                className="w-full mt-4 md:mt-8"
                            >
                                <div className="mb-3">
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        defaultValue={state?.email || ""}
                                        icon={<Mail size={16} />}
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="zhand@gmail.com"
                                    />
                                </div>

                                <div className="mb-2">
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        icon={<Lock size={16} />}
                                        type="password"
                                        required
                                        name="password"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-between">
                                    <label
                                        htmlFor="remember-me"
                                        className="flex items-center gap-2 text-sm font-light text-muted-foreground"
                                    >
                                        <Checkbox
                                            id="remember-me"
                                            name="rememberMe"
                                        />
                                        Remember me
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-secondary-foreground/80 hover:text-accent-foreground"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    className="w-full mt-7"
                                    disabled={isPending}
                                >
                                    {isPending && (
                                        <Loader className="animate-spin" />
                                    )}
                                    <span>Sign In</span>
                                </Button>

                                <p className="relative py-6 text-xs text-muted-foreground text-center after:absolute after:h-[1px] after:w-[28%] after:bg-secondary after:top-1/2 after:right-0 after:-translate-y-1/2 before:absolute before:h-[1px] before:w-[28%] before:bg-secondary before:top-1/2 before:left-0 before:-translate-y-1/2">
                                    Don't have an account?
                                </p>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                    type="button"
                                >
                                    <Link href="/create-account">
                                        Create an Account
                                    </Link>
                                </Button>
                            </Form>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
