import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export default function InfoPopover({ trigger, textContent }) {
    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer">
                {trigger}
            </PopoverTrigger>
            <PopoverContent className="p-3 text-sm text-muted-foreground">
                <p>{textContent}</p>
            </PopoverContent>
        </Popover>
    );
}
