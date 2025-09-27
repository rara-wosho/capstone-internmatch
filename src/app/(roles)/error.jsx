"use client";
import { Button } from "@/components/ui/button";
import ErrorUi from "@/components/ui/ErrorUi";
import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="w-full flex flex-col justify-center items-center p-4">
            <ErrorUi />
            <Button variant="outline" onClick={reset}>
                Try again
            </Button>
        </div>
    );
}
