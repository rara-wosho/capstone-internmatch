import { ThemeToggler } from "@/components/theme-toggler";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import PrimaryGradientText from "@/components/ui/PrimaryGradientText";
import SubmitButton from "@/components/ui/SubmitButton";
import { BookOpen, Mail } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }) {
    const { groupId } = await params;
    return (
        <div className="min-h-screen flex">
            <aside className="hidden lg:flex overflow-hidden w-[360px] bg-primary dark:bg-card p-8 flex-col relative isolate">
                <div className="w-[560px] aspect-square rounded-full dark:bg-violet-500/0 bg-violet-400/40 absolute -z-10 -top-[15rem] -left-[12rem]"></div>
                <div className="w-[100px] aspect-square rounded-full dark:bg-violet-500/0 bg-violet-400/30 absolute -z-10 bottom-[11.5rem] right-[1rem]"></div>
                <div className="w-[290px] aspect-square rounded-full dark:bg-violet-500/0 bg-violet-400/40 absolute -z-10 -bottom-[8rem] -right-[6rem]"></div>

                <Link
                    href="/"
                    className="font-bold text-xl mb-10 text-neutral-100"
                >
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
                    <Link href="/mailto:raeldevprojects@gmail.com">
                        <Mail size={20} />
                    </Link>
                    <Link href="/mailto:raeldevprojects@gmail.com">
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
            <main className="p-3 md:p-4 grow bg-linear-to-br from-transparent to-blue-200/20 dark:to-blue-950/15 from-50%">
                <div className="size-6 bg-primary rounded-full mb-4"></div>
                <h4 className="font-bold text-xl text-muted-foreground mb-3">
                    You are invited to{" "}
                    <PrimaryGradientText>CREATE AN ACCOUNT</PrimaryGradientText>
                </h4>
                <p className="text-muted-foreground text-sm mb-1">
                    Group name :{" "}
                    <span className="font-bold italic">Sir Amin's group</span>
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                    Status : <span className="font-bold italic">Active</span>
                </p>

                <form className="pt-4 mt-4 border-t dark:border-neutral-900">
                    <div className="mb-6">
                        <h1 className="text-lg  text-secondary-foreground font-semibold">
                            Tell us something about yourself
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-3">
                            <div>
                                <FormLabel>First Name</FormLabel>
                                <Input placeholder="Enter your first name" />
                            </div>
                            <div>
                                <FormLabel>First Name</FormLabel>
                                <Input placeholder="Enter your first name" />
                            </div>
                            <div>
                                <FormLabel>First Name</FormLabel>
                                <Input placeholder="Enter your first name" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h1 className="text-lg  text-secondary-foreground font-semibold">
                            Academic Information
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-3">
                            <div>
                                <FormLabel>School</FormLabel>
                                <Input placeholder="Enter your first name" />
                            </div>
                            <div>
                                <FormLabel>Course/Program</FormLabel>
                                <Input placeholder="Enter your first name" />
                            </div>
                            <div>
                                <FormLabel>Year</FormLabel>
                                <Input placeholder="Enter your first name" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h1 className="text-lg  text-secondary-foreground font-semibold">
                            Credentials
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-3">
                            <div>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder="e,g. Zhand@gmail.com" />
                            </div>
                            <div>
                                <FormLabel>Password</FormLabel>
                                <Input placeholder="Maximum of 6 characters" />
                            </div>
                            <div>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input placeholder="Repeat password" />
                            </div>
                        </div>
                    </div>

                    <div className="py-3">
                        <SubmitButton>Create Account</SubmitButton>
                    </div>
                </form>
            </main>
        </div>
    );
}
