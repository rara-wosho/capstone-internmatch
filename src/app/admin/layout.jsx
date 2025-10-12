import AdminNavbar from "@/components/AdminNavbar";
import AdminOffCanvas from "@/components/AdminOffCanvas";
import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/ui/IconWrapper";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import PrivateFooter from "@/components/ui/PrivateFooter";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import SignOutModal from "@/components/ui/SignOutModal";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { CircleUserRound, MessageSquareQuote } from "lucide-react";
import Link from "next/link";
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
                <div className="sticky top-0 left-0 bg-card z-50 border-b">
                    <Wrapper className="flex items-center justify-between gap-4 relative px-3">
                        <AdminNavbar user={session.user} />

                        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full flex items-center gap-2">
                            <Link href="/admin/feedbacks">
                                <IconWrapper>
                                    <MessageSquareQuote size={18} />
                                </IconWrapper>
                            </Link>
                            <AdminOffCanvas user={session.user} />
                        </div>
                    </Wrapper>
                </div>
                {children}
            </section>
            <PrivateFooter />
        </>
    );
}
