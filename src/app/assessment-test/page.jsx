import { ThemeToggler } from "@/components/theme-toggler";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { ChevronLeft, CircleQuestionMark } from "lucide-react";
import Difficulty from "./Difficulty";
import TertiaryLabel from "@/components/ui/TertiaryLabel";

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
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-muted-foreground">
                        <div className="bg-card rounded p-2">
                            <TertiaryLabel className="mb-2">
                                Duration
                            </TertiaryLabel>
                            <p>1 hour</p>
                        </div>
                        <div className="bg-card rounded p-2">
                            <TertiaryLabel className="mb-2">
                                Number of Questions
                            </TertiaryLabel>
                            <p>30</p>
                        </div>
                        <div className="bg-card rounded p-2">
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
