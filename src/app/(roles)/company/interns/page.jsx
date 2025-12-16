import SearchField from "@/components/forms/SearchStudent";
import InternsTable from "@/components/tables/InternsTable";
import BorderBox from "@/components/ui/BorderBox";
import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getInternsList } from "@/lib/actions/intern";
import { Suspense } from "react";

export default async function InternsPage({ searchParams }) {
    const search = (await searchParams)?.search_query || "";

    const { data, error } = await getInternsList(search);

    if (error) {
        return <ErrorUi secondaryMessage={error} />;
    }

    return (
        <div>
            <div className="mb-3">
                <SecondaryLabel>Company Interns</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    View all your company's current interns
                </p>
            </div>

            <BorderBox className="mb-3 border rounded-xl bg-card    ">
                <Suspense>
                    <SearchField
                        placeholder="Search intern firstname, lastname, school..."
                        actionPath="/company/interns"
                    />
                </Suspense>
            </BorderBox>

            {data?.length === 0 ? (
                <EmptyUi
                    message={search ? "No Results" : "No Interns In the List"}
                    secondaryMessage={
                        search
                            ? `We cannot find "${search}" from our records. Please try searching for another`
                            : "There are no active interns yet."
                    }
                />
            ) : (
                <BorderBox className="border rounded-xl bg-card">
                    <InternsTable interns={data} />
                </BorderBox>
            )}
        </div>
    );
}
