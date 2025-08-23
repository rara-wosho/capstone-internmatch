import { ChevronRight, FileText } from "lucide-react";
import { Button } from "../ui/button";
import IconWrapper from "../ui/IconWrapper";

export default function ExamsList() {
    return (
        <div>
            <div className="mb-4">
                <div>
                    <p className="font-semibold flex items-center gap-2">
                        Exam{" "}
                        <span className="border rounded-sm text-sm px-2 bg-card">
                            3
                        </span>
                    </p>
                    <p className="lg:hidden text-xs text-muted-foreground">
                        Click an exam to view details
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-0">
                <div className="p-3 lg:py-2 border rounded-md lg:rounded-sm bg-card flex transition-colors hover:text-secondary-foreground text-muted-foreground">
                    <p className="truncate text-sm text-secondary-foreground">
                        Fundamentals of Web Development
                    </p>
                    <button className="ms-auto lg:hidden text-muted-foreground">
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div className="p-3 lg:py-2  border lg:border-0 bg-card lg:bg-transparent rounded-md lg:rounded-sm flex transition-colors hover:text-secondary-foreground text-muted-foreground">
                    <p className="truncate text-sm">Networking</p>
                    <button className="ms-auto lg:hidden text-muted-foreground">
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div className="p-3 lg:py-2  border lg:border-0 bg-card lg:bg-transparent rounded-md lg:rounded-sm flex transition-colors hover:text-secondary-foreground text-muted-foreground">
                    <p className="truncate text-sm">For Computer sci</p>
                    <button className="ms-auto lg:hidden text-muted-foreground">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
