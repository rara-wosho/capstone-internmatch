import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import Wrapper from "@/components/Wrapper";
import { ChevronLeft } from "lucide-react";

export default function CreateCompanyPage() {
    return (
        <div className="min-h-svh">
            <main className="mx-auto w-full max-w-[600px]">
                <div className="flex items-center py-2 justify-between">
                    <BackButton className="flex items-center">
                        <ChevronLeft size={20} /> Back
                    </BackButton>
                </div>
            </main>
        </div>
    );
}
