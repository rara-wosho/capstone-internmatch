import { ThemeToggler } from "@/components/theme-toggler";
import { BookOpen, Mail, MessagesSquare } from "lucide-react";
import Link from "next/link";
import WhiteLogo from "@/components/ui/WhiteLogo";
import PrimaryLabel from "@/components/ui/PrimaryLabel";
import IconWrapper from "@/components/ui/IconWrapper";
import { createClient } from "@/lib/supabase/server";
import CreateStudentAccountForm from "@/components/forms/CreateStudentAccountForm";
import ErrorDisplay from "@/components/blocks/ErrorDisplay";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { notFound } from "next/navigation";
import Logo from "@/components/ui/Logo";

export default async function Page({ params }) {
    const { groupId } = await params;

    if (!groupId) {
        notFound();
    }

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("groups")
        .select("id, is_shareable, group_name")
        .eq("id", groupId)
        .maybeSingle();

    if (error) {
        return <ErrorDisplay message={error.message} />;
    }

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col lg:pl-[500px]">
            {/* left content */}
            <aside className="hidden h-screen lg:flex overflow-hidden w-[500px] bg-primary dark:bg-card p-8 justify-between flex-col fixed top-0 left-0 isolate">
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

                <div className="-translate-y-16">
                    <h1 className="text-4xl font-bold text-neutral-100">
                        One Platform to Streamline Your Skills and Find Quality
                        <span className="dark:text-violet-500">
                            {" "}
                            Internship
                        </span>
                    </h1>
                    <p className="my-6 text-neutral-100 max-w-sm">
                        Join InternMatch today and take the first step towards
                        your internship.
                    </p>
                </div>

                <div className="">
                    <Link
                        href="/terms-conditions"
                        className="text-sm text-neutral-100 flex items-center gap-2 hover:text-accent-foreground"
                    >
                        <BookOpen size={14} /> Terms and Conditions
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="px-4 pt-8 pb-16 md:py-16 grow bg-[rgb(254,254,254)] dark:bg-background flex flex-col items-center justify-center">
                {data?.is_shareable && (
                    <>
                        <div className="flex items-center flex-col mt-6 md:mt-1 mb-8 md:mb-10 gap-2 bg-[rgb(254,254,254)] dark:bg-background">
                            <div className="border rounded-xl mb-2 p-3 shadow-xs lg:hidden">
                                <Logo className="w-10 h-10" />
                            </div>
                            <PrimaryLabel>Create an Account</PrimaryLabel>
                            <p className="max-w-md text-center">
                                You are invited to join the group{" "}
                                <strong>{data.group_name}</strong>
                            </p>
                        </div>

                        <CreateStudentAccountForm groupId={groupId} />
                    </>
                )}

                {!data?.is_shareable && (
                    <div className="flex flex-col gap-3 items-center justify-center max-w-md">
                        <SecondaryLabel>Registration Closed</SecondaryLabel>
                        <p className="text-center text-muted-foreground">
                            The instructor has closed student registrations for
                            this group. If you believe this is a mistake or need
                            assistance, kindly reach out to your instructor.
                        </p>
                    </div>
                )}
            </main>

            {/* footer  */}
            <div className="border-t py-8 px-4 md:px-5 lg:px-8 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    Internmatch. All rights reserved
                </p>
                <div className="flex items-center gap-2">
                    <IconWrapper>
                        <MessagesSquare size={17} />
                    </IconWrapper>
                    <div className="border rounded-sm bg-card p-[1px]">
                        <ThemeToggler />
                    </div>
                </div>
            </div>
        </div>
    );
}
