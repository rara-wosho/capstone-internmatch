"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import {
    Calendar,
    Calendar1,
    CalendarArrowDown,
    CalendarArrowUp,
    SortAsc,
    SortDesc,
} from "lucide-react";

export default function SortData({ data, children }) {
    return (
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent align="end" className="w-fit p-2">
                <p className="text-sm text-muted-foreground mb-2">Sort by:</p>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <SortAsc /> <p>Alphabet (a-z)</p>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <SortDesc /> <p>Alphabet (z-a)</p>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <CalendarArrowUp /> <p>Date (newer)</p>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <CalendarArrowDown /> <p>Date (older)</p>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </PopoverContent>
        </Popover>
    );
}
