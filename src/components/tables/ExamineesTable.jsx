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
import { dateFormatter } from "@/utils/date-formatter";
import Link from "next/link";
import TertiaryLabel from "../ui/TertiaryLabel";
import { useState, useMemo } from "react";
import BorderBox from "../ui/BorderBox";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { formatTimespan } from "@/utils/format-timespan";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useDebounce from "@/hooks/useDebounce";

// Sort options configuration
const SORT_OPTIONS = {
    score_desc: {
        label: "Score (High to Low)",
        key: "score",
        direction: "desc",
    },
    score_asc: { label: "Score (Low to High)", key: "score", direction: "asc" },
    name_asc: { label: "Name (A-Z)", key: "name", direction: "asc" },
    name_desc: { label: "Name (Z-A)", key: "name", direction: "desc" },
    date_desc: { label: "Date (Newest)", key: "started_at", direction: "desc" },
    date_asc: { label: "Date (Oldest)", key: "started_at", direction: "asc" },
    status: { label: "Status", key: "status", direction: "asc" },
};

export default function ExamineesTable({ examinees, examId }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("score_desc");
    const [isSorted, setIsSorted] = useState(false);
    const debouncedValue = useDebounce(searchQuery, 700);

    // Filter and sort examinees based on search query and sort option
    const filteredAndSortedExaminees = useMemo(() => {
        let result = [...examinees];

        // Apply search filter
        if (debouncedValue.trim()) {
            const query = debouncedValue.toLowerCase();
            result = result.filter(
                (examinee) =>
                    examinee.students?.firstname
                        ?.toLowerCase()
                        .includes(query) ||
                    examinee.students?.lastname
                        ?.toLowerCase()
                        .includes(query) ||
                    `${examinee.students?.firstname} ${examinee.students?.lastname}`
                        .toLowerCase()
                        .includes(query) ||
                    examinee.students?.school?.toLowerCase().includes(query) ||
                    examinee.status?.toLowerCase().includes(query) ||
                    examinee.score?.toString().includes(query)
            );
        }

        // Apply sorting
        const sortOption = SORT_OPTIONS[sortBy];
        if (sortOption) {
            result.sort((a, b) => {
                let aValue, bValue;

                switch (sortOption.key) {
                    case "name":
                        aValue =
                            `${a.students?.lastname} ${a.students?.firstname}`.toLowerCase();
                        bValue =
                            `${b.students?.lastname} ${b.students?.firstname}`.toLowerCase();
                        break;
                    case "score":
                        aValue = a.score || 0;
                        bValue = b.score || 0;
                        break;
                    case "status":
                        aValue = a.status || "";
                        bValue = b.status || "";
                        break;
                    default:
                        aValue = a[sortOption.key] || "";
                        bValue = b[sortOption.key] || "";
                }

                if (sortOption.direction === "asc") {
                    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                } else {
                    return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
                }
            });
        }

        return result;
    }, [examinees, debouncedValue, sortBy]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setIsSorted(true);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    const clearSort = () => {
        setSortBy("score_desc");
        setIsSorted(false);
    };

    return (
        <>
            <TertiaryLabel className="mb-2">
                {filteredAndSortedExaminees.length} Examinee
                {filteredAndSortedExaminees.length !== 1 && "s"}
                {searchQuery && ` found for "${searchQuery}"`}
                {isSorted && ` • Sorted by ${SORT_OPTIONS[sortBy]?.label}`}
            </TertiaryLabel>

            <BorderBox className="rounded-xl bg-card mb-3 border shadow-xs flex items-center gap-3 flex-wrap p-4">
                {/* Search Section */}
                <div className="flex items-center grow gap-3">
                    <div className="relative flex-1">
                        <Input
                            icon={<Search size={17} />}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search by name, school, score, or status..."
                            value={searchQuery}
                            className="pl-10 pr-10"
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="flex items-center gap-0.5 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X size={17} />{" "}
                                <span className="mb-[4px] hidden sm:inline-block">
                                    clear
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Sort Section */}
                <div className="flex items-center gap-3 flex-wrap">
                    <Select value={sortBy} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="score_desc">
                                Score (High to Low)
                            </SelectItem>
                            <SelectItem value="score_asc">
                                Score (Low to High)
                            </SelectItem>
                            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name_desc">
                                Name (Z-A)
                            </SelectItem>
                            <SelectItem value="date_desc">
                                Date (Newest)
                            </SelectItem>
                            <SelectItem value="date_asc">
                                Date (Oldest)
                            </SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                    </Select>

                    {isSorted && (
                        <Button
                            variant="dangerOutline"
                            onClick={clearSort}
                            size="lg"
                        >
                            <X size={16} />
                            Clear Sort
                        </Button>
                    )}
                </div>
            </BorderBox>

            <BorderBox className="bg-card shadow-xs border rounded-xl mb-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Complete Name</TableHead>
                            <TableHead>School</TableHead>
                            <TableHead>Started</TableHead>
                            <TableHead>Completed</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedExaminees.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    {searchQuery
                                        ? `No examinees found for "${searchQuery}"`
                                        : "No examinees found"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedExaminees.map(
                                (examinee, index) => (
                                    <TableRow key={examinee.id}>
                                        <TableCell className="w-2">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={`/company/examinees/${examinee.exam_id}/${examinee.student_id}`}
                                                className="hover:underline underline-offset-2 hover:text-accent-foreground transition-colors flex items-center gap-2"
                                            >
                                                <Avatar className="size-6">
                                                    <AvatarImage
                                                        src={
                                                            examinee?.students
                                                                ?.avatar_url
                                                        }
                                                        alt="student-img"
                                                    />
                                                    <AvatarFallback>
                                                        {examinee?.students?.lastname?.charAt(
                                                            0
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <p className="flex items-center truncate max-w-[220px]">
                                                    {
                                                        examinee?.students
                                                            ?.lastname
                                                    }
                                                    ,{" "}
                                                    {
                                                        examinee?.students
                                                            ?.firstname
                                                    }
                                                </p>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {examinee?.students?.school ?? (
                                                <p className="text-xs text-muted-foreground">
                                                    -
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {examinee?.started_at ? (
                                                dateFormatter(
                                                    examinee.started_at,
                                                    true,
                                                    true
                                                )
                                            ) : (
                                                <p className="text-xs text-muted-foreground">
                                                    -
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {examinee?.completed_at ? (
                                                <>
                                                    <span className="text-accent-foreground">
                                                        {formatTimespan(
                                                            examinee.started_at,
                                                            examinee.completed_at
                                                        )}
                                                    </span>
                                                    <span>
                                                        {dateFormatter(
                                                            examinee.completed_at,
                                                            true,
                                                            true,
                                                            true
                                                        )}
                                                    </span>
                                                </>
                                            ) : (
                                                <p className="text-xs text-muted-foreground">
                                                    -
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-semibold text-accent-foreground">
                                                {examinee?.score ?? 0}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    examinee.status ===
                                                    "completed"
                                                        ? "bg-green-100 text-green-800"
                                                        : examinee.status ===
                                                          "in_progress"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : examinee.status ===
                                                          "failed"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {examinee?.status || "pending"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        )}
                    </TableBody>
                </Table>
            </BorderBox>
        </>
    );
}
