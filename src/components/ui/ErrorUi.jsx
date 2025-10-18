import TertiaryLabel from "./TertiaryLabel";
import Image from "next/image";

export default function ErrorUi({ message, secondaryMessage }) {
    return (
        <div className="py-8 w-full flex flex-col items-center justify-center">
            <div className="mb-3.5 opacity-90">
                {/* <TriangleAlert className="text-amber-600" size={32} />  */}

                <Image
                    alt="error"
                    src="/error-icon.svg"
                    width={180}
                    height={180}
                />
            </div>

            <h1 className="text-3xl font-bold tracking-wide text-center mb-2">
                Oops!
            </h1>
            <TertiaryLabel className="tracking-wider text-center mb-1">
                {message ? message : "Something went wrong"}
            </TertiaryLabel>

            <p className="text-center text-muted-foreground max-w-[300px]">
                {secondaryMessage
                    ? secondaryMessage
                    : " Please check your internet connection and try again."}
            </p>
        </div>
        // <div className="bg-red-800/5 p-3 rounded-xl items-center gap-2 border dark:border-red-400/20 border-red-600/20">
        //     <div className="rounded-sm flex gap-3 text-red-600 dark:text-red-400/90">
        //         <div className="pt-1">
        //             <CircleAlert />
        //         </div>
        //         <div>
        //             <p>
        //                 {message
        //                     ? message
        //                     : "Something went wrong while we fetch the data."}
        //             </p>
        //             <p className="text-xs font-light tracking-wider mt-1">
        //                 {secondaryMessage && secondaryMessage}
        //             </p>
        //         </div>
        //     </div>
        // </div>
    );
}
