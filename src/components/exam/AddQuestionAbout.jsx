import BorderBox from "../ui/BorderBox";
import FormLabel from "../ui/FormLabel";
import { Switch } from "../ui/switch";
import TertiaryLabel from "../ui/TertiaryLabel";
import AboutExamModal from "./AboutExamModal";

export default function AddQuestionAbout() {
    return (
        <BorderBox className="border rounded-xl bg-card shadow-xs">
            <div className="flex items-center mb-3">
                <TertiaryLabel>About</TertiaryLabel>
                <AboutExamModal />
            </div>
            <div className="flex flex-col">
                <div className="mb-4">
                    <h3 className="mb-1 text-sm">Description</h3>
                    <p className="text-sm text-muted-foreground">
                        This is a description for this exam
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="mb-1 text-sm">Instruction</h3>
                    <p className="text-sm text-muted-foreground">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Recusandae, autem!
                    </p>
                </div>
            </div>

            <div className="border-t mt-4 pt-5">
                <TertiaryLabel className="mb-3">Settings</TertiaryLabel>
                <div className="flex justify-between items-center mb-2.5">
                    <FormLabel>Open for examinees</FormLabel>
                    <Switch checked disabled />
                </div>
                <div className="flex justify-between items-center mb-2.5">
                    <FormLabel>Shuffle questions</FormLabel>
                    <Switch checked disabled />
                </div>
                <div className="flex justify-between items-center mb-2.5">
                    <FormLabel>Shuffle choices</FormLabel>
                    <Switch checked disabled />
                </div>
                <div className="flex justify-between items-center mb-2.5">
                    <FormLabel>Exam duration</FormLabel>
                    <p className="text-sm text-muted-foreground">1hr</p>
                </div>
            </div>
        </BorderBox>
    );
}
