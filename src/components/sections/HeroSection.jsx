import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import Wrapper from "../Wrapper";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Wrapper className="flex flex-col items-center justify-center gap-y-8 px-4">
                <h1 className="font-bold text-4xl md:text-5xl text-center max-w-3xl text-neutral-700 dark:text-neutral-200">
                    Connecting{" "}
                    <span className="text-primary-text">Students</span>,
                    Instructors, and Companies for a{" "}
                    <span className="relative border-b-0 md:border-b-4 border-accent-foreground">
                        Better
                    </span>{" "}
                    Internship Experience
                </h1>
                <p className="text-center text-neutral-700 dark:text-neutral-300/90 max-w-3xl">
                    Students find the right internship by taking company-created
                    exams. Companies get the best candidates. Instructors help
                    organize the process
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button>How It Works?</Button>
                    <Button variant="outline" asChild>
                        <Link
                            className="flex items-center"
                            href="mailto:raeldevprojects@gmail.com"
                        >
                            <Mail />
                            <p className="flex-items-center">
                                Send Us an Email
                            </p>
                        </Link>
                    </Button>
                </div>
            </Wrapper>
        </div>
    );
}
