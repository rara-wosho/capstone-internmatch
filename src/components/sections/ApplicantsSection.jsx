import { Suspense } from "react";
import SearchField from "../forms/SearchStudent";
import ApplicantCard from "../ui/ApplicantCard";
import BorderBox from "../ui/BorderBox";
import { Skeleton } from "../ui/skeleton";

export default function ApplicantsSection({ applicants }) {
    return (
        <div className="flex flex-col gap-3">
            <BorderBox className="rounded-xl border bg-card shadow-xs">
                <Suspense fallback={<div>Loading search...</div>}>
                    <SearchField
                        actionPath="/company/applicants"
                        placeholder="Search applicant"
                    />
                </Suspense>
            </BorderBox>

            <BorderBox className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-card shadow-xs border rounded-xl">
                {applicants.map((applicant, index) => (
                    <ApplicantCard key={index} applicant={applicant} />
                ))}
            </BorderBox>
        </div>
    );
}
