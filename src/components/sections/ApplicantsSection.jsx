import { Suspense } from "react";
import SearchField from "../forms/SearchStudent";
import ApplicantCard from "../ui/ApplicantCard";
import BorderBox from "../ui/BorderBox";

export default function ApplicantsSection({ applicants }) {
    return (
        <BorderBox className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-card shadow-xs border rounded-xl">
            {applicants.map((applicant, index) => (
                <ApplicantCard key={index} applicant={applicant} />
            ))}
        </BorderBox>
    );
}
