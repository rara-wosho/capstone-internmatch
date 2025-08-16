import { ThemeToggler } from "@/components/theme-toggler";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import Wrapper from "@/components/Wrapper";
import { ChevronLeft, CircleQuestionMark } from "lucide-react";

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
                        <Button variant="secondary" size="sm">
                            <CircleQuestionMark /> Help
                        </Button>
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

                    <div className="mt-8 flex flex-col gap-y-3 text-muted-foreground">
                        <p>Duration : 1 hour</p>
                        <p>Number of questions : 30</p>
                        <p>Type of questions : Multiple choice</p>
                    </div>

                    <div className="mt-10 flex flex-col items-center md:items-start border-t pt-10">
                        <TertiaryLabel className="mb-3">
                            Ready to take the test now? Click start test
                        </TertiaryLabel>

                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-lg gap-2">
                            <Button
                                asChild
                                variant="secondary"
                                className="order-2 sm:order-1"
                            >
                                <BackButton>Maybe Later</BackButton>
                            </Button>
                            <Button className="order-1 sm:order-2">
                                Start Test
                            </Button>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
