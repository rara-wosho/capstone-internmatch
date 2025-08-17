import { ThemeToggler } from "@/components/theme-toggler";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { ChevronLeft, CircleQuestionMark } from "lucide-react";
import Difficulty from "./Difficulty";
import TertiaryLabel from "@/components/ui/TertiaryLabel";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export default function Page() {
    return (
        <div className="p-3">
            <Wrapper size="sm">
                <div className="flex items-center justify-between">
                    <BackButton className="flex items-center gap-1">
                        <ChevronLeft size={20} /> <p>Back</p>
                    </BackButton>

                    <div className="flex items-center gap-3">
                        <Button variant="secondary" asChild>
                            <ThemeToggler />
                        </Button>

                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="secondary" size="sm">
                                    <CircleQuestionMark /> Help
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <Wrapper size="sm" className="overflow-y-auto">
                                    <DrawerHeader>
                                        <DrawerTitle>
                                            <SecondaryLabel className="text-center">
                                                About the Assessment Test
                                            </SecondaryLabel>
                                        </DrawerTitle>
                                        <DrawerDescription className="text-left">
                                            The Assessment Test is designed to
                                            evaluate your knowledge, technical
                                            skills, and problem-solving ability
                                            before you begin your internship
                                            journey. It helps both you and
                                            potential companies understand your
                                            strengths and areas for improvement.
                                        </DrawerDescription>

                                        <div className="flex flex-col mt-6 items-start">
                                            <TertiaryLabel>
                                                What's included
                                            </TertiaryLabel>
                                            <ul className="text-muted-foreground list-disc ps-4 flex flex-col items-start gap-1 mb-5">
                                                <li>
                                                    <strong>
                                                        Core Knowledge -{" "}
                                                    </strong>
                                                    <span>
                                                        General IT concepts and
                                                        fundamentals.
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong>
                                                        Technical Skills -{" "}
                                                    </strong>
                                                    <span>
                                                        Programming, databases,
                                                        networking, or other
                                                        fields related to your
                                                        chosen track.
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong>
                                                        Problem-solving
                                                        scenarios -{" "}
                                                    </strong>
                                                    <span>
                                                        Real-world challenges to
                                                        test how you apply your
                                                        skills.
                                                    </span>
                                                </li>
                                            </ul>
                                            <TertiaryLabel>
                                                How the Test Works
                                            </TertiaryLabel>
                                            <ul className="text-muted-foreground list-disc ps-4 flex flex-col items-start gap-1 mb-5">
                                                <li>
                                                    The test is timed to
                                                    simulate real-world
                                                    pressure.
                                                </li>
                                                <li>
                                                    You may select a difficulty
                                                    level (e.g., Medium or
                                                    Hard).
                                                </li>
                                                <li>
                                                    Once you start, the timer
                                                    will run until you finish or
                                                    time runs out.
                                                </li>
                                            </ul>
                                            <TertiaryLabel>
                                                Why Take This Test
                                            </TertiaryLabel>
                                            <ul className="text-muted-foreground list-disc ps-4 flex flex-col items-start gap-1 mb-8">
                                                <li>
                                                    Helps you identify your
                                                    strengths and areas to
                                                    improve before your
                                                    internship.
                                                </li>
                                                <li>
                                                    Allows companies to match
                                                    you with the right
                                                    opportunities based on your
                                                    skill level.
                                                </li>
                                                <li>
                                                    Builds confidence by letting
                                                    you experience a structured
                                                    evaluation before real-world
                                                    tasks.
                                                </li>
                                            </ul>

                                            <div className="rounded-lg border border-blue-300 dark:border-blue-600/50 dark:bg-blue-600/10 bg-blue-300/15 p-3 w-full">
                                                <TertiaryLabel>
                                                    <span className="text-blue-600 dark:text-blue-300">
                                                        Tips for Success
                                                    </span>
                                                </TertiaryLabel>
                                                <ul className="text-blue-500 dark:text-blue-300 text-sm flex flex-col items-start gap-1 mt-2">
                                                    <li>
                                                        Choose a quiet
                                                        environment before
                                                        starting.
                                                    </li>
                                                    <li>
                                                        Read each question
                                                        carefully.
                                                    </li>
                                                    <li>
                                                        Manage your time wisely.
                                                    </li>
                                                    <li>
                                                        Don’t worry if it feels
                                                        challenging — the goal
                                                        is to measure your
                                                        current skill level, not
                                                        perfection.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </DrawerHeader>
                                    <DrawerFooter className="mb-8">
                                        <DrawerClose>
                                            <Button
                                                variant="outline"
                                                className="px-8"
                                            >
                                                Close
                                            </Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </Wrapper>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
                <div className="pt-[2rem] md:pt-[5rem]">
                    <div className="">
                        <SecondaryLabel className="mb-2">
                            Assessment Test
                        </SecondaryLabel>
                        <p className="text-muted-foreground">
                            This assessment is designed to evaluate your
                            knowledge and basic capabilities before proceeding
                            to internship applications. Please complete it in
                            one sitting.
                        </p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-muted-foreground">
                        <div className="bg-white dark:bg-card rounded p-2">
                            <TertiaryLabel className="mb-2">
                                Duration
                            </TertiaryLabel>
                            <p>1 hour</p>
                        </div>
                        <div className="bg-white dark:bg-card rounded p-2">
                            <TertiaryLabel className="mb-2">
                                Number of Questions
                            </TertiaryLabel>
                            <p>30</p>
                        </div>
                        <div className="bg-white dark:bg-card rounded p-2">
                            <TertiaryLabel className="mb-2">
                                Type of Question
                            </TertiaryLabel>
                            <p>Multiple choice</p>
                        </div>
                    </div>
                    <Difficulty />
                </div>
            </Wrapper>
        </div>
    );
}
