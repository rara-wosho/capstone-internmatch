import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const companyId = (await params)?.companyId || "";

    if (!companyId) {
        notFound();
    }

    return <div>Company page for instructors</div>;
}
