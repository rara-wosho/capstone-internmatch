"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
    Check,
    ChevronDown,
    Ellipsis,
    FileBadge,
    Sparkles,
    UserRoundX,
} from "lucide-react";
import { dateFormatter } from "@/utils/date-formatter";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function InternsTable({ interns }) {
    return (
        <Table>
            <TableCaption className="sr-only">
                A list of your active company interns.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Complete Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Ojt Instructor</TableHead>
                    <TableHead>Approved at</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {interns.map((i) => (
                    <TableRow key={i.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-[30px]">
                                    <AvatarImage
                                        src={
                                            i?.students?.avatar_url ||
                                            "/images/default-avatar.jpg"
                                        }
                                    />

                                    <AvatarFallback>?</AvatarFallback>
                                </Avatar>
                                <p>
                                    {i?.students?.lastname},{" "}
                                    {i?.students?.firstname}
                                </p>
                            </div>
                        </TableCell>
                        <TableCell>{i?.students?.email}</TableCell>
                        <TableCell>
                            <p className="max-w-[300px] truncate">
                                {i?.students?.school}
                            </p>
                        </TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger className="cursor-pointer">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <div>
                                            <span>
                                                {
                                                    i?.students?.ojt_instructors
                                                        ?.firstname
                                                }{" "}
                                            </span>
                                            <span>
                                                {
                                                    i?.students?.ojt_instructors
                                                        ?.lastname
                                                }
                                            </span>
                                        </div>

                                        <ChevronDown
                                            className="text-muted-foreground"
                                            size={18}
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="p-3">
                                    <div>
                                        <p className="pb-3 border-b mb-3">
                                            Instructor Info
                                        </p>
                                        <div>
                                            <p className="flex-items-center gap-2 text-muted-foreground">
                                                Gender{" : "}
                                                {
                                                    i?.students?.ojt_instructors
                                                        ?.gender
                                                }
                                            </p>
                                            <p className="flex-items-center gap-2 text-muted-foreground">
                                                Email{" : "}
                                                {
                                                    i?.students?.ojt_instructors
                                                        ?.email
                                                }
                                            </p>
                                            <p className="flex-items-center gap-2 text-muted-foreground">
                                                School{" : "}
                                                {
                                                    i?.students?.ojt_instructors
                                                        ?.school
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>

                        <TableCell className="text-muted-foreground">
                            {dateFormatter(i?.approved_at)}
                        </TableCell>
                        <TableCell className="text-center">
                            <Popover>
                                <PopoverTrigger className="cursor-pointer">
                                    <Ellipsis />
                                </PopoverTrigger>
                                <PopoverContent align="end" className="p-1">
                                    <p className="border-b p-2 mb-2 flex items-center gap-2">
                                        Upcoming Features <Sparkles size={16} />
                                    </p>

                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton disabled>
                                                <Check />
                                                Mark as Completed
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton disabled>
                                                <FileBadge />
                                                Create Certificate
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton disabled>
                                                <UserRoundX />
                                                <span className="text-destructive">
                                                    Terminate Internship
                                                </span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
