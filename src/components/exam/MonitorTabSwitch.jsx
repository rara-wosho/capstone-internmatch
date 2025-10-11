"use client";

import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const MonitorTabSwitch = () => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleTabSwitch = () => {
            if (document.hidden) {
                console.log("document hidden");
                setHidden(true);
            }
        };

        document.addEventListener("visibilitychange", handleTabSwitch);

        // remove listner on unmount
        return () => {
            document.removeEventListener("visibilitychange", handleTabSwitch);
        };
    }, []);

    return (
        <div>
            MonitorTabSwitch
            <p>{hidden && "Submitting exam."}</p>
            <AlertDialog open={hidden} onOpenChange={setHidden}>
                <AlertDialogTrigger>Open</AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogTitle>Exam Forfeited</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        You have been disqualified for switching tab.
                    </AlertDialogDescription>

                    <AlertDialogFooter>
                        <Button>Submit Exam</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default MonitorTabSwitch;
