import ErrorUi from "@/components/ui/ErrorUi";
import Logo from "@/components/ui/Logo";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TitleText from "@/components/ui/TitleText";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function InstructorCompaniesPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("companies")
        .select("id, name, barangay, city, province, avatar_url")
        .order("created_at", { ascending: false });

    if (error) {
        return <ErrorUi secondaryMessage={error.message} />;
    }
    return (
        <div>
            <SecondaryLabel className="mb-4">Companies</SecondaryLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.map((company) => (
                    <Link
                        href={`/instructor/companies/${company.id}`}
                        key={company.id}
                        className="flex flex-col gap-2 p-3 rounded-xl bg-card border"
                    >
                        <div className="relative w-full aspect-[5/3.5] mb-1 rounded-sm overflow-hidden">
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

                        <div>
                            <TitleText>{company.name}</TitleText>
                            {!company?.barangay ||
                            !company?.city ||
                            !company?.province ? (
                                <p className="text-sm text-muted-foreground">
                                    No address provided
                                </p>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    {company?.barangay || "N/A"},{" "}
                                    {company?.city || "N/A"},{" "}
                                    {company?.province || "N/A"}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
