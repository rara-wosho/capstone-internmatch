import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard-header";
import PrivateFooter from "@/components/ui/PrivateFooter";
import { SessionProvider } from "@/context/SessionContext";

export default function Layout({ children }) {
    return (
        <SessionProvider>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <div className="min-h-screen">
                        <DashboardHeader />

                        <div className="p-3 md:p-5 lg:p-8 mb-5">{children}</div>
                    </div>
                    <PrivateFooter />
                </main>
            </SidebarProvider>
        </SessionProvider>
    );
}
