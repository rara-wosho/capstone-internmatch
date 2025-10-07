import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Wrapper from "@/components/Wrapper";

const TABS = [
    { label: "all" },
    { label: "accepted" },
    { label: "pending" },
    { label: "rejected" },
];

export default function Loading() {
    return (
        <div>
            <SecondaryLabel className="mb-3 md:mb-8 border-b py-4 md:py-8">
                <Wrapper className="flex items-center px-3">
                    Registrations{" "}
                    <div className="bg-card size-7 flex items-center justify-center border ms-2 rounded-sm text-base">
                        0
                    </div>
                </Wrapper>
            </SecondaryLabel>
            <Wrapper className="px-3">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {TABS.map((tab) => (
                        <Skeleton
                            key={tab.label}
                            className="rounded-sm border px-3 py-1 text-sm bg-card text-transparent"
                        >
                            {tab.label}
                        </Skeleton>
                    ))}
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Complete Name</TableHead>
                            <TableHead>Documents Link</TableHead>
                            <TableHead>Registration Date</TableHead>
                            <TableHead>School</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {[...Array(4)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="w-[80%] h-3" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[70%] h-3" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[70%] h-3" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[70%] h-3" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[70%] h-3" />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="w-[50%] h-8" />
                                        <Skeleton className="w-[50%] h-8" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Wrapper>
        </div>
    );
}
