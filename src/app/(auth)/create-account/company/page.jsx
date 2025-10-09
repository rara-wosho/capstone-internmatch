import CreateCompanyAccountForm from "@/components/forms/CreateCompanyAccountForm";
import BackButton from "@/components/ui/BackButton";
import BorderBox from "@/components/ui/BorderBox";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { ChevronLeft } from "lucide-react";

export default function CreateCompanyPage() {
    return (
        <div className="min-h-svh pb-16 px-3">
            <Wrapper size="sm">
                <div className="flex items-center mb-4 gap-1">
                    <BackButton className="flex items-center hover:text-accent-foreground">
                        <ChevronLeft size={24} />
                    </BackButton>
                    <SecondaryLabel>Create Company Account</SecondaryLabel>
                </div>

                <BorderBox className="border bg-card shadow-xs rounded-xl">
                    <CreateCompanyAccountForm />
                </BorderBox>
            </Wrapper>
        </div>
    );
}
