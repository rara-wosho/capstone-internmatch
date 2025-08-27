import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard-header";
import IconWrapper from "@/components/ui/IconWrapper";
import { ArrowUp, MessagesSquare, Search } from "lucide-react";
import PrivateFooter from "@/components/ui/PrivateFooter";
import { Input } from "@/components/ui/input";

export default function Layout({ children }) {
    const role = "student";
    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <main className="w-full">
                <div className="min-h-screen">
                    <DashboardHeader />

                    <div className="p-3 lg:p-4 mb-5">{children}</div>
                </div>
                <PrivateFooter />
            </main>
        </SidebarProvider>
    );
}
