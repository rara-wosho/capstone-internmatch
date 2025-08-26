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
import { FileText, PlusCircle } from "lucide-react";
import TertiaryLabel from "../ui/TertiaryLabel";
import IconWrapper from "../ui/IconWrapper";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";

export default function AddQuestionModal() {
    return (
        <Dialog>
            <Button variant="white" asChild className="sm:grow-0 grow">
                <DialogTrigger>
                    <PlusCircle />
                    Add question
                </DialogTrigger>
            </Button>
            <DialogContent className="p-3 sm:p-5">
                <div className="overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="py-2">
                            <TertiaryLabel className="space-x-2">
                                <IconWrapper>
                                    <FileText size={16} />
                                </IconWrapper>
                                <p>New Question</p>
                            </TertiaryLabel>
                        </DialogTitle>
                        <DialogDescription className="text-left">
                            You can add choices after saving the question
                        </DialogDescription>

                        <div className="overflow-y-auto max-h-[75vh] mt-2">
                            <form action="">
                                <div className="mb-6 flex flex-col items-start">
                                    <FormLabel className="text-left">
                                        Question
                                    </FormLabel>
                                    <Input placeholder="What is a software?" />
                                </div>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit">Save question</Button>
                                </DialogFooter>
                            </form>
                        </div>
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    );
}
