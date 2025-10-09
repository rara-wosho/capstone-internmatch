import ErrorUi from "@/components/ui/ErrorUi";
import IconWrapper from "@/components/ui/IconWrapper";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { getCurrentUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { FileUser } from "lucide-react";
import { notFound } from "next/navigation";

import EmptyUi from "@/components/ui/EmptyUi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function StudentApplicationsPage() {
    const { user } = await getCurrentUser();

    if (!user || !user?.id) {
        notFound();
    }

    const supabase = await createClient();

    const { data: applications, error: applicationError } = await supabase
        .from("students")
        .select(
            `
    id, firstname, lastname, avatar_url, 
    group_id,
    groups!inner(ojt_instructor_id),
    applicants!inner(
      id,
      student_id,
      applied_at,
      status, companies(name,id)
    )
  `
        )
        .eq("groups.ojt_instructor_id", user.id);

    if (applicationError) {
        return <ErrorUi secondaryMessage={applicationError.message} />;
    }

    console.log(applications);

    return (
        <div>
            <SecondaryLabel className="mb-4 md:mb-5 space-x-2">
                <IconWrapper>
                    <FileUser size={17} />
                </IconWrapper>
                <p>Student Applications</p>
            </SecondaryLabel>

            {applications.length > 0 ? (
                applications.map((app) => (
                    <div
                        key={app.id}
                        className="border rounded-xl mb-3 bg-card shadow-xs"
                    >
                        <div className="flex items-center gap-2 p-4 border-b">
                            <Avatar className="size-5 aspect-square">
                                <AvatarImage
                                    src={app.avatar_url}
                                    alt="Avatar"
                                />
                                <AvatarFallback>?</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold">
                                {app.firstname} {app.lastname}
                            </p>
                        </div>
                        <div className="p-4 space-y-3">
                            {app.applicants.map((a) => (
                                <div
                                    key={a.id}
                                    className="flex items-center gap-4 text-muted-foreground text-sm"
                                >
                                    <p className="font-medium text-secondary-foreground">
                                        {a.companies.name}
                                    </p>
                                    <p>{a.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <EmptyUi secondaryMessage="No student submits an application yet." />
            )}
        </div>
    );
}
