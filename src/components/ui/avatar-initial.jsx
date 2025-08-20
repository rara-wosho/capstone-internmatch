import React from "react";

export default function AvatarInitial({ letter }) {
    return (
        <div className="p-[3px] rounded-full border-2 border-accent-foreground/25 flex items-center justify-center">
            <div className="w-8 aspect-square rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                <p className="font-semibold text-center">{letter}</p>
            </div>
        </div>
    );
}
