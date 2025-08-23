import { ChevronRight } from "lucide-react";

export default function ExamsList() {
    return (
        <div>
            <div className="mb-4">
                <h1 className="font-semibold mb-1">Exams</h1>
                <p className="lg:hidden text-xs text-muted-foreground">
                    Click an exam to view details
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-0">
                <div className="p-3 lg:py-2 border bg-card rounded-lg flex transition-colors hover:text-secondary-foreground text-muted-foreground">
                    <p className="truncate">Fundamentals of Web Development</p>
                    <button className="ms-auto lg:hidden text-muted-foreground">
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div className="p-3 lg:py-2  border lg:border-0 bg-card lg:bg-transparent rounded-sm flex transition-colors hover:text-secondary-foreground text-muted-foreground">
                    <p className="truncate">Networking</p>
                    <button className="ms-auto lg:hidden text-muted-foreground">
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div className="p-3 lg:py-2  border lg:border-0 bg-card lg:bg-transparent rounded-sm flex transition-colors hover:text-secondary-foreground text-muted-foreground">
                    <p className="truncate">For Computer sci</p>
                    <button className="ms-auto lg:hidden text-muted-foreground">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
