import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import SpinLoader from "@/components/ui/SpinLoader";
import { FileUser } from "lucide-react";

export default function Loading() {
    return (
        <div>
            <SecondaryLabel className="mb-4 gap-2">
                <IconWrapper>
                    <FileUser size={17} />
                </IconWrapper>
                Applications
            </SecondaryLabel>
            <SpinLoader />
        </div>
    );
}
