import { getStudentProfileData } from "@/lib/actions/student";
import BorderBox from "../ui/BorderBox";
import { Avatar, AvatarImage } from "../ui/avatar";
import SecondaryLabel from "../ui/SecondaryLabel";
import { Button } from "../ui/button";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import TitleText from "../ui/TitleText";

export async function StudentDashboardDetails({ userId }) {
    const { data, error, success } = await getStudentProfileData(userId);

    return (
        <BorderBox className="border rounded-xl bg-card">
            <div className="pb-4 md:pb-5 flex items-center gap-3">
                <Avatar className="w-16 sm:w-20 aspect-square">
                    <AvatarImage
                        src={data.avatar_url || "/images/default-avatar.jpg"}
                    />
                </Avatar>
                <div className="flex items-center justify-between gap-2 w-full flex-wrap">
                    <div>
                        <SecondaryLabel>
                            {data.firstname} {data.middlename} {data.lastname}
                        </SecondaryLabel>

                        <p className="text-sm sm:text-base text-muted-foreground">
                            {data.email}
                        </p>
                    </div>

                    <Button asChild>
                        <Link href={`/student/profile/${userId}`}>
                            <PencilLine /> Edit Profile
                        </Link>
                    </Button>
                </div>
            </div>

            <TitleText>About Me</TitleText>
            <p className="text-muted-foreground mt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur qui expedita, autem placeat, sint distinctio
                excepturi ipsa repudiandae iusto molestiae tenetur, totam saepe
                aliquam molestias. Voluptates est nobis exercitationem eum!
            </p>
        </BorderBox>
    );
}
