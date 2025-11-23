import Image from "next/image";
import SecondaryLabel from "./SecondaryLabel";

export default function EmptyUi({ message, secondaryMessage, action }) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-2 opacity-80  dark:opacity-75">
                <Image
                    src="/Empty-pana.svg"
                    width={180}
                    height={180}
                    alt="empty-image"
                />
            </div>
            <SecondaryLabel className="mb-1">
                {message ? message : "No Results"}
            </SecondaryLabel>
            <p className="text-center max-w-[300px] text-muted-foreground mb-2.5">
                {secondaryMessage
                    ? secondaryMessage
                    : "Looks like there's nothing in here yet."}
            </p>

            {action && action}
        </div>
    );
}
