import AdminHeader from "@/components/AdminHeader";
import AdminNavbar from "@/components/AdminNavbar";
import PrivateFooter from "@/components/ui/PrivateFooter";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { notFound } from "next/navigation";

export default async function Layout({ children }) {
    const { session } = await getCurrentUser();

    if (!session || !session?.user) {
        notFound();
    }

    return (
        <>
            <section className="min-h-svh">
                {/* admin layout header  */}
                <AdminHeader user={session.user} />
                <div className="sticky top-0 left-0 bg-card z-50 border-b dark:border-transparent px-3 overflow-x-auto">
                    <Wrapper className="flex items-center justify-between gap-4">
                        <AdminNavbar />
                    </Wrapper>
                </div>
                {children}
            </section>
            <PrivateFooter />
        </>
    );
}
