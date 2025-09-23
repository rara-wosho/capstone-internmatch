import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { FileUser } from "lucide-react";

export default function Page() {
    return (
        <div>
            <SecondaryLabel className="mb-3 gap-2">
                <IconWrapper>
                    <FileUser size={17} />
                </IconWrapper>
                Applications
            </SecondaryLabel>
        </div>
    );
}
