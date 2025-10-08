import AdminNavbar from "@/components/AdminNavbar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import PrivateFooter from "@/components/ui/PrivateFooter";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import SignOutModal from "@/components/ui/SignOutModal";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";
import { CircleUserRound } from "lucide-react";
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
                <div className="sticky top-0 left-0 bg-card z-50 border-b dark:border-transparent">
                    <Wrapper className="flex items-center justify-between gap-4 relative px-3">
                        <AdminNavbar user={session.user} />

                        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-card px-1 rounded-full">
                            <Popover>
                                <PopoverTrigger>
                                    <div className="size-7 flex items-center justify-center rounded-full bg-neutral-100 text-black cursor-pointer">
                                        <CircleUserRound size={20} />
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="end"
                                    className="w-fit p-0 text-muted-foreground"
                                >
                                    <div className="border-b px-3 py-2 text-secondary-foreground font-medium">
                                        {session.user.email}
                                    </div>
                                    <div className="px-3 py-2">
                                        <SidebarMenu>
                                            <SidebarMenuItem>
                                                <SignOutModal>
                                                    <button className="hover:text-secondary-foreground cursor-pointer w-full text-left">
                                                        Sign Out
                                                    </button>
                                                </SignOutModal>
                                            </SidebarMenuItem>
                                        </SidebarMenu>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </Wrapper>
                </div>
                {children}
            </section>
            <PrivateFooter />
        </>
    );
}
