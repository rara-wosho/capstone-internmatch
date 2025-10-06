import AdminNavbar from "@/components/AdminNavbar";
import Logo from "@/components/ui/Logo";
import PrivateFooter from "@/components/ui/PrivateFooter";
import SignOutModal from "@/components/ui/SignOutModal";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Layout({ children }) {
    const { session } = await getCurrentUser();

    if (!session || !session?.user) {
        notFound();
    }

    console.log(session);

    return (
        <section>
            {/* admin layout header  */}
            <div className="px-3 pt-3 bg-card">
                <Wrapper className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Logo className="size-4" />{" "}
                        <p className="font-semibold text-lg">InternMatch</p>
                    </div>

                    <p className="hidden sm:inline-block">
                        {session.user.email}
                    </p>
                </Wrapper>
            </div>
            <div className="sticky top-0 left-0 bg-card z-50 border-b px-3 overflow-x-auto">
                <Wrapper className="flex items-center justify-between gap-4">
                    <AdminNavbar />
                    <SignOutModal>
                        <button className="text-muted-foreground flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-destructive transition-colors">
                            Sign Out <LogOut size={14} />
                        </button>
                    </SignOutModal>
                </Wrapper>
            </div>
            {children}
            <PrivateFooter />
        </section>
    );
}
