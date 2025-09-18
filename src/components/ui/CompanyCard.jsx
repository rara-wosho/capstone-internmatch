import Image from "next/image";
import { Button } from "./button";
import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";
import Link from "next/link";

export default function CompanyCard({ company }) {
    return (
        <div className="bg-white border dark:border-neutral-900 dark:bg-card rounded-xl p-2 shadow-xs flex flex-col">
            <div className="relative w-full aspect-[5/3.5] mb-3 rounded-sm overflow-hidden ">
                <Image
                    src="https://i.pinimg.com/1200x/5f/33/c7/5f33c741560bb71ebedb831267603c1b.jpg"
                    fill
                    alt="image"
                    className="object-cover"
                />

                <div className="absolute backdrop-blur-2xl rounded-full px-2 py-[2px] right-2 top-2 bg-neutral-200 shadow-xs">
                    <p className="text-xs text-neutral-700">Top rated</p>
                </div>
            </div>

            <div className="py-2 flex flex-col md:px-2 grow">
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
                <div className="flex items-center gap-2 mt-auto">
                    <Button
                        size="sm"
                        variant="outlineWhite"
                        className="grow"
                        asChild
                    >
                        <Link href={`/student/companies/${company?.id}`}>
                            View Details
                        </Link>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                        <Link
                            target="_blank"
                            href="https://www.google.com/search?q=hellow+there"
                        >
                            <ArrowUpRight size={16} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
