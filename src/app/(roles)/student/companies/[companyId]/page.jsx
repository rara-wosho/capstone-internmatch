import BreadCrumbs from "@/components/ui/BreadCrumbs";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import Image from "next/image";
import ExaminationSection from "./ExaminationSection";
import { Button } from "@/components/ui/button";

const links = [
    { href: "", label: "Home" },
    { href: "/students/companies", label: "Companies" },
    { href: "", label: "Company details" },
];

export default async function Page({ params }) {
    const { companyId } = await params;
    return (
        <div>
            <BreadCrumbs links={links} className="mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-3">
                {/* main content  */}
                <div className="left ">
                    <div className="bg-white dark:bg-transparent border rounded-lg p-5 mb-3">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="relative size-24 shrink-0">
                                <Image
                                    src="https://i.pinimg.com/1200x/5f/33/c7/5f33c741560bb71ebedb831267603c1b.jpg"
                                    alt="comapny img"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-full">
                                <SecondaryLabel className="mb-1.5">
                                    Accenture Company
                                </SecondaryLabel>

                                <div className="text-sm text-muted-foreground">
                                    Cagayan de Oro City, Philippines
                                </div>
                            </div>
                        </div>

                        <div className="border-b mb-5 pb-5 flex items-center gap-2">
                            <Button variant="secondary">Send email</Button>
                            <Button className="px-8" variant="white">
                                Apply
                            </Button>
                        </div>

                        <TertiaryLabel className="mb-2">
                            About Our Company
                        </TertiaryLabel>
                        <p className="text-muted-foreground">
                            Work on cutting-edge machine learning models for
                            computer vision applications. Experience with Python
                            and deep learning frameworks is preferredWork on
                            cutting-edge machine learning models for computer
                            vision applications. Experience with Python and deep
                            learning frameworks is preferred
                        </p>
                    </div>

                    {/* examination section  */}
                    <div className="bg-white dark:bg-transparent border rounded-lg p-5">
                        <ExaminationSection />
                    </div>
                </div>

                {/* contact information  */}
                <div className="right ">
                    <div className="bg-white dark:bg-transparent border rounded-lg p-4">
                        <TertiaryLabel className="mb-2">
                            Contact Information
                        </TertiaryLabel>
                        <div className="flex flex-col gap-1.5 text-muted-foreground">
                            <p>support@accenture.com</p>
                            <p>support@accenture.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
