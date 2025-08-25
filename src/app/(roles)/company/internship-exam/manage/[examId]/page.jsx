import AddQuestionAbout from "@/components/exam/AddQuestionAbout";
import AddQuestionCard from "@/components/exam/AddQuestionCard";
import BackButton from "@/components/ui/BackButton";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import { ChevronLeft, PlusCircle } from "lucide-react";

export default function Page() {
    const questions = [
        { id: 1, question: "this  is for qestin nuumber one" },
        { id: 2, question: "two two two two" },
        { id: 3, question: "three hsalsjd lskjda s" },
    ];
    return (
        <div className="lg:px-10">
            {/* header  */}
            <div className="flex items-center pb-5 md:pb-7 pt-2 md:pt-5 border-b mb-5 md:mb-8 flex-wrap md:flex-nowrap gap-x-10 gap-y-4">
                <BackButton className="hover:text-primary-text rounded-sm pe-2 transition-colors">
                    <SecondaryLabel className="gap-2 text-left">
                        <ChevronLeft />
                        <span>Funcamentals of programming</span>
                    </SecondaryLabel>
                </BackButton>

                <div className="ms-auto grow md:grow-0 flex justify-end">
                    <Button variant="white" className="sm:grow-0 grow">
                        <PlusCircle />
                        Add question
                    </Button>
                </div>
            </div>

            {/* content  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* list of questions  */}
                <div className="lg:col-span-2 flex flex-col gap-3 order-2 lg:order-1">
                    {questions.map((q) => (
                        <AddQuestionCard
                            key={q.id}
                            id={q.id}
                            initialQuestion={q.question}
                        />
                    ))}
                </div>

                {/* right section  */}
                {/* about and settings section  */}
                <div className="flex flex-col gap-3 order-1 lg:order-2">
                    <AddQuestionAbout />
                    <BorderBox className="border rounded-xl bg-card shadow-xs">
                        <TertiaryLabel className="mb-3">
                            Total questions
                        </TertiaryLabel>
                        <div className="flex gap-2 flex-wrap">
                            {questions.map((q, index) => (
                                <div
                                    key={index}
                                    className="size-8 rounded-sm border flex items-center justify-center bg-card"
                                >
                                    <p className="text-sm text-secondary-foreground">
                                        {index + 1}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </BorderBox>
                </div>
            </div>
        </div>
    );
}
