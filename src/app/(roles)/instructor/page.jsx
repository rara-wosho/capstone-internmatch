import AcceptedStudentsOverview from "@/components/blocks/AcceptedStudentsOverview";
import InstructorStudentOverview from "@/components/blocks/InstructorStudentOverview";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";

export default async function InstructorDashboardPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return <ErrorUi secondaryMessage="Unauthorized user." />;
    }

    return (
        <div className="space-y-3">
            <div>
                <SecondaryLabel>Instructor Dashboard</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    Your central hub for overseeing your students’ internship
                    journey.
                </p>
            </div>

            <BorderBox className="border rounded-xl bg-card">
                <InstructorStudentOverview instructorId={user.id} />
            </BorderBox>
            <BorderBox className="border rounded-xl bg-card">
                <AcceptedStudentsOverview instructorId={user.id} />
            </BorderBox>
        </div>
    );
}
