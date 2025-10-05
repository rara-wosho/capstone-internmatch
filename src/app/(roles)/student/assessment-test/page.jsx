import { Button } from "@/components/ui/button";
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

import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import Wrapper from "@/components/Wrapper";
import { CircleQuestionMark } from "lucide-react";

export default function AssessmentPage() {
    return (
        <Wrapper size="sm">
            <div className="flex items-center justify-between mb-3">
                <SecondaryLabel>Assessment Test</SecondaryLabel>

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
                                    The Assessment Test is designed to evaluate
                                    your knowledge, technical skills, and
                                    problem-solving ability before you begin
                                    your internship journey. It helps both you
                                    and potential companies understand your
                                    strengths and areas for improvement.
                                </DrawerDescription>

                                <div className="flex flex-col mt-6 items-start">
                                    <TertiaryLabel>
                                        What's included
                                    </TertiaryLabel>
                                    <ul className="text-muted-foreground list-disc ps-4 flex flex-col items-start gap-1 mb-5">
                                        <li>
                                            <strong>Core Knowledge - </strong>
                                            <span>
                                                General IT concepts and
                                                fundamentals.
                                            </span>
                                        </li>
                                        <li>
                                            <strong>Technical Skills - </strong>
                                            <span>
                                                Programming, databases,
                                                networking, or other fields
                                                related to your chosen track.
                                            </span>
                                        </li>
                                        <li>
                                            <strong>
                                                Problem-solving scenarios -{" "}
                                            </strong>
                                            <span>
                                                Real-world challenges to test
                                                how you apply your skills.
                                            </span>
                                        </li>
                                    </ul>
                                    <TertiaryLabel>
                                        How the Test Works
                                    </TertiaryLabel>
                                    <ul className="text-muted-foreground list-disc ps-4 flex flex-col items-start gap-1 mb-5">
                                        <li>
                                            The test is timed to simulate
                                            real-world pressure.
                                        </li>
                                        <li>
                                            You may select a difficulty level
                                            (e.g., Medium or Hard).
                                        </li>
                                        <li>
                                            Once you start, the timer will run
                                            until you finish or time runs out.
                                        </li>
                                    </ul>
                                    <TertiaryLabel>
                                        Why Take This Test
                                    </TertiaryLabel>
                                    <ul className="text-muted-foreground list-disc ps-4 flex flex-col items-start gap-1 mb-8">
                                        <li>
                                            Helps you identify your strengths
                                            and areas to improve before your
                                            internship.
                                        </li>
                                        <li>
                                            Allows companies to match you with
                                            the right opportunities based on
                                            your skill level.
                                        </li>
                                        <li>
                                            Builds confidence by letting you
                                            experience a structured evaluation
                                            before real-world tasks.
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
                                                Choose a quiet environment
                                                before starting.
                                            </li>
                                            <li>
                                                Read each question carefully.
                                            </li>
                                            <li>Manage your time wisely.</li>
                                            <li>
                                                Don’t worry if it feels
                                                challenging — the goal is to
                                                measure your current skill
                                                level, not perfection.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </DrawerHeader>
                            <DrawerFooter className="mb-8">
                                <Button
                                    variant="outline"
                                    className="px-8"
                                    asChild
                                >
                                    <DrawerClose>Close</DrawerClose>
                                </Button>
                            </DrawerFooter>
                        </Wrapper>
                    </DrawerContent>
                </Drawer>
            </div>
            <p className="mt-1 text-muted-foreground">
                This assessment is designed to evaluate your knowledge and basic
                capabilities before proceeding to internship applications.
                Please complete it in one sitting.
            </p>
        </Wrapper>
    );
}
