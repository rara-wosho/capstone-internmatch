import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import {
    CircleUserRound,
    Users,
    Building2,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";

import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="min-h-[calc(100svh-60px)] pb-16 px-4 md:px-8 bg-linear-to-b  from-[rgb(253,253,253)] dark:from-transparent to-[rgb(253,253,253)] dark:to-blue-950/40 from-50%">
                <Wrapper size="sm">
                    <SecondaryLabel>
                        <span>Choose an account type</span>
                    </SecondaryLabel>

                    <div className="grid grid-cols-1 mt-6 gap-4 md:grid-cols-2">
                        <>
                            {/* Student */}
                            <div className="overflow-hidden relative border border-emerald-500/20 bg-linear-to-br from-transparent to-emerald-500/20 rounded-xl p-5 md:p-7 flex flex-col justify-between">
                                {/* Background Icon */}
                                <div className="w-36 absolute opacity-10 -bottom-10 -right-2 aspect-square flex items-center justify-center text-emerald-500">
                                    <CircleUserRound size={120} />
                                </div>

                                {/* Foreground Icon */}
                                <div className="w-16 mb-4 aspect-square flex items-center justify-center bg-emerald-500/10 border-4 border-emerald-500/40 text-emerald-600 rounded-lg p-3">
                                    <CircleUserRound size={32} />
                                </div>

                                <div>
                                    <h1 className="mb-2 text-lg font-bold sm:text-xl text-emerald-600">
                                        I am finding an internship
                                    </h1>
                                    <p className="text-sm text-emerald-600">
                                        Explore companies, take exams, and apply
                                        for your internship.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-5">
                                    <button className="cursor-pointer px-4 py-2 flex items-center gap-2 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors">
                                        Student <ChevronRight size={17} />
                                    </button>
                                </div>
                            </div>

                            {/* OJT Coordinator */}
                            <div className="overflow-hidden relative border border-sky-500/20 bg-linear-to-br from-transparent to-sky-500/20 rounded-xl p-5 md:p-7 flex flex-col justify-between">
                                {/* Background Icon */}
                                <div className="w-36 absolute opacity-10 -bottom-10 -right-2 aspect-square flex items-center justify-center text-sky-500">
                                    <Users size={120} />
                                </div>

                                {/* Foreground Icon */}
                                <div className="w-16 mb-4 aspect-square flex items-center justify-center bg-sky-500/10 border-4 border-sky-500/40 text-sky-600 rounded-lg p-3">
                                    <Users size={32} />
                                </div>

                                <div>
                                    <h1 className="mb-2 text-lg font-bold sm:text-xl text-sky-600">
                                        I am managing students
                                    </h1>
                                    <p className="text-sm text-sky-600">
                                        Organize and guide students throughout
                                        their internship journey.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-5">
                                    <Link
                                        href="/create-account/instructor"
                                        className="cursor-pointer px-4 py-2 flex items-center gap-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
                                    >
                                        OJT Intructor <ChevronRight size={17} />
                                    </Link>
                                </div>
                            </div>

                            {/* Company */}
                            <div className="overflow-hidden relative border border-purple-500/20 md:col-span-2 bg-linear-to-br from-transparent to-purple-500/20 rounded-xl p-5 md:p-7 flex flex-col justify-between">
                                {/* Background Icon */}
                                <div className="w-40 absolute opacity-10 -bottom-10 -right-2 aspect-square flex items-center justify-center text-purple-500">
                                    <Building2 size={120} />
                                </div>

                                {/* Foreground Icon */}
                                <div className="w-16 mb-4 aspect-square flex items-center justify-center bg-purple-500/10 border-4 border-purple-500/40 text-purple-600 rounded-lg p-3">
                                    <Building2 size={32} />
                                </div>

                                <div>
                                    <h1 className="mb-2 text-lg font-bold sm:text-xl text-purple-500">
                                        I am finding an intern for my company
                                    </h1>
                                    <p className="text-sm text-purple-400">
                                        Create exams, evaluate applicants, and
                                        hire the best interns.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-5">
                                    <Link
                                        href="/create-account/company"
                                        className="cursor-pointer px-4 py-2 flex items-center gap-2 rounded-md bg-purple-600/80 text-white font-medium hover:bg-purple-700 transition-colors"
                                    >
                                        Company <ChevronRight size={17} />
                                    </Link>
                                </div>
                            </div>
                        </>
                    </div>

                    {/* already have an account section  */}
                    <div className="flex flex-col items-center gap-2 justify-center mt-14 gap-y-3 w-full">
                        <p>Already have an account?</p>{" "}
                        <Button
                            className="grow w-full sm:max-w-2xs"
                            asChild
                            variant="outline"
                        >
                            <Link
                                href="/sign-in"
                                className="hover:text-accent-foreground"
                            >
                                Sign In
                            </Link>
                        </Button>
                    </div>
                </Wrapper>
            </div>
        </>
    );
}
