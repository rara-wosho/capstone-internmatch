import NextStepSection from "@/components/features/approved-applicants/next-step-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { dateFormatter } from "@/utils/date-formatter";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Suspense } from "react";

const links = [
    { href: "", label: "Home" },
    { href: "/company/approved-applicants", label: "Approved Applicants" },
    { href: "", label: "Next Steps" },
];

export default async function Page({ params }) {
    const applicantId = (await params)?.applicantId || "";

    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        return <ErrorUi secondaryMessage="Invalid session token." />;
    }

    const supabase = await createClient();

    const { data: applicants, error } = await supabase
        .from("applicants")
        .select(
            "id, company_id, students!inner(id, firstname, lastname, school, email, avatar_url, schedule_student_ids(id))"
        )
        .eq("approve_status", "approved")
        .eq("status", "accepted")
        .eq("company_id", user.id);

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }

    return (
        <div>
            <Wrapper size="sm">
                <div className="mb-3">
                    <SecondaryLabel>
                        Schedule Activities or Request Documents
                    </SecondaryLabel>
                    <BreadCrumbs links={links} />
                </div>

                {/* HEADER / STUDENT INFO  */}
                {/* <div className="flex items-center gap-3 mb-6">
                    <Avatar className="w-[100px] aspect-square">
                        <AvatarImage
                            src={
                                student?.avatar_url ||
                                "/images/default-avatar.jpg"
                            }
                        />
                        <AvatarFallback>
                            {student?.lastname?.charAt(0) || "?"}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <SecondaryLabel>
                            {student?.firstname} {student?.lastname}
                        </SecondaryLabel>
                        <p className="text-sm text-muted-foreground">
                            {student?.school}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {student?.email}
                        </p>
                    </div>
                </div> */}

                {/* EXISTING SCHEDULE WARNING */}
                {/* <Suspense fallback={null}>{existingSchedule}</Suspense> */}

                {/* NEXT STEPS SECTION */}
                <NextStepSection
                    // studentId={student.id}
                    // studentEmail={student.email}
                    // hasExistingSchedule={!!existingSchedule}
                    studentId={applicantId}
                    applicants={applicants}
                />
            </Wrapper>
        </div>
    );
}
