"use client";
import { ArrowLeft, ArrowRight, Maximize, Minimize } from "lucide-react";
import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import { useState } from "react";

export default function ExamQuestionForm({ examinationData }) {
    const [focus, setFocus] = useState(false);

    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    const handleNext = () => {};
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
                {!focus && (
                    <div className="left-section w-[300px] flex flex-col gap-3 md:gap-4">
                        <div className=" p-3 bg-card shadow-xs rounded-xl border flex items-center justify-center flex-col">
                            <p className="text-sm mb-2 py-4">Time Remaining</p>
                            <div className="w-20 rounded-full aspect-square border mb-4"></div>
                        </div>
                        <div className=" p-3 bg-card shadow-xs rounded-xl border flex items-center justify-center flex-col">
                            {/* <p className="text-sm mb-2 py-4">Time Remaining</p>  */}
                            <div className="flex flex-wrap gap-2">
                                {arr.map((_, index) => (
                                    <div
                                        className="w-9 rounded-lg aspect-square bg-muted flex items-center justify-center"
                                        key={index}
                                    >
                                        <p className="text-sm text-secondary-foreground">
                                            {index + 1}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className="rounded-xl border bg-card shadow-xs grow">
                    <BorderBox className="">
                        <div className="flex items-center justify-between mb-3">
                            <h1>Question 1 of 25</h1>
                            <button
                                onClick={() => setFocus(!focus)}
                                className="cursor-pointer"
                            >
                                {focus ? (
                                    <Minimize size={20} />
                                ) : (
                                    <Maximize size={20} />
                                )}
                            </button>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden w-full bg-muted">
                            <div className="bg-primary w-[30%] h-1"></div>
                        </div>
                    </BorderBox>
                    <BorderBox className="right-section">
                        <p className="md:text-lg mb-5 py-2 font-medium text-secondary-foreground">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolores, neque nisi. Labore.
                        </p>

                        <div className="flex flex-col gap-3 sm:gap-4 mb-8">
                            <div className="rounded-lg p-3.5 text-muted-foreground transition-all ring-1 ring-neutral-300 hover:ring-primary dark:hover:ring-primary dark:ring-neutral-800">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Iste, eligendi!
                            </div>
                            <div className="rounded-lg p-3.5 text-muted-foreground transition-all ring-1 ring-neutral-300 hover:ring-primary dark:hover:ring-primary dark:ring-neutral-800">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Iste, eligendi!
                            </div>
                            <div className="rounded-lg p-3.5 text-muted-foreground transition-all ring-1 ring-neutral-300 hover:ring-primary dark:hover:ring-primary dark:ring-neutral-800">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Iste, eligendi!
                            </div>
                        </div>
                        <div className="flex items-center gap-3 justify-between">
                            <Button variant="secondary">
                                <ArrowLeft /> Prev
                            </Button>
                            <Button>
                                Next
                                <ArrowRight />
                            </Button>
                        </div>
                    </BorderBox>
                </div>
            </div>
        </div>
    );
}
