import { getStudentEditData } from "@/lib/actions/student";
import TitleText from "./TitleText";
import Link from "next/link";

export default async function ProfilePercentage() {
    const { success, data: studentData, error } = await getStudentEditData();

    if (studentData?.percentage === 100) return null;

    const formatMissingFields = studentData?.missingFields?.map((item) => {
        if (item === "avatar_url") {
            return "avatar image";
        } else {
            return item;
        }
    });

    return (
        <Link
            href="/student/account/edit"
            className="p-5 border rounded-xl bg-card grow basis-[130px] flex items-center gap-2.5"
        >
            {error || !success ? (
                <div>
                    Something went wrong while loading profile completion
                    progress.
                </div>
            ) : (
                <div className="whitespace-nowrap w-full">
                    <div>
                        <TitleText>
                            Complete your profile :{" "}
                            <span className="text-primary-text">
                                {studentData?.percentage}% done
                            </span>
                        </TitleText>
                        <p className="text-sm text-muted-foreground whitespace-break-spaces">
                            Please finish setting up the following details:{" "}
                            {formatMissingFields.join(", ")}
                        </p>
                    </div>

                    <div className="relative w-full bg-muted h-2.5 overflow-hidden rounded-full mt-2 flex items-center">
                        <div
                            style={{ width: `${studentData?.percentage}%` }}
                            className="h-2.5 bg-primary rounded-full"
                        ></div>
                    </div>
                </div>
            )}
        </Link>
    );
}
