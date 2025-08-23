"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function Input({ icon, className, type, ...props }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const isPassword = type === "password";

    return (
        <div className="relative w-full">
            <input
                type={isPassword && showPassword ? "text" : type}
                data-slot="input"
                className={cn(
                    icon ? "pe-3 ps-9" : "px-3",
                    "file:text-foreground placeholder:text-muted-foreground/60 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-sm border bg-white px-3 py-1.5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className
                )}
                {...props}
            />

            {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center ps-3 text-muted-foreground hover:text-foreground">
                    {icon}
                </div>
            )}
            {isPassword && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                >
                    {!showPassword ? (
                        <EyeOffIcon size={20} />
                    ) : (
                        <EyeIcon size={20} />
                    )}
                </button>
            )}
        </div>
    );
}

export { Input };
