import { Button } from "../ui/button";
import FormLabel from "../ui/FormLabel";
import { Input } from "../ui/input";
import SecondaryLabel from "../ui/SecondaryLabel";
import TertiaryLabel from "../ui/TertiaryLabel";
import { Textarea } from "../ui/textarea";

export default function RequestAdditionalDocumentForm() {
    return (
        <div>
            <div className="mb-6">
                <TertiaryLabel>Request additional documents</TertiaryLabel>
                <p className="text-sm text-muted-foreground">
                    This will send directly to the student's email address.
                </p>
            </div>

            <div className="mb-2 pb-2 border-b">
                <SecondaryLabel>Email Content</SecondaryLabel>
            </div>
            <div className="space-y-3 mb-3">
                <div>
                    <FormLabel>Subject</FormLabel>
                    <Input
                        defaultValue="Requesting for additional documents"
                        name="subject"
                    />
                </div>
                <div>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                        name="content"
                        placeholder="Enter content here..."
                    />
                </div>
            </div>

            <Button>Send Request</Button>
        </div>
    );
}
