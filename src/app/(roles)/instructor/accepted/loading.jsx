import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

export default function AcceptedApplicationLoadingPage() {
    return (
        <div>
            <div className="mb-4 md:mb-5">
                <SecondaryLabel>Accepted Applications</SecondaryLabel>
                <p className="text-muted-foreground text-sm">
                    These are applications that have been accepted by companies
                    and are now awaiting your review and approval. Approving an
                    application finalizes the student’s internship placement.
                </p>
            </div>

            <BorderBox className="bg-card rounded-xl border">
                <div className="flex items-center gap-2">
                    <Loader className="animate-spin" size={16} />{" "}
                    <p>Please wait...</p>
                </div>
            </BorderBox>
        </div>
    );
}
