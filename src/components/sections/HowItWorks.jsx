import Link from "next/link";
import { Button } from "../ui/button";
import Card from "../ui/card";
import GradientText from "../ui/GradientText";
import Wrapper from "../Wrapper";
import { ArrowUpRight } from "lucide-react";

export default function HowItWorks() {
    return (
        <div id="how-it-works" className="py-[6rem] flex flex-col items-center">
            <GradientText className="text-2xl md:text-4xl mb-1">
                How It Works
            </GradientText>

            <p className="mb-8 text-muted-foreground text-center max-w-4xl">
                Whether you’re a student seeking the right internship, a company
                looking for qualified candidates, or an instructor guiding
                future professionals, our platform streamlines the process from
                start to finish.
            </p>

            <Wrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="hover:-translate-y-2 transition-transform duration-300 p-3 md:p-5">
                    <h1 className="text-5xl md:text-6xl mb-2 overflow-hidden font-bold text-primary flex">
                        <p className="-translate-x-4">01</p>
                    </h1>
                    <h4 className="font-bold text-lg mb-2 text-secondary-foreground">
                        Company
                    </h4>
                    <p className="text-muted-foreground ">
                        Find qualified IT students by creating customized exams
                        and evaluating applicants based on your specific
                        requirements and standards.
                    </p>
                </Card>
                <Card className="hover:-translate-y-2 transition-transform duration-300 p-3 md:p-5">
                    <h1 className="text-5xl md:text-6xl mb-2 overflow-hidden font-bold text-primary flex">
                        <p className="-translate-x-4">02</p>
                    </h1>
                    <h4 className="font-bold text-lg mb-2 text-secondary-foreground">
                        Student
                    </h4>
                    <p className="text-muted-foreground ">
                        Discover internship opportunities that match your skills
                        and career goals. Take company-administered exams to
                        showcase your capabilities.
                    </p>
                </Card>
                <Card className="hover:-translate-y-2 transition-transform duration-300 p-3 md:p-5">
                    <h1 className="text-5xl md:text-6xl mb-2 overflow-hidden font-bold text-primary flex">
                        <p className="-translate-x-4">03</p>
                    </h1>
                    <h4 className="font-bold text-lg mb-2 text-secondary-foreground">
                        OJT Instructor
                    </h4>
                    <p className="text-muted-foreground">
                        Manage student groups, track progress, and ensure your
                        students are well-prepared for their internship journey.
                    </p>
                </Card>
            </Wrapper>

            <Button asChild className="mt-8" size="lg">
                <Link href="/about">
                    Learn More <ArrowUpRight />
                </Link>
            </Button>
        </div>
    );
}
