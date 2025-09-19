import { ArrowUpRight, ChevronRight, Mail, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Wrapper from "../Wrapper";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function HeroSection() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-[140px] pb-16 bg-dots isolate relative px-3">
            <div className="-z-10 bg-linear-to-b from-transparent to-blue-200/30 dark:to-blue-950/40 from-50% absolute inset-0"></div>
            <Wrapper className="flex flex-col items-center justify-center gap-y-8 px-4">
                <p className="rounded-full flex items-center gap-1 bg-accent text-accent-foreground border border-accent-foreground/40 text-xs px-3 py-1 translate-y-2">
                    <Sparkles size={12} /> New Startup
                </p>
                <h1 className="font-bold text-4xl md:text-[4rem] text-center max-w-4xl bg-linear-to-br from-neutral-900 dark:from-neutral-400 via-gray-700 dark:via-neutral-200 to-neutral-900 bg-clip-text text-transparent">
                    Connecting Skills to Opportunities. Your{" "}
                    <span className="bg-clip-text text-transparent bg-linear-to-t from-violet-800 to-violet-400 dark:to-violet-300">
                        Internship
                    </span>{" "}
                    Journey Starts Here.
                </h1>
                <p className="text-center md:text-lg text-neutral-700 dark:text-neutral-300/90 max-w-3xl">
                    A smarter way for students to connect with companies and
                    instructors for a seamless internship experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button asChild size="lg">
                        <Link href="/sign-in">
                            Get Started
                            <ChevronRight />
                        </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg">
                        <Link
                            className="flex items-center"
                            href="#how-it-works"
                        >
                            See How It Works
                        </Link>
                    </Button>
                </div>
            </Wrapper>

            <div className="grid grid-cols-3 mt-8 py-12">
                <div className="px-2 sm:px-6 md:px-12 text-center gap-1.5 flex flex-col">
                    <p className="tracking-widest font-bold text-xl sm:text-2xl md:text-4xl bg-linear-to-b from-neutral-900 dark:from-50% dark:from-neutral-50 to-neutral-600 dark:to-neutral-600 bg-clip-text text-transparent">
                        30+
                    </p>
                    <p className="text-sm sm:text-base font-medium text-muted-foreground">
                        Instructors
                    </p>
                </div>
                <div className="px-2 sm:px-6 md:px-12 text-center gap-1.5 flex flex-col border-l border-r">
                    <p className="tracking-widest font-bold text-xl sm:text-2xl md:text-4xl bg-linear-to-b from-neutral-900 dark:from-50% dark:from-neutral-50 to-neutral-600 dark:to-neutral-600 bg-clip-text text-transparent">
                        150+
                    </p>
                    <p className="text-sm sm:text-base font-medium text-muted-foreground">
                        Students
                    </p>
                </div>
                <div className="px-2 sm:px-6 md:px-12 text-center gap-1.5 flex flex-col">
                    <p className="tracking-widest font-bold text-xl sm:text-2xl md:text-4xl bg-linear-to-b from-neutral-900 dark:from-50% dark:from-neutral-50 to-neutral-600 dark:to-neutral-600 bg-clip-text text-transparent">
                        50+
                    </p>
                    <p className="text-sm sm:text-base font-medium text-muted-foreground">
                        Companies
                    </p>
                </div>
            </div>
        </div>
    );
}
