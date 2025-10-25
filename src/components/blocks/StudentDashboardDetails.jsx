import { getStudentProfileData } from "@/lib/actions/student";
import BorderBox from "../ui/BorderBox";
import { Avatar, AvatarImage } from "../ui/avatar";
import SecondaryLabel from "../ui/SecondaryLabel";
import { Button } from "../ui/button";
import { GraduationCap, MapPin, PencilLine, School } from "lucide-react";
import Link from "next/link";

export async function StudentDashboardDetails({ userId }) {
    const { data, error, success } = await getStudentProfileData(userId);

    if (error || !success) {
        return <div>Something went wrong while loading student details.</div>;
    }

    return (
        <div>
            <div className="flex items-center gap-x-3 flex-wrap gap-y-4 mb-2 justify-between pb-5 border-b">
                {/* <Avatar className="w-16 aspect-square">
                    <AvatarImage
                        src={data.avatar_url || "/images/default-avatar.jpg"}
                    />
                </Avatar> */}
                <div>
                    <SecondaryLabel>
                        {data.firstname} {data.middlename} {data.lastname}
                    </SecondaryLabel>

                    <p className="text-sm sm:text-base text-muted-foreground">
                        {data.email}
                    </p>
                </div>

                <div className="flex items-center flex-row-reverse sm:flex-row gap-2">
                    <Button asChild variant="outline">
                        <Link href="/student/account/edit">
                            <PencilLine /> Edit Profile
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/student/companies">Browse Companies</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
