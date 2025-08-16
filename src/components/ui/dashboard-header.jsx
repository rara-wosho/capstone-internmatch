import { ThemeToggler } from "../theme-toggler";
import { SidebarTrigger } from "./sidebar";

export default function DashboardHeader() {
    return (
        <div className="p-3 flex items-center w-full bg-white dark:bg-transparent border-b">
            <SidebarTrigger />

            <div className="border-s ps-2 ms-1">
                <p>Welcome back Admin</p>
            </div>

            <div className="ms-auto flex items-center">
                <ThemeToggler />

                <p>Israel De Vera</p>
            </div>
        </div>
    );
}
