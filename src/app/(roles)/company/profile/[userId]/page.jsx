import ErrorUi from "@/components/ui/ErrorUi";
import { getCurrentUser } from "@/lib/actions/auth";
import { getCompanyById } from "@/lib/actions/company";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }) {
    const { userId } = await params;

    // Run auth + company query in parallel (no dependency between them)
    const [
        { user: currentUser, error: authError },
        { data: companyData, error: companyError },
    ] = await Promise.all([getCurrentUser(), getCompanyById(userId)]);

    // --- Auth checks ---
    if (authError) return <ErrorUi message="Unable to verify user." />;

    if (!currentUser?.id) redirect("/sign-in");

    const isOwner = currentUser.id === userId;

    // --- Company checks ---
    if (companyError)
        return <ErrorUi message="Failed to fetch company data." />;

    if (!companyData) notFound();

    // --- Render ---
    return (
        <div>
            {isOwner ? "owner" : "not owner"}
            <p>{companyData.name}</p>
        </div>
    );
}
