"use client";

import Image from "next/image";
import { Button } from "./button";
import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "@/context/SessionContext";

export default function CompanyCard({ company }) {
    const { userData } = useSession();

    return (
        <div className="bg-white border dark:border-neutral-900 dark:bg-card rounded-xl p-2 flex flex-col">
            <div className="relative w-full aspect-[5/3.5] mb-3 rounded-sm overflow-hidden">
                {company?.avatar_url ? (
                    <Image
                        src={company?.avatar_url}
                        fill
                        alt="image"
                        className="object-cover"
                    />
                ) : (
                    <div className="bg-accent w-full h-full flex flex-col items-center justify-center">
                        <Logo className="size-10 aspect-square" />
                        <p className="mt-1 text-xs text-muted-foreground">
                            No Photo Available
                        </p>
                    </div>
                )}
            </div>

            {/* body  */}
            <div className="flex flex-col p-2 grow">
                <p className="text-secondary-foreground font-semibold mb-1 truncate">
                    {company?.name}
                </p>
                <p className="text-sm mb-3 text-muted-foreground truncate">
                    {company?.details}
                </p>

                {company?.province && (
                    <div className="flex items-center text-muted-foreground gap-1.5 mb-2">
                        <MapPin size={14} />
                        <p className="text-xs truncate">
                            {company?.city}, {company?.province}
                        </p>
                    </div>
                )}
                <div className="flex items-center text-muted-foreground gap-1.5 mb-4">
                    <BriefcaseBusiness size={14} />{" "}
                    <p className="text-xs">Frontend Development + more</p>
                </div>
                <div className="flex items-center gap-2 mt-auto mb-0.5">
                    <Button
                        size="sm"
                        variant="outlineWhite"
                        className="grow"
                        asChild
                    >
                        {userData?.role === "student" ? (
                            <Link href={`/student/companies/${company?.id}`}>
                                View Details <ArrowUpRight />
                            </Link>
                        ) : (
                            <Link href={`/instructor/companies/${company?.id}`}>
                                View Details <ArrowUpRight />
                            </Link>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
