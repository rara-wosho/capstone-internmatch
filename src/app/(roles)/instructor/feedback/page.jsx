import FeedbackForm from "@/components/forms/FeedbackForm";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";

export default function InstructorFeedbackPage() {
    return (
        <Wrapper size="sm">
            <div className="mb-4 md:mb-5">
                <SecondaryLabel>Feedback</SecondaryLabel>
                <p className="text-muted-foreground text-sm">
                    Your feedback helps us improve InternMatch. We appreciate
                    you taking the time to share your thoughts.
                </p>
            </div>

            <FeedbackForm />
        </Wrapper>
    );
}
