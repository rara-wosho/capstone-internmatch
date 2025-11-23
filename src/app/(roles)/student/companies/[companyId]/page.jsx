import BreadCrumbs from "@/components/ui/BreadCrumbs";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import Image from "next/image";
import ExaminationSection from "./ExaminationSection";
import { Button } from "@/components/ui/button";
import BorderBox from "@/components/ui/BorderBox";

import { getCompanyDataAndExams } from "@/lib/actions/company";

import ErrorUi from "@/components/ui/ErrorUi";
import {
    BookOpen,
    Briefcase,
    ChevronLeft,
    Globe,
    Handshake,
    Info,
    Mail,
    MapPin,
    Phone,
    Star,
    UserRoundX,
} from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import ApplyModal from "@/components/modals/ApplyModal";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const links = [
    { href: "", label: "Home" },
    { href: "/student/companies", label: "Companies" },
    { href: "", label: "Company details" },
];

// Set page  title
export const metadata = {
    title: "Company Details",
};

export default async function Page({ params }) {
    const { companyId } = await params;

    const { data, error } = await getCompanyDataAndExams(companyId);

    if (error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    if (!data) {
        return (
            <ErrorUi
                message="Company not found"
                secondaryMessage={
                    "This company may not exist or may have been removed from our platform."
                }
            />
        );
    }

    return (
        <div className="mx-auto max-w-[900px]">
            <BreadCrumbs className="mb-4" links={links} />

            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                {/* main content  */}
                <div className="left ">
                    <section className="bg-card border rounded-xl mb-3">
                        <BorderBox className="border-b flex items-center justify-between">
                            <BackButton className="flex items-center text-sm text-muted-foreground hover:text-secondary-foreground">
                                <ChevronLeft size={18} />
                                <span>Back</span>
                            </BackButton>
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

                                    {/* <div className="flex items-center gap-2 text-yellow-500/30">
                                        <Star size={15} fill="rgb(230,240,0)" />
                                        <Star size={15} fill="rgb(230,240,0)" />
                                        <Star size={15} fill="rgb(230,240,0)" />
                                    </div> */}
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
                                        companyEmail={data?.email}
                                        companyId={companyId}
                                        accept_applicants={
                                            data?.accept_applicants
                                        }
                                        term={data?.accept_applicants_term}
                                    />
                                </div>
                            </div>
                        </BorderBox>

                        <BorderBox className="border-b">
                            {!data?.accept_applicants && (
                                <div className="dark:text-yellow-500 text-yellow-600 mb-3 p-3 border border-yellow-500/40 rounded-md bg-yellow-500/5 flex items-center gap-2">
                                    <UserRoundX size={16} />
                                    <p className="text-sm">
                                        This company is currently not accepting
                                        applicants
                                    </p>
                                </div>
                            )}
                            <TertiaryLabel className="mb-2">
                                <BookOpen className="size-3 md:size-4" /> About{" "}
                                {data?.name}
                            </TertiaryLabel>
                            <p className="text-muted-foreground whitespace-pre-wrap">
                                {data?.details}
                            </p>
                        </BorderBox>
                        <BorderBox className="">
                            <div className="mb-2 flex items-center gap-2">
                                <TertiaryLabel>
                                    <Briefcase className="size-3 md:size-4" />
                                    Company Offers
                                </TertiaryLabel>
                                <Popover>
                                    <PopoverTrigger>
                                        <Info
                                            className="text-muted-foreground"
                                            size={16}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <p className="text-sm text-muted-foreground">
                                            These offers represent the fields or
                                            roles available within this company.
                                            They are not current openings but
                                            areas where the company may provide
                                            internships or training
                                            opportunities
                                        </p>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {!data?.company_offers ? (
                                    <div className="text-sm text-muted-foreground">
                                        This company hasn't listed any
                                        internship offers yet. Please check back
                                        soon for available opportunities.
                                    </div>
                                ) : (
                                    data?.company_offers?.offers.map(
                                        (offer, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center whitespace-nowrap text-sm text-secondary-foreground px-3 md:px-4 h-9 rounded-full bg-muted"
                                            >
                                                {offer}
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </BorderBox>

                        {/* Get in touch section  */}
                        <BorderBox className="">
                            <TertiaryLabel className="mb-4">
                                <Handshake className="size-3 md:size-4" />
                                Get In Touch
                            </TertiaryLabel>

                            <div className="space-y-4">
                                {/* Email */}
                                {data?.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-8 rounded-full bg-blue-100 dark:bg-blue-900/30">
                                            <Mail className="size-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Email
                                            </p>
                                            <a
                                                href={`mailto:${data.email}`}
                                                className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors"
                                            >
                                                {data.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Phone */}
                                {data?.phone && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-8 rounded-full bg-green-100 dark:bg-green-900/30">
                                            <Phone className="size-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Phone
                                            </p>
                                            <a
                                                href={`tel:${data.phone}`}
                                                className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors"
                                            >
                                                {data.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Website */}
                                {data?.website && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-8 rounded-full bg-purple-100 dark:bg-purple-900/30">
                                            <Globe className="size-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Website
                                            </p>
                                            <a
                                                href={data.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors break-all"
                                            >
                                                {data.website}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Address */}
                                {(data?.barangay ||
                                    data?.city ||
                                    data?.province) && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-8 rounded-full bg-orange-100 dark:bg-orange-900/30">
                                            <MapPin className="size-4 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Address
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {[
                                                    data.barangay,
                                                    data.city,
                                                    data.province,
                                                ]
                                                    .filter(Boolean)
                                                    .join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* No contact information available */}
                                {!data?.email &&
                                    !data?.phone &&
                                    !data?.website &&
                                    !data?.barangay &&
                                    !data?.city &&
                                    !data?.province && (
                                        <div className="text-center py-6">
                                            <Handshake className="size-12 text-muted-foreground/50 mx-auto mb-3" />
                                            <p className="text-sm text-muted-foreground">
                                                No contact information available
                                                for this company.
                                            </p>
                                        </div>
                                    )}
                            </div>
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
