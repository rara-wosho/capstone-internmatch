import { CircleAlert } from "lucide-react";
import TertiaryLabel from "./TertiaryLabel";

export default function ErrorUi({ message }) {
    return (
        <div className="bg-red-500/10 p-3 rounded-xl items-center gap-2">
            <div className="rounded-sm flex gap-2">
                <div className="text-destructive">
                    <CircleAlert />
                </div>
                <div>
                    {/* <TertiaryLabel>
                        <span className="text-destructive"> Opps..</span>
                    </TertiaryLabel> */}
                    <p className="text-destructive">
                        Oppss...{" "}
                        {message
                            ? message
                            : "Something went wrong while we fetch the data."}
                    </p>
                </div>
            </div>
        </div>
    );
}
