import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard-header";

export default function Layout({ children }) {
    const role = "student";
    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <main className="w-full">
                <DashboardHeader />
                <div className="p-3">{children}</div>
            </main>
        </SidebarProvider>
    );
}
