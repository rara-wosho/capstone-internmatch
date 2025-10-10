import InstructorRegistrationForm from "@/components/forms/InstructorRegistrationForm";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { ChevronLeft, SearchCheck } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-[calc(100svh-64px)] px-3 pb-16">
            <Wrapper size="sm">
                <div className="flex items-center gap-x-1 mb-1 md:mb-4">
                    <BackButton className="hover:text-accent-foreground">
                        <ChevronLeft size={24} />
                    </BackButton>
                    <SecondaryLabel>Registration Form</SecondaryLabel>

                    <div className="ms-auto">
                        <Button size="sm" variant="outline" asChild>
                            <Link href="/create-account/track-registration">
                                <SearchCheck />
                                <span className="hidden sm:inline-block">
                                    Track Registration
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
                <p className="text-sm mb-3 md:mb-5 text-muted-foreground">
                    Before you can create an account, you need to complete the
                    registration form and provide the required verification
                    documents. Our administrators will review your submission,
                    and if approved, you'll be notified by email to set up your
                    instructor account.
                </p>

                <InstructorRegistrationForm />

                <p className="text-sm text-muted-foreground py-4 w-full text-center">
                    By submitting the form, you agree that the information you
                    provided is true and will be used for account verification
                    and approval.
                </p>
            </Wrapper>
        </div>
    );
}
