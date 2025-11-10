import { notFound } from "next/navigation";
import Image from "next/image";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Link from "next/link";
import { Globe, Mail, MapPin, Phone, Link2 } from "lucide-react";
import { getCompanyById } from "@/lib/actions/company";
import BorderBox from "@/components/ui/BorderBox";

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
            <div className="flex items-center gap-4 mt-2 mb-5">
                {company.avatar_url ? (
                    <Image
                        src={company.avatar_url}
                        alt={`${company.name} logo`}
                        width={80}
                        height={80}
                        className="rounded-full border object-cover"
                    />
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-muted text-sm rounded-full border">
                        No Logo
                    </div>
                )}

                <div>
                    <SecondaryLabel>{company.name}</SecondaryLabel>
                    <p className="text-sm text-muted-foreground mt-1">
                        {company.details
                            ? company.details.slice(0, 100) + "..."
                            : "No description available."}
                    </p>
                </div>
            </div>

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
                        <span>
                            {company.barangay}, {company.city},{" "}
                            {company.province}
                        </span>
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
