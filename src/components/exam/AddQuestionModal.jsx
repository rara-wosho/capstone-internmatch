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
            <DialogContent>
                <div className="overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            <TertiaryLabel className="space-x-2">
                                <IconWrapper>
                                    <FileText size={16} />
                                </IconWrapper>
                                <p>New Question</p>
                            </TertiaryLabel>
                        </DialogTitle>
                        <DialogDescription>
                            You can add choices after saving the question
                        </DialogDescription>

                        <div className="overflow-y-auto max-h-[75vh] mt-2">
                            <form action="">
                                <div className="mb-6">
                                    <FormLabel>Question</FormLabel>
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
