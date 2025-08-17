import { LogOut, User } from "lucide-react";
import { ThemeToggler } from "../theme-toggler";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "./sidebar";
import Logo from "./Logo";

export default function DashboardHeader() {
    return (
        <div className="sticky top-0 left-0 p-3 lg:p-4 flex items-center w-full bg-white border-b z-30 backdrop-blur-2xl dark:bg-background/70">
            <SidebarTrigger />

            <div className="border-s ps-2 ms-1 flex items-center">
                <div className="md:hidden inline-flex items-center gap-2">
                    <Logo className="w-4 h-4" />
                    <p className="font-bold text-secondary-foreground">
                        InternMatch
                    </p>
                </div>
                <p className="font-semibold hidden md:inline-block">
                    Welcome back Admin
                </p>
            </div>

            <div className="ms-auto flex items-center gap-3">
                <ThemeToggler />

                <Popover>
                    <PopoverTrigger className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <div className="size-7 rounded-full border"></div>
                            <p className="hidden md:inline-block">
                                Israel De Vera
                            </p>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-2 rounded-sm">
                        <SidebarMenu className="text-secondary-foreground/80">
                            <SidebarMenuItem>
                                <SidebarMenuButton className="cursor-pointer">
                                    <User />
                                    Your Profile
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem className="border-t dark:border-neutral-700">
                                <SidebarMenuButton className="cursor-pointer">
                                    <LogOut />
                                    Sign Out
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
