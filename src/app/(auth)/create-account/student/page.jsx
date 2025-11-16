import BackButton from "@/components/ui/BackButton";
import Wrapper from "@/components/Wrapper";
import { ChevronLeft } from "lucide-react";

export default function Page() {
    return (
        <div className="min-h-svh pb-16 px-3">
            <Wrapper size="sm">
                <div className="flex items-center mb-4 gap-1">
                    <BackButton className="flex items-center hover:text-accent-foreground">
                        <ChevronLeft size={20} /> Back
                    </BackButton>
                </div>

                <p className="text-muted-foreground">
                    You’ll need an invitation link from your instructor to
                    create your student account. Once you receive it, you can
                    register and start using the platform
                </p>
            </Wrapper>
        </div>
    );
}
