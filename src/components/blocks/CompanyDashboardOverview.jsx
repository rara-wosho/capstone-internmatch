import { User, Users } from "lucide-react";
import DashboardCountBox from "../ui/DashboardCountBox";
import { getCompanyDashboardOverview } from "@/lib/actions/company";
import ErrorUi from "../ui/ErrorUi";
import TitleText from "../ui/TitleText";

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
    const rejectedApplicants = data?.applicants?.filter(
        (e) => e.status === "rejected"
    );
    const reviewedApplicants = data?.applicants?.filter(
        (e) => e.status === "reviewed"
    );

    console.log("data : ", data);
    return (
        <>
            <div className="rounded-xl bg-card p-3 sm:p-4 border md:p-5 mb-2 sm:mb-3 md:mb-4">
                <TitleText>Applicants</TitleText>
                <div className="flex items-center gap-2 mt-2">
                    <DashboardCountBox
                        icon={<Users />}
                        valueText={applicants.length}
                        label={"Applicants"}
                    />
                    <DashboardCountBox
                        icon={<Users />}
                        valueText={acceptedApplicants.length}
                        label={"Accepted Applicants"}
                    />
                    <DashboardCountBox
                        icon={<Users />}
                        valueText={reviewedApplicants.length}
                        label={"Reviewed Applicants"}
                    />
                    <DashboardCountBox
                        icon={<Users />}
                        valueText={rejectedApplicants.length}
                        label={"Rejected Applicants"}
                    />
                </div>
            </div>
            <div className="rounded-xl bg-card p-3 sm:p-4 border md:p-5 mb-2 sm:mb-3 md:mb-4">
                <TitleText>Exams</TitleText>
                <div className="flex items-center gap-2 mt-2">
                    <DashboardCountBox
                        icon={<Users />}
                        valueText={data?.exams?.length}
                        label={"Total Exams"}
                        color="bg-emerald-400/90"
                    />
                    <DashboardCountBox
                        color="bg-emerald-400/90"
                        icon={<User />}
                        valueText={unpublishedExams.length}
                        label={"Unpublished Exams"}
                    />
                    <DashboardCountBox
                        color="bg-emerald-400/90"
                        icon={<User />}
                        valueText={data?.exam_attempt?.length}
                        label={"All Examinees"}
                    />
                </div>
            </div>
        </>
    );
}
