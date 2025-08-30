import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import FormLabel from "@/components/ui/FormLabel";
import IconWrapper from "@/components/ui/IconWrapper";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";
import PrimaryGradientText from "@/components/ui/PrimaryGradientText";
import PrimaryLabel from "@/components/ui/PrimaryLabel";
import SubmitButton from "@/components/ui/SubmitButton";
import { House, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="flex items-center justify-between px-4 h-[65px]">
                <Link href="/" className="flex items-center font-bold">
                    <Logo className="w-5 h-5 me-3" /> InternMatch
                </Link>

                <ThemeToggler className="border rounded-sm bg-card p-2" />
            </div>
            <div className="p-0 md:p-5 flex flex-col items-center justify-center min-h-[calc(90vh-65px)]">
                {/* wrapper  */}
                <div className="p-2 lg:p-5 gap-8 lg:border rounded-3xl flex items-center w-full max-w-[1100px] bg-[rgb(253,253,253)] dark:bg-background">
                    <div className="flex-col hidden lg:flex w-3xl items-center justify-center">
                        <PrimaryLabel className="max-w-md">
                            "Programming isn't about what you know; it's about
                            what you can figure out."
                        </PrimaryLabel>
                    </div>
                    <Card className="max-w-md p-5 w-full mx-auto">
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

            <div className="border-t p-8 mt-14">
                <p className="text-sm text-muted-foreground">InternMatch</p>
            </div>
        </>
    );
}
