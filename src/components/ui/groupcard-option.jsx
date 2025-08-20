"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical, Link2, PenLine } from "lucide-react";
import { Button } from "./button";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar";

export default function GroupCardOption() {
    return (
        <Popover>
            <Button
                asChild
                variant="ghost"
                className="rounded-full"
                size="icon"
            >
                <PopoverTrigger className="cursor-pointer">
                    <EllipsisVertical size={18} />
                </PopoverTrigger>
            </Button>
            <PopoverContent align="end" className="p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <span>
                                <PenLine size={14} />
                            </span>
                            Rename
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <span>
                                <Link2 size={15} />
                            </span>
                            Copy link
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </PopoverContent>
        </Popover>
    );
}
