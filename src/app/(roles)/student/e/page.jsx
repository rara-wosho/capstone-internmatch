import ExamQuestionForm from "@/components/forms/ExamQuestionForm";
import BorderBox from "@/components/ui/BorderBox";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Wrapper from "@/components/Wrapper";
import { Clock, Target, TriangleAlert } from "lucide-react";

export default function Page() {
    return (
        <div>
            <SidebarTrigger />
            <SecondaryLabel className="mb-2 mt-3 md:mt-4">
                Fundamentals of programming
            </SecondaryLabel>
            <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi, neque. Id, odit?
            </p>

            {/* warning and notes section  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 mb-12">
                <section className="flex items-start p-3 sm:p-4 rounded-xl border bg-card gap-2">
                    <Target className="mt-1" size={20} />
                    <div>
                        <p className="mb-1 text-sm font-medium">
                            Passing Score
                        </p>
                        <p className="text-xs text-muted-foreground">
                            A minimum score of 80% is required.
                        </p>
                    </div>
                </section>
                <section className="flex items-start p-3 sm:p-4 bg-card rounded-xl border gap-2">
                    <TriangleAlert className="mt-1" size={20} />
                    <div>
                        <p className="mb-1 text-sm font-medium">
                            Browser Focus
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Switching tabs or leaving the window will result in
                            immediate forfeit.
                        </p>
                    </div>
                </section>
                <section className="flex items-start p-3 sm:p-4 bg-card rounded-xl border gap-2">
                    <Clock className="mt-1" size={20} />
                    <div>
                        <p className="mb-1 text-sm font-medium">Time Limit</p>
                        <p className="text-xs text-muted-foreground">
                            45 minutes to complete all questions. Auto submit
                            when time expires.
                        </p>
                    </div>
                </section>
                <section className="flex items-start p-3 sm:p-4 bg-card rounded-xl border gap-2">
                    <TriangleAlert className="mt-1" size={20} />
                    <div>
                        <p className="mb-1 text-sm font-medium">Note</p>
                        <p className="text-xs text-muted-foreground">
                            Avoid refreshing the page or you will lose your
                            progress.
                        </p>
                    </div>
                </section>
            </div>

            {/* Examination question Form  */}
            <ExamQuestionForm />
        </div>
    );
}
