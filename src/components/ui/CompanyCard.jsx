import Image from "next/image";
import { Button } from "./button";
import { Activity, MapPin, Search } from "lucide-react";
import Link from "next/link";

export default function CompanyCard() {
    return (
        <div className="bg-white border dark:border-neutral-900 dark:bg-card rounded-sm p-2 shadow-xs">
            <div className="relative w-full aspect-[5/3.5] mb-3 rounded overflow-hidden ">
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

            <div className="p-2 flex flex-col">
                <p className="text-secondary-foreground font-semibold mb-1 truncate">
                    Card Title
                </p>
                <p className="text-sm mb-3 text-muted-foreground truncate">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum, ratione.
                </p>

                <div className="flex items-center text-muted-foreground gap-1.5 mb-2">
                    <MapPin size={14} />{" "}
                    <p className="text-xs truncate">Cagayan De Oro City</p>
                </div>
                <div className="flex items-center text-muted-foreground gap-1.5 mb-4">
                    <Activity size={14} />{" "}
                    <p className="text-xs">Frontend Development + more</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" asChild>
                        <Link
                            target="_blank"
                            href="https://www.google.com/search?q=hellow+there"
                        >
                            <Search size={16} />
                        </Link>
                    </Button>
                    <Button variant="white" size="sm" className="grow">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
