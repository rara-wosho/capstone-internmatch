import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";
import PrimaryGradientText from "@/components/ui/PrimaryGradientText";
import SubmitButton from "@/components/ui/SubmitButton";
import { House, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen p-0 md:p-5 flex items-center justify-center pt-[2rem] md:pt-0 bg-dots">
            <div className="absolute left-4 top-4 z-20">
                <Button variant="ghost" asChild>
                    <Link href="/">
                        <House /> Home
                    </Link>
                </Button>
            </div>
            <div className="md:border-1 bg-white dark:bg-background dark:border-neutral-900 p-3 md:p-4 rounded-3xl shadow-xs flex items-center justify-center gap-4 w-full max-w-md">
                <Card className="max-w-md px-3 md:px-5 py-4 w-full">
                    <div className="flex flex-col items-center justify-center mb-3">
                        <Logo
                            className="w-10 aspect-square"
                            containerStyle="mb-2 py-2"
                        />
                        <h1 className="text-secondary-foreground font-bold text-2xl text-center">
                            Sign in to{" "}
                            <PrimaryGradientText>
                                InternMatch
                            </PrimaryGradientText>
                        </h1>
                        <p className="text-center text-muted-foreground text-sm">
                            Please enter your credentials
                        </p>

                        <form action="" className="w-full mt-4 md:mt-8">
                            <div className="mb-3">
                                <FormLabel>Email</FormLabel>
                                <Input
                                    icon={<Mail size={16} />}
                                    name="email"
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
                            <Link
                                href="/forgot-password"
                                className="text-sm text-muted-foreground hover:text-accent-foreground"
                            >
                                Forgot password?
                            </Link>

                            <SubmitButton className="w-full mt-8">
                                Sign In
                            </SubmitButton>

                            <p className="mt-6 text-center text-sm text-muted-foreground">
                                Or register your company.{" "}
                                <Link
                                    href="/register"
                                    className="text-accent-foreground font-semibold"
                                >
                                    Click here
                                </Link>
                            </p>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}
