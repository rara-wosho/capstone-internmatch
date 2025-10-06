import { ArrowUp, MessagesSquare } from "lucide-react";
import { ThemeToggler } from "../theme-toggler";
import Wrapper from "../Wrapper";
import IconWrapper from "./IconWrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import TertiaryLabel from "./TertiaryLabel";

export default function PublicFooter() {
    return (
        <div className="border-t bg-card dark:bg-background py-6 px-4">
            <Wrapper className="flex items-center">
                <TertiaryLabel>InternMatch</TertiaryLabel>
                <div className="flex gap-2 ms-auto">
                    <div className="border rounded-sm bg-card">
                        <ThemeToggler />
                    </div>
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
            </Wrapper>
        </div>
    );
}
