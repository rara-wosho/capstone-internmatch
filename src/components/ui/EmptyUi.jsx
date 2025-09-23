import Image from "next/image";
import SecondaryLabel from "./SecondaryLabel";

export default function EmptyUi({ message, secondaryMessage }) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-2 opacity-80  dark:opacity-75">
                <Image
                    src="/Empty-pana.svg"
                    width={200}
                    height={200}
                    alt="empty-image"
                />
            </div>
            <SecondaryLabel className="mb-1">
                {message ? message : "No Results"}
            </SecondaryLabel>
            <p className="text-center max-w-[300px] text-muted-foreground">
                {secondaryMessage
                    ? secondaryMessage
                    : "Looks like there's nothing in here yet."}
            </p>
        </div>
    );
}
