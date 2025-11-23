import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard-header";
import PrivateFooter from "@/components/ui/PrivateFooter";
import { SessionProvider } from "@/context/SessionContext";
import { getCurrentUser } from "@/lib/actions/auth";
import ErrorUi from "@/components/ui/ErrorUi";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NotificationProvider } from "@/context/NotificationContext";

export default async function DashboardLayout({ children }) {
    const supabase = await createClient();
    // 1. Get the session ONCE on the server
    // returns the current session and a user object {id, role from user_metadata }
    const { session, user, error } = await getCurrentUser();

    if (error) {
        return (
            <div className="p-3">
                <ErrorUi />
            </div>
        );
    }

    if (!user || !user?.role) {
        redirect("/sign-in");
    }

    // 2. Get the full user profile
    let profileData = null;

    if (user?.role === "student") {
        const { data: userData, error: userError } = await supabase
            .from("students")
            .select(
                "email, id, role, avatar_url, firstname, lastname,exam_access"
            )
            .eq("id", user?.id)
            .single();

        if (userError) {
            return <ErrorUi />;
        }

        profileData = userData;
    }
    if (user?.role === "instructor") {
        const { data: instructorData, error: instructorError } = await supabase
            .from("ojt_instructors")
            .select("email, id, role, avatar_url, firstname, lastname")
            .eq("id", user?.id)
            .single();

        if (instructorError) {
            return <ErrorUi />;
        }
        profileData = instructorData;
    }
    if (user?.role === "company") {
        const { data: companyData, error: companyError } = await supabase
            .from("companies")
            .select(
                "email, id, role, avatar_url, name, accept_applicants, accept_applicants_term"
            )
            .eq("id", user?.id)
            .single();

        if (companyError) {
            return <ErrorUi />;
        }
        profileData = companyData;
    }

    if (!profileData) {
        console.error("No profile data found for user:", user.id);
        return <ErrorUi />;
    }

    return (
        <SessionProvider initialSession={session} profileData={profileData}>
            <NotificationProvider>
                <SidebarProvider>
                    <AppSidebar profileData={profileData} />
                    <main className="w-full">
                        <div className="min-h-screen">
                            <DashboardHeader profileData={profileData} />
                            <div className="p-3 md:p-5 lg:p-8 mb-5">
                                {children}
                            </div>
                        </div>
                        <PrivateFooter />
                    </main>
                </SidebarProvider>
            </NotificationProvider>
        </SessionProvider>
    );
}
