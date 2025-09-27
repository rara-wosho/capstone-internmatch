import ApplicantCard from "../ui/ApplicantCard";
import BorderBox from "../ui/BorderBox";

export default function ApplicantsSection({ applicants }) {
    return (
        <div className="rounded-xl border shadow-xs bg-card">
            <BorderBox className="border-b">Applicants Data</BorderBox>

            <BorderBox className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <ApplicantCard />
                <ApplicantCard />
                <ApplicantCard />
            </BorderBox>
        </div>
    );
}
