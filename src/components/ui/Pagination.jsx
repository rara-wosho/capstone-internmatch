"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Pagination({
    className,
    currentPage,
    totalCount,
    baseUrl,
    pageSize = 10,
}) {
    const searchParams = useSearchParams();
    const totalPages = Math.ceil((totalCount || 0) / pageSize);

    // Generate URL with preserved search params
    const createPageUrl = (page) => {
        const params = new URLSearchParams(searchParams);

        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", page.toString());
        }

        const queryString = params.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    };

    // Calculate display range
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    // Generate page numbers to display
    const getVisiblePages = () => {
        const maxVisible = 3;
        const pages = [];

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        // Adjust start if we're near the end
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    // if (totalPages <= 1) return null;

    const visiblePages = getVisiblePages();
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-x-2 sm:justify-between flex-wrap gap-y-3",
                className
            )}
        >
            <p className="text-sm text-muted-foreground">
                Showing {startItem}-{endItem} of {totalCount} results
            </p>

            <div className="flex items-center gap-1 grow sm:grow-0 justify-center text-muted-foreground">
                {/* First page if not visible */}
                {visiblePages[0] > 1 && (
                    <>
                        <Button size="smallIcon" variant="outline" asChild>
                            <Link href={createPageUrl(1)}>1</Link>
                        </Button>
                        {visiblePages[0] > 2 && (
                            <span className="px-2 text-sm">...</span>
                        )}
                    </>
                )}

                {/* Visible page numbers */}
                <border className="rounded-sm bg-card border">
                    {visiblePages.map((page) => (
                        <button
                            key={page}
                            // size="smallIcon"
                            // variant={page === currentPage ? "default" : "outline"}
                            // asChild
                        >
                            <Link
                                className={cn(
                                    "size-7 flex items-center justify-center text-sm rounded-sm",
                                    page === currentPage &&
                                        "bg-neutral-200 text-black"
                                )}
                                href={createPageUrl(page)}
                            >
                                {page}
                            </Link>
                        </button>
                    ))}
                </border>

                {/* Last page if not visible */}
                {visiblePages[visiblePages.length - 1] < totalPages && (
                    <>
                        {visiblePages[visiblePages.length - 1] <
                            totalPages - 1 && (
                            <span className="px-2 text-sm">...</span>
                        )}
                        <Button size="smallIcon" variant="outline" asChild>
                            <Link href={createPageUrl(totalPages)}>
                                {totalPages}
                            </Link>
                        </Button>
                    </>
                )}

                {/* Previous Button */}
                <div className="flex items-center bg-card rounded-sm border ms-2">
                    <button
                        // size="smallest"
                        // variant="secondary"
                        // asChild
                        disabled={!hasPrevious}
                        className={cn(
                            "flex items-center border-r",
                            !hasPrevious ? "pointer-events-none opacity-50" : ""
                        )}
                    >
                        <Link
                            className="flex items-center h-7 px-2"
                            href={
                                hasPrevious
                                    ? createPageUrl(currentPage - 1)
                                    : "#"
                            }
                        >
                            <ChevronLeft size={22} />
                        </Link>
                    </button>

                    {/* Next Button */}
                    <button
                        // variant="outline"
                        // asChild
                        // size="smallest"
                        disabled={!hasNext}
                        className={cn(
                            "flex items-center",
                            !hasNext ? "pointer-events-none opacity-50" : ""
                        )}
                    >
                        <Link
                            className="flex items-center h-7 px-2"
                            href={
                                hasNext ? createPageUrl(currentPage + 1) : "#"
                            }
                        >
                            <ChevronRight size={22} />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
