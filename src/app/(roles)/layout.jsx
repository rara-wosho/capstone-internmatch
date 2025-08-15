import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggler } from "@/components/theme-toggler";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <ThemeToggler />
                {children}
            </main>
        </SidebarProvider>
    );
}
