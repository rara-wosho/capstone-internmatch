import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { ThemeToggler } from "../theme-toggler";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "./sidebar";
import Logo from "./Logo";
import IconWrapper from "./IconWrapper";

export default function DashboardHeader() {
    return (
        <div className="sticky top-0 left-0 px-3 md:px-5 lg:px-8 py-3 flex items-center w-full bg-white border-b z-30 backdrop-blur-2xl dark:bg-background/70">
            <SidebarTrigger />

            <div className="border-s ps-2 ms-2 flex items-center">
                <div className="md:hidden inline-flex items-center gap-2">
                    <Logo className="w-4 h-4" />
                    <p className="font-bold text-secondary-foreground">
                        InternMatch
                    </p>
                </div>
                <p className="font-semibold hidden md:inline-block">
                    Welcome back, Israel 👋
                </p>
            </div>

            <div className="ms-auto flex items-center gap-3">
                <div className="flex gap-2">
                    <IconWrapper>
                        <Bell size={16} />
                    </IconWrapper>
                    <div className="border rounded-sm bg-card">
                        <ThemeToggler />
                    </div>
                </div>

                <Popover>
                    <PopoverTrigger className="cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <div className="size-7 rounded-full border"></div>
                            <p className="hidden md:inline-flex items-center gap-2.5">
                                Israel De Vera
                                <ChevronDown size={15} />
                            </p>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        sideOffset={10}
                        align="end"
                        className="w-fit p-2 rounded-sm"
                    >
                        <SidebarMenu className="text-secondary-foreground/80">
                            <SidebarMenuItem>
                                <SidebarMenuButton className="cursor-pointer">
                                    <User />
                                    Your profile
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="cursor-pointer">
                                    <Settings />
                                    Account settings
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
