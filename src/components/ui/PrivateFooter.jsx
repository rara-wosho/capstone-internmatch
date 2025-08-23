import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import IconWrapper from "./IconWrapper";
import { ArrowUp, MessagesSquare } from "lucide-react";

export default function PrivateFooter() {
    return (
        <div>
            <footer className="p-3 lg:p-4 border-t bg-white dark:bg-transparent flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    © 2025 InternMatch
                </p>
                <div className="flex gap-2">
                    <Tooltip delayDuration={800}>
                        <TooltipTrigger className="cursor-pointer">
                            <IconWrapper>
                                <MessagesSquare size={16} />
                            </IconWrapper>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">Send message</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={800}>
                        <TooltipTrigger className="cursor-pointer">
                            <IconWrapper>
                                <ArrowUp size={16} />
                            </IconWrapper>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">Scroll to top</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </footer>
        </div>
    );
}
