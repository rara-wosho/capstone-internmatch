import SecondaryLabel from "@/components/ui/SecondaryLabel";
import TertiaryLabel from "@/components/ui/TertiaryLabel";

export default function Page() {
    return (
        <div>
            <SecondaryLabel>Recent Exams</SecondaryLabel>

            <div className="flex flex-col gap-4 mt-4 max-w-2xl">
                <div className="border bg-white dark:bg-transparent rounded-md">
                    <h1 className="font-semibold text-base text-secondary-foreground/90 p-2.5 md:p-3 bg-slate-200/80 dark:bg-card/30">
                        Nov 23, 2025
                    </h1>
                    <div className="border-s p-2.5 md:p-3 text-muted-foreground">
                        <p>Google.com company</p>
                        <p>Google.com company</p>
                        <p>Google.com company</p>
                    </div>
                </div>
                <div className="border bg-white dark:bg-transparent rounded-md">
                    <h1 className="font-semibold text-base text-secondary-foreground/90 p-2.5 md:p-3 bg-slate-200/80 dark:bg-card/30">
                        Nov 23, 2025
                    </h1>
                    <div className="border-s p-2.5 md:p-3 text-muted-foreground">
                        <p>Google.com company</p>
                        <p>Google.com company</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
