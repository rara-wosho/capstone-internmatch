import { getStudentEditData } from "@/lib/actions/student";
import TitleText from "./TitleText";
import Link from "next/link";

export default async function ProfilePercentage() {
    const {
        success,
        percentage,
        data: studentData,
        error,
    } = await getStudentEditData();

    if (percentage === 100) return null;
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
                    <TitleText>
                        Complete your profile :{" "}
                        <span className="text-primary-text">
                            {percentage}% done
                        </span>
                    </TitleText>

                    <div className="relative w-full bg-muted h-2.5 overflow-hidden rounded-full mt-2 flex items-center">
                        <div
                            style={{ width: `${percentage}%` }}
                            className="h-2.5 bg-primary rounded-full"
                        ></div>
                    </div>
                </div>
            )}
        </Link>
    );
}
