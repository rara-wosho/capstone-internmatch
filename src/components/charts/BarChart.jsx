"use client";

import { useState } from "react";
import TertiaryLabel from "../ui/TertiaryLabel";
import { cn } from "@/lib/utils";

// Reusable BarChart Component with Grouped Bars Support
const BarChart = ({
    data,
    title = "Bar Chart",
    xAxisLabel = "",
    yAxisLabel = "",
    height = 400,
    barColor = "bg-gradient-to-b from-violet-400/90 to-violet-500",
    hoverColor = "hover:opacity-70",
    grouped = false, // Enable grouped bars
    groupColors = [], // Array of colors for each bar in a group
    showLegend = true, // Show legend for grouped bars
    groupLabels = [], // Labels for each bar in a group (e.g., ['Student', 'Instructor', 'Staff'])
}) => {
    const [hoveredGroup, setHoveredGroup] = useState(null);

    if (!data || data.length === 0) {
        return (
            <div className="w-full p-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-center">No data available</p>
            </div>
        );
    }

    // Calculate max value for scaling
    const maxValue = grouped
        ? Math.max(...data.flatMap((item) => item.values || [item.value]))
        : Math.max(...data.map((item) => item.value));

    const chartHeight = height - 60;

    // Default colors for grouped bars if not provided
    const defaultGroupColors = [
        "bg-gradient-to-b from-violet-400/90 to-violet-500",
        "bg-gradient-to-b from-blue-400/90 to-blue-500",
        "bg-gradient-to-b from-green-400/90 to-green-500",
        "bg-gradient-to-b from-amber-400/90 to-amber-500",
        "bg-gradient-to-b from-rose-400/90 to-rose-500",
    ];

    const colors = groupColors.length > 0 ? groupColors : defaultGroupColors;

    return (
        <div className="w-full mb-8">
            {/* Title */}
            <TertiaryLabel className="text-center justify-center mb-2">
                {title}
            </TertiaryLabel>

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
                <div className="flex items-end justify-around h-full px-4 pb-9 pt-4 overflow-x-auto">
                    {data.map((item, idx) => {
                        // Handle both grouped and single bar data
                        const isGrouped = grouped && Array.isArray(item.values);
                        const values = isGrouped ? item.values : [item.value];

                        return (
                            <div
                                key={idx}
                                className="flex flex-col items-center group w-full mx-2 grow h-full justify-end relative"
                                onMouseEnter={() => setHoveredGroup(idx)}
                                onMouseLeave={() => setHoveredGroup(null)}
                            >
                                {/* Grouped bars container */}
                                <div className="w-full flex justify-center gap-1 items-end">
                                    {values.map((value, barIdx) => {
                                        const barHeight =
                                            (value / maxValue) * chartHeight;
                                        const barColorClass = isGrouped
                                            ? colors[barIdx]
                                            : barColor;

                                        return (
                                            <div
                                                key={barIdx}
                                                className="flex flex-col items-center relative"
                                            >
                                                {/* Value label on hover */}
                                                <div className="absolute -top-6 z-20">
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
                                                <div
                                                    className={`z-10 ${grouped ? "w-4" : "w-8"} ${barColorClass} ${hoverColor} rounded-sm transition-all duration-300 cursor-pointer relative`}
                                                    style={{
                                                        height: `${barHeight}px`,
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Label */}
                                <div className="absolute left-0 -bottom-8 w-full text-center">
                                    <span className="text-sm font-medium text-gray-600 break-words">
                                        {item.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* X-axis label */}
                {xAxisLabel && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <span className="text-sm font-medium text-secondary-foreground">
                            {xAxisLabel}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BarChart;
