import {
    Check,
    CheckCheck,
    Ellipsis,
    Hourglass,
    Mail,
    MapPin,
} from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { dateFormatter } from "@/utils/date-formatter";

export default function ApplicantCard({ applicant }) {
    console.log(applicant);
    return (
        <div className="rounded-lg shadow bg-card p-3 md:p-4 lg:p-5 border flex flex-col items-start">
            <div className="w-full flex items-start justify-between">
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

                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            {applicant?.reviewed_at ? (
                                <Button
                                    size="smallIcon"
                                    variant="successOutline"
                                >
                                    <CheckCheck />
                                </Button>
                            ) : (
                                <Button size="smallIcon" variant="outline">
                                    <Hourglass />
                                </Button>
                            )}
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-fit p-2">
                            <div className="text-muted-foreground text-sm flex flex-col">
                                {applicant?.reviewed_at ? (
                                    <div>
                                        <p>Reviewed at</p>
                                        <p className="text-xs">
                                            {dateFormatter(
                                                applicant?.reviewed_at
                                            )}
                                        </p>
                                    </div>
                                ) : (
                                    "Not yet reviewed"
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button size="smallIcon" variant="outline">
                        <Ellipsis />
                    </Button>
                </div>
                {/* <div className="size-2 bg-amber-500 rounded-full"></div>  */}
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
