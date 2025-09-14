"use client";

import { useState } from "react";
import BorderBox from "../ui/BorderBox";
import SecondaryLabel from "../ui/SecondaryLabel";
import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, ShieldCheck, User } from "lucide-react";

export default function ProfileTabSection({ companyData }) {
    const [activeTab, setActiveTab] = useState("profile");

    const handleChangeTab = (newTab) => {
        setActiveTab(newTab);
    };

    return (
        <>
            {/* <section className="flex items-center gap-4 px-3 md:px-5">
                    <button
                        onClick={() => handleChangeTab("profile")}
                        className={cn(
                            "text-sm text-muted-foreground font-semibold py-3 md:py-4 relative after:absolute after:w-full after:left-0 after:bottom-0 after:h-2 after:bg-primary",
                            activeTab === "profile" && ""
                        )}
                    >
                        Profile Details
                    </button>
                    <button
                        onClick={() => handleChangeTab("credentials")}
                        className={cn(
                            "text-sm text-muted-foreground font-semibold py-3 md:py-4 relative after:absolute after:w-full after:left-0 after:bottom-0 after:h-2 after:bg-primary",
                            activeTab === "credentials" && ""
                        )}
                    >
                        Credentials
                    </button>
                </section> */}

            <Tabs defaultValue="profile" className="w-full">
                <div className="border-b px-3 md:px-5 overflow-x-auto overflow-y-hidden">
                    <TabsList className="h-[55px] gap-3.5 pt-[2px]">
                        <TabsTrigger value="profile">
                            <User /> Profile Details
                        </TabsTrigger>
                        <TabsTrigger value="credentials">
                            <ShieldCheck />
                            Credentials
                        </TabsTrigger>
                        <TabsTrigger value="notifications">
                            <Bell />
                            Notifications
                        </TabsTrigger>
                    </TabsList>
                </div>

                <BorderBox>
                    <TabsContent value="profile">
                        Make changes to your account here.
                    </TabsContent>
                    <TabsContent value="credentials">
                        Change your password here.
                    </TabsContent>
                    <TabsContent value="notifications">
                        Change your password here.
                    </TabsContent>
                </BorderBox>
            </Tabs>
        </>
    );
}
