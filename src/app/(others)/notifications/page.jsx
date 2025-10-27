import BackButton from "@/components/ui/BackButton";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function NotificationsPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        notFound();
    }

    return (
        <div className="px-3 py-5">
            <Wrapper size="sm">
                <BackButton className="flex items-center mb-3">
                    <ChevronLeft size={18} />
                    <p className="text-muted-foreground ">Back</p>
                </BackButton>
                <div className="mb-3">
                    <SecondaryLabel>Notifications</SecondaryLabel>
                </div>
            </Wrapper>
        </div>
    );
}
