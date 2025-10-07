import EmptyUi from "@/components/ui/EmptyUi";
import ErrorUi from "@/components/ui/ErrorUi";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { createClient } from "@/lib/supabase/server";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UpdateRegistrationAction from "@/components/features/registrations/UpdateRegistrationAction";

export default async function AdminRegistrationPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("registrations")
        .select()
        .order("registered_at", { ascending: false });

    if (error) {
        return (
            <ErrorUi secondaryMessage="We're not able to fetch registrations data. Please check your internet connection and try again." />
        );
    }
    return (
        <div className="">
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-8">
                <Wrapper className="flex items-center">
                    Registrations{" "}
                    <div className="bg-card size-7 flex items-center justify-center border ms-2 rounded-sm text-base">
                        {data?.length}
                    </div>
                </Wrapper>
            </SecondaryLabel>
            <Wrapper>
                {data.length > 0 ? (
                    <Table>
                        <TableCaption>
                            A list of Ojt Instructor registrations.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Complete Name</TableHead>
                                <TableHead>Documents Link</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>School</TableHead>
                                <TableHead className="text-right">
                                    Status
                                </TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((reg) => (
                                <TableRow key={reg?.id}>
                                    <TableCell className="font-medium">
                                        {reg?.firstname} {reg?.lastname}
                                    </TableCell>
                                    <TableCell className="max-w-[180px]">
                                        <Link
                                            target="_blank"
                                            href={reg?.documents_link}
                                            className="block max-w-[300px] truncate text-accent-foreground hover:underline underline-offset-2"
                                        >
                                            {reg?.documents_link}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-xs">
                                            {dateFormatter(reg?.registered_at)}
                                        </p>
                                    </TableCell>
                                    <TableCell>{reg?.school}</TableCell>

                                    <TableCell className="text-right">
                                        <p className="capitalize">
                                            {reg?.status}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <UpdateRegistrationAction
                                            registrationId={reg?.id}
                                            status={reg?.status}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div>
                        <EmptyUi secondaryMessage="There are no registrations yet." />
                    </div>
                )}
            </Wrapper>
        </div>
    );
}
