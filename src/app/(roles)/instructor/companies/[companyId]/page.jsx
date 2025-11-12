import { notFound } from "next/navigation";
import Image from "next/image";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Link from "next/link";
import { Globe, Mail, MapPin, Phone, Link2 } from "lucide-react";
import { getCompanyById } from "@/lib/actions/company";
import BorderBox from "@/components/ui/BorderBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/companies", label: "Companies" },
    { href: "", label: "Company Details" },
];

export default async function Page({ params }) {
    const companyId = (await params)?.companyId || "";

    if (!companyId) {
        notFound();
    }

    const { data: company, error } = await getCompanyById(companyId);

    if (error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    if (!company) {
        return <ErrorUi message="Company not found." />;
    }

    return (
        <div className="space-y-3">
            <BreadCrumbs links={links} />

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-[100px] aspect-square">
                    <AvatarImage
                        src={
                            company?.avatar_url || "/images/default-avatar.jpg"
                        }
                    />
                    <AvatarFallback>{company?.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                    <SecondaryLabel>{company.name}</SecondaryLabel>
                    <p className="text-sm text-muted-foreground mt-1">
                        {company.details
                            ? company.details.slice(0, 100) + "..."
                            : "No description available."}
                    </p>
                </div>
            </div>

            {/* Is accepting applicants? */}
            <BorderBox className="rounded-xl bg-primary">
                <h2 className="font-semibold text-lg text-white">
                    {company?.accept_applicants
                        ? "Currently Accepting Applicants"
                        : "Not Accepting Applicants at the Moment"}
                </h2>

                {company?.accept_applicants && (
                    <p className="text-sm text-neutral-100 mt-1">
                        {company?.accept_applicants_term === "all"
                            ? "This company requires applicants to complete all available exams before submitting an application."
                            : company.accept_applicants_term === "some"
                              ? "This company allows applicants who have completed at least one of the available exams to apply."
                              : "This company accepts applications without requiring any exams to be completed beforehand."}
                    </p>
                )}
            </BorderBox>

            {/* Contact Info */}
            <BorderBox className="border rounded-xl bg-card">
                <h2 className="font-semibold mb-3 text-lg">
                    Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Mail size={16} className="text-muted-foreground" />
                        <span>{company.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-muted-foreground" />
                        <span>{company.phone}</span>
                    </div>
                    {company.website && (
                        <div className="flex items-center gap-2">
                            <Globe
                                size={16}
                                className="text-muted-foreground"
                            />
                            <Link
                                href={company.website}
                                target="_blank"
                                className="text-primary hover:underline"
                            >
                                {company.website}
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-muted-foreground" />
                        {!company?.barangay ||
                        !company?.city ||
                        !company?.province ? (
                            <p>No address provided</p>
                        ) : (
                            <span>
                                {company.barangay}, {company.city},{" "}
                                {company.province}
                            </span>
                        )}
                    </div>
                </div>
            </BorderBox>

            {/* Company Description */}
            <BorderBox className="border rounded-xl bg-card">
                <h2 className="font-semibold mb-3 text-lg">Company Overview</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {company.details || "No company overview provided."}
                </p>
            </BorderBox>

            {/* Company Offers */}
            <BorderBox className="border rounded-xl bg-card">
                <h2 className="font-semibold mb-3 text-lg">Available Offers</h2>
                {company.offers.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {company.offers.map((offer, index) => (
                            <li key={index}>{offer}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No offers listed for this company.
                    </p>
                )}
            </BorderBox>

            {/* Links or Social Media */}
            {company.links.length > 0 && (
                <BorderBox className="border rounded-xl bg-card">
                    <h2 className="font-semibold mb-3 text-lg">
                        Company Links
                    </h2>
                    <ul className="space-y-1">
                        {company.links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link}
                                    target="_blank"
                                    className="flex items-center gap-2 text-primary hover:underline text-sm"
                                >
                                    <Link2 size={14} />
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </BorderBox>
            )}
        </div>
    );
}
