import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggler } from "@/components/theme-toggler";
import { sidebarItems } from "@/lib/sidebar-items";

export default function Layout({ children }) {
    const role = "student";
    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <main>
                <SidebarTrigger />
                <ThemeToggler />
                {children}
            </main>
        </SidebarProvider>
    );
}
