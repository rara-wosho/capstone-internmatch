import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard-header";

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
                <footer className="p-3 lg:p-4 border-t bg-white dark:bg-transparent">
                    Footer
                </footer>
            </main>
        </SidebarProvider>
    );
}
