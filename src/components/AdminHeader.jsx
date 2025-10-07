"use client";

import { CircleUserRound } from "lucide-react";
import Logo from "./ui/Logo";
import Wrapper from "./Wrapper";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import SignOutModal from "./ui/SignOutModal";

const AdminHeader = ({ user }) => {
    return (
        <div className="px-3 pt-3 bg-card">
            <Wrapper className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Logo className="size-4" />{" "}
                    <p className="font-semibold text-lg">InternMatch</p>
                </div>

                <Popover>
                    <PopoverTrigger>
                        <div className="size-7 flex items-center justify-center rounded-full bg-neutral-100 text-black cursor-pointer">
                            <CircleUserRound size={20} />
                        </div>
                    </PopoverTrigger>

                    <PopoverContent
                        align="end"
                        className="w-fit p-0 text-muted-foreground"
                    >
                        <div className="border-b px-3 py-2 text-secondary-foreground font-medium">
                            {user.email}
                        </div>
                        <div className="px-3 py-2">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SignOutModal>
                                        <button className="hover:text-secondary-foreground cursor-pointer w-full text-left">
                                            Sign Out
                                        </button>
                                    </SignOutModal>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </div>
                    </PopoverContent>
                </Popover>
            </Wrapper>
        </div>
    );
};

export default AdminHeader;
