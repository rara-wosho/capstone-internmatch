"use client";

import { useState } from "react";
import TertiaryLabel from "../ui/TertiaryLabel";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

// Reusable BarChart Component with Grouped Bars Support
const BarChart = ({
    data,
    title = "Bar Chart",
    truncateLabel = false,
    description = "",
    xAxisLabel = "",
    yAxisLabel = "",
    height = 400,
    barColor = "bg-primary",
    hoverColor = "hover:opacity-70",
    link = "",
    grouped = false, // Enable grouped bars
    groupColors = [], // Array of colors for each bar in a group
    showLegend = true, // Show legend for grouped bars
    groupLabels = [], // Labels for each bar in a group (e.g., ['Student', 'Instructor', 'Staff'])
}) => {
    if (!data || data.length === 0) {
        return (
            <div className="w-full p-8">
                <TertiaryLabel className="justify-center mb-2">
                    {title}
                </TertiaryLabel>
                <p className="text-muted-foreground text-center">
                    No data available
                </p>
            </div>
        );
    }

    // Calculate max value for scaling
    const maxValue = grouped
        ? Math.max(...data.flatMap((item) => item.values || [item.value]))
        : Math.max(...data.map((item) => item.value));

    const chartHeight = height - 60;

    // Default colors for grouped bars if not provided
    const defaultGroupColors = ["bg-primary", "bg-accent"];

    const colors = groupColors.length > 0 ? groupColors : defaultGroupColors;

    return (
        <div className="w-full mb-8">
            {/* Title */}
            <TertiaryLabel className="text-center justify-center mb-1">
                {title}
            </TertiaryLabel>

            {description && (
                <p className="text-sm text-muted-foreground text-center mb-2">
                    {description}
                </p>
            )}

            {/* Legend for grouped bars */}
            {grouped && showLegend && groupLabels.length > 0 && (
                <div className="flex justify-center gap-4 mb-4 flex-wrap">
                    {groupLabels.map((label, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${colors[idx]}`} />
                            <span className="text-sm text-secondary-foreground">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Chart Container */}
            <div className="relative" style={{ height: `${height}px` }}>
                {/* Y-axis label */}
                {yAxisLabel && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 -translate-x-5 -rotate-90 origin-center">
                        <span className="text-xs font-medium text-muted-foreground">
                            {yAxisLabel}
                        </span>
                    </div>
                )}

                {/* Chart area */}
                <ScrollArea className="w-full whitespace-nowrap">
                    <ScrollBar orientation="horizontal" />

                    <div className="flex justify-around items-end h-full px-4 pb-9 pt-4">
                        {data.map((item, idx) => {
                            // Handle both grouped and single bar data
                            const isGrouped =
                                grouped && Array.isArray(item.values);
                            const values = isGrouped
                                ? item.values
                                : [item.value];

                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center group w-full mx-2 grow h-full justify-end relative"
                                >
                                    {/* Grouped bars container */}
                                    <div className="w-full flex justify-center gap-1 items-end">
                                        {values.map((value, barIdx) => {
                                            const barHeight =
                                                (value / maxValue) *
                                                chartHeight;
                                            const barColorClass = isGrouped
                                                ? colors[barIdx]
                                                : barColor;

                                            return (
                                                <div
                                                    key={barIdx}
                                                    className="flex flex-col items-center relative"
                                                >
                                                    {/* Value label on hover */}
                                                    <div
                                                        className={cn(
                                                            "absolute -top-6 z-20",
                                                            value === 0 &&
                                                                "opacity-0"
                                                        )}
                                                    >
                                                        <span className="text-xs font-semibold text-secondary-foreground px-2 py-1">
                                                            {value}
                                                        </span>
                                                    </div>
                                                    {/* {hoveredGroup === idx && (
                                                )} */}

                                                    {/* Background bar */}
                                                    <div
                                                        style={{
                                                            height: `${chartHeight}px`,
                                                        }}
                                                        className={cn(
                                                            "absolute bottom-0  rounded-lg bg-secondary w-full left-1/2 -translate-x-1/2",
                                                            grouped
                                                                ? "opacity-0"
                                                                : "opacity-40 dark:opacity-15"
                                                        )}
                                                    />

                                                    {/* Actual bar */}
                                                    <Link
                                                        href={
                                                            link === ""
                                                                ? "#"
                                                                : link
                                                        }
                                                        className={`${
                                                            link === "" &&
                                                            "pointer-events-none"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`z-10 ${grouped ? "w-4 rounded" : "w-8 rounded-sm"} ${barColorClass} ${hoverColor}  transition-all duration-300 cursor-pointer relative`}
                                                            style={{
                                                                height: `${barHeight}px`,
                                                            }}
                                                        />
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Label */}
                                    <div
                                        className={cn(
                                            "absolute left-1/2 -translate-x-1/2 -bottom-8 w-full text-center",
                                            truncateLabel &&
                                                "truncate max-w-[80px]"
                                        )}
                                    >
                                        <span className="text-sm font-medium text-muted-foreground break-words capitalize">
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>

                {/* X-axis label */}
                {xAxisLabel && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <span className="text-sm font-medium text-secondary-foreground capitalize">
                            {xAxisLabel}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BarChart;
