import { Button } from "./button";

export default function ApplicantCard({ applicant }) {
    return (
        <div className="rounded-lg shadow-xs bg-card p-3 md:p-4 lg:p-5 border flex flex-col items-center justify-center">
            <div className="mb-3">
                <div className="w-24 aspect-square rounded-full bg-muted"></div>
            </div>
            <p className="font-medium mb-1 text-center">Israel De Vera</p>
            <p className="text-sm text-muted-foreground text-center">
                University of Science and Technology of Southern Philippines
            </p>

            <div className="flex items-center flex-wrap gap-2 w-full mt-6">
                <Button className="grow" size="sm">
                    View Details
                </Button>
                <Button className="grow" size="sm" variant="outline">
                    View Profile
                </Button>
            </div>
        </div>
    );
}
