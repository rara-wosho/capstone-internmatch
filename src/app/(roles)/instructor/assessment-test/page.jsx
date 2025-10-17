import SecondaryLabel from "@/components/ui/SecondaryLabel";

export default async function Page() {
    return (
        <div>
            <div className="mb-4">
                <SecondaryLabel>Assessment Test Results</SecondaryLabel>
                <p className="text-sm text-muted-foreground">
                    See your students' assessment test results here.
                </p>
            </div>
        </div>
    );
}
