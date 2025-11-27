"use client";

import Image from "next/image";
import { Button } from "./button";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function CompanyCard({ company }) {
    const pathname = usePathname();

    const isStudent = pathname.startsWith("/student");

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
                <p className="text-sm mb-3 text-muted-foreground line-clamp-2">
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

                {company?.company_offers?.offers?.length > 0 && (
                    <div className="text-muted-foreground mb-4 flex items-center gap-1.5">
                        <Briefcase className="shrink-0" size={14} />
                        <p className="text-xs truncate">
                            {company?.company_offers?.offers.join(", ")}
                        </p>
                    </div>
                )}
                <div className="flex items-center gap-2 mt-auto mb-0.5">
                    <Button
                        size="sm"
                        variant="outlineWhite"
                        className="grow"
                        asChild
                    >
                        {isStudent ? (
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
