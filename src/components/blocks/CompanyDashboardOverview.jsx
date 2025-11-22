import {
    ClipboardCheck,
    FileText,
    FileUser,
    SquareCheckBig,
    UserRoundCheck,
    UserRoundX,
    Users,
} from "lucide-react";
import DashboardCountBox from "../ui/DashboardCountBox";
import { getCompanyDashboardOverview } from "@/lib/actions/company";
import TitleText from "../ui/TitleText";
import SecondaryLabel from "../ui/SecondaryLabel";
import StatusPill from "../ui/StatusPill";
import Link from "next/link";
import TertiaryLabel from "../ui/TertiaryLabel";

export default async function CompanyDashboardOverview({ userId }) {
    const { data, error, success } = await getCompanyDashboardOverview(userId);

    if (!success) {
        return (
            <div className="mb-3 border rounded-xl bg-card p-4">
                Something went wrong while fetching dashboard overview. {error}
            </div>
        );
    }

    const unpublishedExams = data?.exams?.filter(
        (e) => e.is_published === false
    );

    const applicants = data?.applicants;

    const acceptedApplicants = data?.applicants?.filter(
        (e) => e.status === "accepted"
    );
    // const rejectedApplicants = data?.applicants?.filter(
    //     (e) => e.status === "rejected"
    // );
    const reviewedApplicants = data?.applicants?.filter(
        (e) => e.status === "reviewed"
    );

    const approvedApplicants = data?.applicants?.filter(
        (e) => e.approved_at !== null
    );

    return (
        <>
            <div className="mb-3 md:mb-5">
                <SecondaryLabel>Dashboard</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    Here’s where you can keep track of your applicants, exams,
                    and company updates.
                </p>
            </div>
            <div className="grow rounded-xl bg-card p-3 sm:p-4 border md:p-5 mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    <TertiaryLabel>Applicants</TertiaryLabel>
                    <div className="flex items-center gap-1">
                        <p className="text-sm text-secondary-foreground">
                            Currently :
                        </p>
                        <Link href="/company/applicants?open=true">
                            <StatusPill
                                label={
                                    data.accept_applicants
                                        ? "Accepting Applicants"
                                        : "Not Accepting  Applicants"
                                }
                                size="md"
                                variant={
                                    data.accept_applicants
                                        ? "success"
                                        : "danger"
                                }
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex items-center flex-wrap gap-2 mt-2">
                    <DashboardCountBox
                        href="/company/approved-applicants"
                        icon={<SquareCheckBig />}
                        valueText={approvedApplicants.length}
                        label={"Approved Applicants"}
                    />
                    <DashboardCountBox
                        href="/company/applicants"
                        icon={<FileUser />}
                        valueText={applicants.length}
                        label={"Total Applicants"}
                    />
                    <DashboardCountBox
                        href="/company/applicants?status=accepted"
                        icon={<UserRoundCheck />}
                        valueText={acceptedApplicants.length}
                        label={"Accepted Applicants"}
                    />
                    <DashboardCountBox
                        href="/company/applicants?status=reviewed"
                        icon={<ClipboardCheck />}
                        valueText={reviewedApplicants.length}
                        label={"Reviewed Applications"}
                    />
                    {/* <DashboardCountBox
                        href="/company/applicants?status=rejected"
                        icon={<UserRoundX />}
                        valueText={rejectedApplicants.length}
                        label={"Rejected Applicants"}
                    /> */}
                </div>
            </div>

            <div className="rounded-xl bg-card p-3 sm:p-4 border md:p-5 mb-2 sm:mb-3 md:mb-4">
                <TertiaryLabel>Exams</TertiaryLabel>
                <div className="flex items-center flex-wrap gap-2 mt-2">
                    <DashboardCountBox
                        href="/company/manage-exam"
                        icon={<FileText />}
                        valueText={data?.exams?.length}
                        label={"Total Exams"}
                        color="bg-emerald-400/90"
                    />
                    <DashboardCountBox
                        href="/company/manage-exam"
                        color="bg-emerald-400/90"
                        icon={<FileText />}
                        valueText={unpublishedExams.length}
                        label={"Unpublished Exams"}
                    />
                    <DashboardCountBox
                        href="/company/examinees"
                        color="bg-emerald-400/90"
                        icon={<Users />}
                        valueText={data?.exam_attempt?.length}
                        label={"All Examinees"}
                    />
                </div>
            </div>
        </>
    );
}
