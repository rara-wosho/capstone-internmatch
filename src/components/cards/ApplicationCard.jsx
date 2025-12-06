import {
    Building2,
    FileText,
    ExternalLink,
    Clock,
    Check,
    CheckCircle,
    XCircle,
    FileQuestion,
    CircleQuestionMark,
    Info,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const { Avatar, AvatarImage, AvatarFallback } = require("../ui/avatar");
const { default: BorderBox } = require("../ui/BorderBox");
const { dateFormatter } = require("@/utils/date-formatter");
const { Badge } = require("../ui/badge");
const { Button } = require("../ui/button");
const { default: Link } = require("next/link");

/**
 * Get status badge styling
 */
function getStatusConfig(status) {
    const configs = {
        pending: {
            label: "Pending Review",
            icon: Clock,
            className:
                "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20",
        },
        reviewed: {
            label: "Reviewed",
            icon: Check,
            className:
                "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20",
        },
        accepted: {
            label: "Accepted",
            icon: CheckCircle,
            className:
                "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20",
        },
        rejected: {
            label: "Rejected",
            icon: XCircle,
            className:
                "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/20",
        },
        cancelled: {
            label: "Cancelled",
            icon: XCircle,
            className:
                "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/20",
        },
    };
    return configs[status] || configs.pending;
}

/**
 * Info Item Component
 */
function InfoItem({ icon: Icon, label, value, className = "" }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium truncate">{value}</p>
            </div>
        </div>
    );
}

export default function ApplicationCard({ application }) {
    const statusConfig = getStatusConfig(application.status);
    const StatusIcon = statusConfig.icon;

    return (
        <BorderBox className="border rounded-xl bg-card hover:shadow-sm transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage
                            src={
                                application.companies?.avatar_url ||
                                "/images/default-company.jpg"
                            }
                            alt={application.companies?.name}
                        />
                        <AvatarFallback>
                            <Building2 className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-base truncate">
                            {application.companies?.name || "Unknown Company"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Applied {dateFormatter(application.applied_at)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className={`${statusConfig.className} font-medium px-2.5 py-1`}
                    >
                        <StatusIcon className="h-3.5 w-3.5 mr-1.5" />
                        {statusConfig.label}
                    </Badge>

                    <Popover>
                        <PopoverTrigger className="text-muted-foreground cursor-pointer">
                            <CircleQuestionMark size={18} />
                        </PopoverTrigger>
                        <PopoverContent align="end">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-1 text-secondary-foreground mb-2 border-b pb-2">
                                    <p className="text-sm font-medium">
                                        What the status tell
                                    </p>
                                </div>
                                <p className="text-muted-foreground">
                                    <span className="text-secondary-foreground font-medium">
                                        Accepted
                                    </span>
                                    {" : "}
                                    The application has been accepted by the
                                    company and is now awaiting your approval to
                                    finalize internship.
                                </p>

                                <p className="text-muted-foreground">
                                    <span className="text-secondary-foreground font-medium">
                                        Reviewed
                                    </span>
                                    {" : "}
                                    The company has reviewed the application and
                                    is currently finalizing their decision.
                                </p>

                                <p className="text-muted-foreground">
                                    <span className="text-secondary-foreground font-medium">
                                        Rejected
                                    </span>
                                    {" : "}
                                    The application has been declined by the
                                    company.
                                </p>
                                <p className="text-muted-foreground">
                                    <span className="text-secondary-foreground font-medium">
                                        Pending
                                    </span>
                                    {" : "}
                                    The company hasn't viewed the application
                                    yet.
                                </p>
                                <p className="text-muted-foreground">
                                    <span className="text-secondary-foreground font-medium">
                                        Cancelled
                                    </span>
                                    {" : "}
                                    The application is withdrawn by the student.
                                </p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Documents Grid */}
            {(application.resume_link ||
                application.cover_letter_url ||
                application.portfolio_link) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {application.resume_link && (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="justify-start h-auto py-2 px-3"
                        >
                            <Link
                                href={application.resume_link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-500/10">
                                        <FileText className="h-3.5 w-3.5 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-medium">
                                            Resume
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            View document
                                        </p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                                </div>
                            </Link>
                        </Button>
                    )}

                    {application.cover_letter_url && (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="justify-start h-auto py-2 px-3"
                        >
                            <Link
                                href={application.cover_letter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-purple-50 dark:bg-purple-500/10">
                                        <FileText className="h-3.5 w-3.5 text-purple-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-medium">
                                            Cover Letter
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            View document
                                        </p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                                </div>
                            </Link>
                        </Button>
                    )}

                    {application.portfolio_link && (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="justify-start h-auto py-2 px-3"
                        >
                            <a
                                href={application.portfolio_link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10">
                                        <LinkIcon className="h-3.5 w-3.5 text-emerald-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-medium">
                                            Portfolio
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            View link
                                        </p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                                </div>
                            </a>
                        </Button>
                    )}
                </div>
            )}

            {/* Introduction */}
            {application.introduction && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Introduction</h4>
                    <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {application.introduction}
                        </p>
                    </div>
                </div>
            )}

            {/* Approval Status */}

            <div className="flex items-center justify-between pt-3 border-t">
                {application?.approve_status && (
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                            Internship Approval:
                        </p>
                        <Badge variant="secondary" className="font-normal">
                            {application.approve_status
                                .charAt(0)
                                .toUpperCase() +
                                application.approve_status.slice(1) ??
                                "Awaiting"}
                        </Badge>
                    </div>
                )}
                <div className="text-xs text-muted-foreground">
                    Student ID: {application.id.slice(0, 8)}
                </div>
            </div>
        </BorderBox>
    );
}
