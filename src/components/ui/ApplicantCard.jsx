import { Mail, MapPin } from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function ApplicantCard({ applicant }) {
    return (
        <div className="rounded-lg shadow-xs bg-card p-3 md:p-4 lg:p-5 border flex flex-col items-start">
            <div className="mb-3 w-24 aspect-square rounded-full">
                <Avatar className="w-24 aspect-square">
                    <AvatarImage
                        src={
                            applicant?.students?.avatar_url ||
                            "/images/default-avatar.jpg"
                        }
                        alt="applicant-image"
                    />

                    <AvatarFallback>
                        {applicant?.students?.firstname.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </div>
            <p className="font-medium mb-1 text-start">
                {applicant?.students?.firstname} {applicant?.students?.lastname}
            </p>
            <p className="text-sm text-muted-foreground text-start">
                {applicant?.students?.school || "School not set"}
            </p>

            <div className="flex flex-col gap-2 items-start w-full py-3">
                <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin size={14} />
                    <p className="text-sm">Jimenez, Misamis Occidental</p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail size={14} />
                    <p className="text-sm">{applicant?.students?.email}</p>
                </div>
            </div>

            <div className="flex items-center flex-wrap gap-2 w-full mt-2">
                <Button className="grow" size="sm" variant="white">
                    View Details
                </Button>
                <Button className="grow" size="sm" variant="outline">
                    View Profile
                </Button>
            </div>
        </div>
    );
}
