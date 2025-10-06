import SearchField from "@/components/forms/SearchStudent";
import BorderBox from "@/components/ui/BorderBox";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";
import { dateFormatter } from "@/utils/date-formatter";
import { Suspense } from "react";

export default async function TrackRegistrationPage({ searchParams }) {
    const search = (await searchParams)?.search_query || "";
    let registration = [];
    if (search) {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("registrations")
            .select("firstname, lastname, email, status, registered_at")
            .like("email", `%${search}%`);

        if (error) {
            return <ErrorUi />;
        }

        registration = data;
    }
    return (
        <div className="min-h-[calc(100svh-60px)] px-3">
            <Wrapper size="sm">
                <SecondaryLabel>Track Registration Status</SecondaryLabel>
                <p className="text-muted-foreground">
                    Please enter the email address you used during registration.
                </p>

                <BorderBox className="border mt-4 rounded-xl bg-card shadow-xs">
                    <Suspense fallback={<p>Loading...</p>}>
                        <SearchField
                            actionPath="/create-account/track-registration"
                            placeholder="Email address"
                        />
                    </Suspense>
                </BorderBox>
                <p className="text-xs text-muted-foreground mt-1 sm:mt-2 mb-8">
                    Note: Enter the exact email address you used during
                    registration, including capitalization.
                </p>

                {registration.length > 0 && (
                    <p className="mb-2 font-semibold">
                        Found {registration.length} result
                        {registration.length > 1 && "s"}
                    </p>
                )}

                {search &&
                    (registration.length > 0 ? (
                        registration.map((reg, index) => (
                            <div
                                className="py-3 flex items-center justify-between gap-3 border-b"
                                key={index}
                            >
                                <div>
                                    <p>
                                        {reg?.firstname} {reg?.lastname}
                                    </p>
                                    {/* <p>{reg.email}</p>  */}
                                    <p className="text-xs text-muted-foreground">
                                        {dateFormatter(reg?.registered_at)}
                                    </p>
                                </div>
                                <p className="capitalize">{reg?.status}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No registration found for <strong>{search}</strong>.
                        </p>
                    ))}
            </Wrapper>
        </div>
    );
}
