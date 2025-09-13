import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { FileText, PenLine, PlusCircle } from "lucide-react";
import TertiaryLabel from "../ui/TertiaryLabel";
import IconWrapper from "../ui/IconWrapper";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { ScrollArea } from "../ui/scroll-area";

export default function AboutExamModal({ children, exam }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="p-3 sm:p-5 sm:max-w-2xl">
                <div>
                    <DialogHeader>
                        <div className="border-b pb-3">
                            <DialogTitle className="py-1">
                                <TertiaryLabel>
                                    <p>Edit exam</p>
                                </TertiaryLabel>
                            </DialogTitle>
                        </div>
                        <form>
                            <ScrollArea className="h-[65svh]">
                                <div className="flex flex-col gap-y-3.5 mb-6">
                                    <div className="flex flex-col items-start">
                                        <FormLabel className="text-left">
                                            Title
                                        </FormLabel>
                                        <Input
                                            defaultValue={exam?.title}
                                            placeholder="Enter exam title?"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <FormLabel className="text-left">
                                            Description
                                        </FormLabel>
                                        <Input
                                            defaultValue={exam?.description}
                                            placeholder="Enter description?"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <FormLabel className="text-left">
                                            Instruction
                                        </FormLabel>
                                        <Input
                                            defaultValue={exam?.instruction}
                                            placeholder="Enter instruction?"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col mb-6 gap-y-2 items-start">
                                    <p className="mb-1">Settings</p>
                                    <div className="flex justify-between items-center w-full">
                                        <FormLabel>Publish</FormLabel>
                                        <Switch
                                            defaultChecked={exam?.is_published}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <FormLabel>Shuffle questions</FormLabel>
                                        <Switch
                                            defaultChecked={
                                                exam?.shuffle_questions
                                            }
                                        />
                                    </div>
                                    <div className="mt-1 w-full flex flex-col items-start">
                                        <FormLabel>Exam duration</FormLabel>
                                        <Input placeholder="minutes" />
                                    </div>
                                    <div className="w-full flex flex-col items-start">
                                        <FormLabel>Mode</FormLabel>
                                        <Input placeholder="minutes" />
                                    </div>
                                </div>
                            </ScrollArea>
                            <DialogFooter className="pt-2.5">
                                <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    );
}
