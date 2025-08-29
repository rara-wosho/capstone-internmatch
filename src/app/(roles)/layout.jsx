import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard-header";
import IconWrapper from "@/components/ui/IconWrapper";
import { ArrowUp, MessagesSquare, Search } from "lucide-react";
import PrivateFooter from "@/components/ui/PrivateFooter";
import { Input } from "@/components/ui/input";

export default function Layout({ children }) {
    const role = "company";
    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <main className="w-full">
                <div className="min-h-screen">
                    <DashboardHeader />

                    <div className="p-3 md:p-5 lg:p-8 mb-5">{children}</div>
                </div>
                <PrivateFooter />
            </main>
        </SidebarProvider>
    );
}
