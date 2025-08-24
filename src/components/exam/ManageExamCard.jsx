import Link from "next/link";

export default function ManageExamCard() {
    return (
        <div className="bg-card rounded-xl border">
            <Link href="/company/internship-exam/manage/ajsdlasdsa">
                <div className="p-3 md:p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="size-2 rounded-full bg-amber-500 flex items-center justify-center">
                            <div className="size-2 rounded-full bg-amber-500 animate-ping"></div>
                        </div>
                        <p>Fundamentals of Programming</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Jan 20 2025</p>
                </div>
                <div className="p-3 md:p-4 border-t">
                    <p className="text-xs text-muted-foreground">
                        50 questions
                    </p>
                </div>
            </Link>
        </div>
    );
}
