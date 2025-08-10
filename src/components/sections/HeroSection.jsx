import { CircleQuestionMark, Mail, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Wrapper from "../Wrapper";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Wrapper className="flex flex-col items-center justify-center gap-y-8 px-4">
                <p className="rounded-full flex items-center gap-1 bg-accent text-accent-foreground border border-accent-foreground/40 text-xs px-3 py-1">
                    <Sparkles size={12} /> New Startup
                </p>
                <h1 className="font-bold text-4xl md:text-[3.4rem] text-center max-w-4xl bg-linear-to-br from-neutral-600 dark:from-neutral-400 via-neutral-700 dark:via-neutral-200 to-neutral-600 bg-clip-text text-transparent">
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
                    <Button asChild>
                        <Link href="#how-it-works">
                            How It Works
                            <CircleQuestionMark />
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link
                            className="flex items-center"
                            href="mailto:raeldevprojects@gmail.com"
                        >
                            <p className="flex-items-center">
                                Send Us an Email
                            </p>
                            <Mail />
                        </Link>
                    </Button>
                </div>
            </Wrapper>

            <p className="text-muted-foreground mt-8 text-sm">
                Trusted by over 30+ students
            </p>
        </div>
    );
}
