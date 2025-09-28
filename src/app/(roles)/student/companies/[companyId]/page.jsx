import BreadCrumbs from "@/components/ui/BreadCrumbs";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import Image from "next/image";
import ExaminationSection from "./ExaminationSection";
import { Button } from "@/components/ui/button";
import BorderBox from "@/components/ui/BorderBox";

import { getCompanyDataAndExams } from "@/lib/actions/company";

import ErrorUi from "@/components/ui/ErrorUi";
import { ChevronLeft, Globe, Star } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import ApplyModal from "@/components/modals/ApplyModal";

const links = [
    { href: "", label: "Home" },
    { href: "/student/companies", label: "Companies" },
    { href: "", label: "Company details" },
];

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export default async function Page({ params }) {
    const { companyId } = await params;

    const { data, error } = await getCompanyDataAndExams(companyId);

    if (error) {
        return (
            <ErrorUi secondaryMessage="We're not able to fetch the data that you need." />
        );
    }

    return (
        <div className="mx-auto max-w-[900px]">
            <Drawer>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>
                            This action cannot be undone.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <BreadCrumbs className="mb-4" links={links} />

            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                {/* main content  */}
                <div className="left ">
                    <section className="bg-card border rounded-xl mb-3">
                        <BorderBox className="border-b flex items-center justify-between">
                            <BackButton className="flex items-center text-sm text-muted-foreground hover:text-secondary-foreground">
                                <ChevronLeft size={17} />
                                Back
                            </BackButton>

                            <div className="flex items-center text-muted-foreground">
                                <Globe size={17} />
                            </div>
                        </BorderBox>
                        <BorderBox className="flex gap-x-5 gap-y-4 border-b flex-wrap items-center justify-between">
                            {/* mini hero section | left section  */}
                            <div className="flex gap-3">
                                {/* company picture  */}
                                <div className="relative size-24 shrink-0 overflow-hidden rounded-sm">
                                    <Image
                                        src="https://i.pinimg.com/1200x/5f/33/c7/5f33c741560bb71ebedb831267603c1b.jpg"
                                        alt="comapny img"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* company name  */}
                                <div className="w-full flex flex-col justify-center">
                                    <SecondaryLabel className="mb-1">
                                        {data?.name}
                                    </SecondaryLabel>

                                    {data?.province ? (
                                        <div className="text-sm text-muted-foreground mb-2">
                                            {data?.barangay}, {data?.city},{" "}
                                            {data?.province}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground font-light mb-2 tracking-wider">
                                            No address provided
                                        </p>
                                    )}

                                    <div className="flex items-center gap-2 text-yellow-500/30">
                                        <Star size={15} fill="rgb(230,240,0)" />
                                        <Star size={15} fill="rgb(230,240,0)" />
                                        <Star size={15} fill="rgb(230,240,0)" />
                                    </div>

                                    {/* <p className="text-muted-foreground text-sm font-thin">
                                    No ratings yet 
                                </p> */}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    className="order-2 sm:order-1"
                                    variant="outline"
                                    asChild
                                >
                                    <a href="#exams">View Exams</a>
                                </Button>
                                <div className="order-1 sm:order-2">
                                    <ApplyModal
                                        companyId={companyId}
                                        accept_applicants={
                                            data?.accept_applicants
                                        }
                                        term={data?.accept_applicants_term}
                                    />
                                </div>
                            </div>
                        </BorderBox>

                        <BorderBox>
                            <TertiaryLabel className="mb-2">
                                Details
                            </TertiaryLabel>
                            <p className="text-muted-foreground">
                                {data?.details}
                            </p>
                        </BorderBox>
                    </section>
                </div>

                {/* contact information  */}
                <div className="right px-2">
                    <ExaminationSection companyExams={data?.exams || []} />
                </div>
            </div>
        </div>
    );
}
