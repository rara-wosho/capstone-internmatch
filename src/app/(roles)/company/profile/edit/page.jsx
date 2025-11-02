import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { getCompanyById } from "@/lib/actions/company";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TitleText from "@/components/ui/TitleText";
import FormLabel from "@/components/ui/FormLabel";
import ErrorUi from "@/components/ui/ErrorUi";
import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import IconWrapper from "@/components/ui/IconWrapper";
import { ChevronLeft, PenLine } from "lucide-react";
import BackButton from "@/components/ui/BackButton";

export const metadata = {
    title: "Edit Company Details | InternMatch",
};

export default async function EditCompanyPage() {
    const { user } = await getCurrentUser();

    // If no user → redirect to sign in
    if (!user || !user?.id) {
        redirect("/sign-in");
    }

    // Get company data
    const { data: company, error } = await getCompanyById(user.id);

    if (error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    if (!company) {
        return <ErrorUi secondaryMessage="Company data not found." />;
    }

    return (
        <>
            <Wrapper size="sm">
                <BackButton className="inline-flex items-center mb-3 text-muted-foreground text-sm">
                    <ChevronLeft size={16} /> <span>Back</span>
                </BackButton>
                <div className="mb-3 sm:mb-4 md:mb-5 flex items-center gap-2 sm:gap-3">
                    <IconWrapper>
                        <PenLine size={18} />
                    </IconWrapper>
                    <SecondaryLabel>Edit Company Details</SecondaryLabel>
                </div>
                <div className="border rounded-xl bg-card shadow-xs">
                    <BorderBox>
                        <form
                            action="#"
                            className="space-y-6"
                            // handleEdit logic will go here later
                        >
                            {/* --- Company Info --- */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="sm:col-span-2">
                                    <FormLabel>Company Name</FormLabel>
                                    <Input
                                        required
                                        name="name"
                                        defaultValue={company.name}
                                        placeholder="Enter company name"
                                    />
                                </div>

                                {/* --- Company Details --- */}
                                <div className="sm:col-span-2">
                                    <FormLabel>About Company</FormLabel>
                                    <Textarea
                                        name="details"
                                        rows={4}
                                        defaultValue={company.details}
                                        placeholder="Describe your company..."
                                    />
                                </div>

                                <div>
                                    <FormLabel>Phone</FormLabel>
                                    <Input
                                        name="phone"
                                        defaultValue={company.phone}
                                        placeholder="Enter company phone number"
                                    />
                                </div>

                                <div>
                                    <FormLabel>Website</FormLabel>
                                    <Input
                                        name="website"
                                        defaultValue={company.website}
                                        placeholder="https://yourcompany.com"
                                    />
                                </div>
                            </div>

                            {/* --- Address --- */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <FormLabel>Barangay</FormLabel>
                                    <Input
                                        required
                                        name="barangay"
                                        defaultValue={company.barangay}
                                        placeholder="Enter barangay"
                                    />
                                </div>

                                <div>
                                    <FormLabel>City</FormLabel>
                                    <Input
                                        required
                                        name="city"
                                        defaultValue={company.city}
                                        placeholder="Enter city"
                                    />
                                </div>

                                <div>
                                    <FormLabel>Province</FormLabel>
                                    <Input
                                        required
                                        name="province"
                                        defaultValue={company.province}
                                        placeholder="Enter province"
                                    />
                                </div>
                            </div>

                            {/* --- Offers --- */}
                            <div>
                                <FormLabel>Offers</FormLabel>
                                <Textarea
                                    name="offers"
                                    rows={3}
                                    defaultValue={company.offers.join(", ")}
                                    placeholder="e.g., Web Development, Mobile App, Networking"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Separate offers with commas.
                                </p>
                            </div>

                            {/* --- Links --- */}
                            <div>
                                <FormLabel>Links</FormLabel>
                                <Textarea
                                    name="links"
                                    rows={3}
                                    defaultValue={company.links.join("\n")}
                                    placeholder="https://linkedin.com/company/yourcompany"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Add one link per line (e.g., social media,
                                    portfolio, etc.)
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </BorderBox>
                </div>
            </Wrapper>
        </>
    );
}
