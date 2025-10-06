import InstructorRegistrationForm from "@/components/forms/InstructorRegistrationForm";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";

export default function Page() {
    return (
        <div className="min-h-[calc(100svh-60px)] px-3">
            <Wrapper size="sm">
                <SecondaryLabel className="mb-1 md:mb-2">
                    Provide details
                </SecondaryLabel>
                <p className="text-sm mb-4 text-muted-foreground">
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
