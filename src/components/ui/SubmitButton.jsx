"use client";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

const SubmitButton = ({
    children,
    className,
    size,
    variant,
    icon,
    disabled,
    type = "submit",
}) => {
    const { pending } = useFormStatus();

    return (
        <Button
            size={size}
            variant={variant}
            className={cn(className)}
            type={type}
            disabled={pending || disabled}
        >
            {children}
            {pending ? <Loader size={14} className="animate-spin" /> : icon}
        </Button>
    );
};

export default SubmitButton;
